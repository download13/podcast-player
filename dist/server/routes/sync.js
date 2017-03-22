const {
  createJWT,
  jwtMw,
  textBody,
  storeAuthorization,
  checkAuthorization,
  storePlace,
  getPlace
} = require('./mw');


module.exports = app => {
  app.get('/sync', (req, res) => {
    res.render('sync');
  });

  app.post('/sync/create', (req, res) => {
    res.type('text').send(createJWT());
  });

  app.post('/sync/authorize', jwtMw, (req, res) => {
    const code = storeAuthorization(req.user.data);
    res.type('text').send(code);
  });

  app.post('/sync/join', textBody, (req, res) => {
    const uuid = checkAuthorization(req.body);
    if(!uuid) {
      return res.status(401).send('Invalid code');
    }
    res.type('text').send(createJWT(uuid));
  });

  app.post('/sync/store/:podcast', jwtMw, textBody, (req, res) => {
    storePlace(req.user.data, req.params.podcast, req.body)
    .then(() => res.send('Stored'));
  });

  app.get('/sync/get/:podcast', jwtMw, (req, res) => {
    getPlace(req.user.data, req.params.podcast)
    .then(blob => {
      if(blob) {
        res.type('text').send(blob);
      } else {
        res.status(404).send('No data stored')
      }
    });
  });
};
