const express = require('express');
const {getEpisodes, getEpisode} = require('./data');
const request = require('request');
const {getPodcasts, getPodcast} = require('./casts');


const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/p/:podcast', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/list', (req, res) => {
  res.send(getPodcasts());
});

app.get('/manifest.json', (req, res) => {
  const {podcast} = req.params;
  res.type('application/json').render('manifest');
});

app.get('/p/:podcast/list', (req, res, next) => {
  const {podcast} = req.params;
  const {feedUrl} = getPodcast(podcast);

  if(!feedUrl) {
    return res.status(404).send('Feed not found');
  }

  getEpisodes(feedUrl).then(
    episodes => res.send(episodes),
    err => res.status(404).send('Feed not found')
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

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Listening on port ' + listener.address().port);
});


function sendRemoteFile(req, res, url) {
  const headers = {};

  if(req.headers.range) {
    headers.Range = req.headers.range;
  }

  request({url, headers})
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
  .on('error', err => {
    console.error('sendRemoteFile error');
    console.error(err);
    res.end();
  });
}
