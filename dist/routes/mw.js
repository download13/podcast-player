const path = require('path');
const fs = require('fs');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');


const authMap = new Map();
const places = new Map();

const secret = fs.readFileSync(path.resolve(__dirname, '../secret.txt'), 'utf8').trim();

const textBody = bodyParser.text();

const jwtMw = expressJWT({secret});

function createJWT(data) {
  if(!data) data = uuid();

  return jwt.sign({data}, secret);
}

function storeAuthorization(uuid) {
  const code = createRandomNumber();
  authMap.set(code, uuid);
  setTimeout(() => {
    authMap.delete(code);
  }, 5 * 60 * 1000);
  return code;
}

function checkAuthorization(code) {
  const uuid = authMap.get(code);
  authMap.delete(code);
  return uuid;
}

function storePlace(profile, podcast, blob) {
  if(!places.has(profile)) {
    places.set(profile, new Map());
  }

  places.get(profile).set(podcast, blob);

  return Promise.resolve();
}

function getPlace(profile, podcast) {
  const prof = places.get(profile);

  if(prof) {
    return Promise.resolve(prof.get(podcast));
  }

  return Promise.resolve();
}

function createRandomNumber() {
  return Math.random().toString().substr(2, 8);
}


module.exports = {
  textBody,
  jwtMw,
  createJWT,
  storeAuthorization,
  checkAuthorization,
  storePlace,
  getPlace
};
