import express from 'express';
import request from 'request';
import {getEpisodes, getEpisode} from './data';
import {getPodcasts, getPodcast} from './casts';
import {
  createJWT,
  jwtMw,
  textBody,
  storeAuthorization,
  checkAuthorization,
  storePlace,
  getPlace
} from './mw';


const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/sync', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
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
  try {
    JSON.parse(req.body);
  } catch(e) {
    res.send('Invalid JSON');
    return;
  }

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

app.get('/p/:podcast', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/list', (req, res) => {
  res.send(getPodcasts());
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

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Listening on port ' + listener.address().port);
});


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
