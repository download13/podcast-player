const {getPodcasts} = require('../data');
const podcastRoutes = require('./podcasts');
const syncRoutes = require('./sync');


module.exports = app => {
  app.get('/', renderApp);
  app.get('/sync', renderApp);
  app.get('/p/:podcastName', renderApp);
  app.get('/p/:podcastName/episodes', renderApp);
  app.get('/p/:podcastName/bookmarks', renderApp);

  podcastRoutes(app);

  syncRoutes(app);
};


function renderApp(req, res) {
  res.render('index');
}
