import fs from 'fs';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import uuid from 'uuid/v4';


const authMap = new Map();
const places = new Map();

const secret = fs.readFileSync(__dirname + '/secret.txt', 'utf8').trim();

export const textBody = bodyParser.text();

export const jwtMw = expressJWT({secret});

export function createJWT(data) {
  if(!data) data = uuid();

  return jwt.sign({data}, secret);
}

export function storeAuthorization(uuid) {
  const code = createRandomNumber();
  authMap.set(code, uuid);
  setTimeout(() => {
    authMap.delete(code);
  }, 5 * 60 * 1000);
  return code;
}

export function checkAuthorization(code) {
  const uuid = authMap.get(code);
  authMap.delete(code);
  return uuid;
}

export function storePlace(profile, podcast, blob) {
  if(!places.has(profile)) {
    places.set(profile, new Map());
  }

  places.get(profile).set(podcast, blob);

  return Promise.resolve();
}

export function getPlace(profile, podcast) {
  const prof = places.get(profile);

  if(prof) {
    return Promise.resolve(prof.get(podcast));
  }

  return Promise.resolve();
}

function createRandomNumber() {
  return Math.random().toString().substr(2, 8);
}
