const {getPodcast} = require('../casts');
const {getEpisode, getEpisodes} = require('../data');


module.exports = app => {
  app.get('/p/', (req, res) => {
    res.render('player');
  });

  app.get('/p/:podcast', (req, res) => {
    res.render('player');
  });

  app.get('/p/:podcast/list', (req, res, next) => {
    const {feedUrl} = getPodcast(req.params.podcast);

    if(!feedUrl) {
      return res.status(404).send('Feed not found');
    }

    getEpisodes(feedUrl).then(
      episodes => res.send(episodes),
      err => {
        console.error(err);
        res.status(500).send('Error getting feed');
      }
    );
  });

  app.get('/p/:podcast/icon', (req, res) => {
    const {icon} = getPodcast(req.params.podcast);
    res.sendFile(__dirname + '/podcast-icons/' + icon);
  });

  app.get('/p/:podcast/episodes/:index/image', (req, res) => {
    const {podcast, index} = req.params;
    const {feedUrl} = getPodcast(podcast);

    getEpisode(feedUrl, index).then(
      episode => {
        if(episode) {
          sendRemoteFile(req, res, episode.imageUrl);
        } else {
          res.status(404).send('Episode not found');
        }
      },
      err => {
        console.error(err);
        res.status(404).send('Feed not found');
      }
    );
  });

  app.get('/p/:podcast/episodes/:index/audio', (req, res) => {
    const {podcast, index} = req.params;
    const {feedUrl} = getPodcast(podcast);

    getEpisode(feedUrl, index).then(
      episode => {
        if(episode) {
          sendRemoteFile(req, res, episode.audioUrl);
        } else {
          res.status(404).send('Episode not found');
        }
      },
      err => {
        console.error(err);
        res.status(404).send('Feed not found');
      }
    );
  });
};


function sendRemoteFile(req, res, url) {
  const headers = {};

  if(req.headers.range) {
    headers.Range = req.headers.range;
  }

  const clientRequest = request({url, headers})
  .on('response', ({statusCode, headers}) => {
    res.status(statusCode);
    if(headers['content-type']) {
      res.append('Content-Type', headers['content-type']);
    }
    if(headers['content-length']) {
      res.append('Content-Length', headers['content-length']);
    }
    if(headers['content-range']) {
      res.append('Content-Range', headers['content-range']);
    }
  })
  .pipe(res, {end: true})
  .on('end', () => {
    clientRequest.req.socket.destroy();
  })
  .on('error', err => {
    console.error('sendRemoteFile error');
    console.error(err);
    res.end();
  });
}
