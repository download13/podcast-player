const {getPodcasts} = require('../data');
const podcastRoutes = require('./podcasts');
const syncRoutes = require('./sync');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', {podcasts: getPodcasts()});
  });

  podcastRoutes(app);

  syncRoutes(app);
};
