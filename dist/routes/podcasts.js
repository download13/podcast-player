const path = require('path');
const request = require('request');
const {
  getPodcast,
  getEpisode,
  getEpisodes
} = require('../data');


const ICONS_PATH = path.resolve(__dirname, '../podcast-icons');

module.exports = app => {
  app.get('/p/:podcast/list', (req, res, next) => {
    getEpisodes(req.params.podcast).then(
      episodes => {
        if(!episodes) {
          return res.status(404).send('Feed not found');
        }

        res.send(episodes);
      },
      err => {
        console.error(err);
        res.status(500).send('Error getting feed');
      }
    );
  });

  app.get('/p/:podcast/icon', (req, res) => {
    const {icon} = getPodcast(req.params.podcast);
    res.sendFile(path.join(ICONS_PATH, icon));
  });

  app.get('/p/:podcast/episodes/:index/image', (req, res) => {
    const {podcast, index} = req.params;

    getEpisode(podcast, index).then(
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

    getEpisode(podcast, index).then(
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
    res.status(500);
    res.end();
  });
}
