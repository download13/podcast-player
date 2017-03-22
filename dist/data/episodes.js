const FeedParser = require('feedparser');
const request = require('request');
const AsyncCache = require('async-cache');

// TODO: Provide real urls to our server app, provide app urls to the client
const feedburner = new AsyncCache({
  max: 50,
  maxAge: 1000 * 60 * 5,
  load(feedUrl, cb) {
    const episodes = [];

    const fp = new FeedParser();
    fp.on('readable', () => {
      let item;
      while(item = fp.read()) {
        if(item.enclosures.length === 0) continue;
        episodes.unshift({
          size: parseInt(item.enclosures[0].length),
          index: episodes.length,
          title: item.title,
          imageUrl: item.image ? item.image.url : '',
          audioUrl: item.enclosures[0].url
        });
      }
    })
    .on('end', () => cb(null, episodes))
    .on('error', cb);

    request(feedUrl).pipe(fp, {end: true});
  }
});

function getEpisodes(feedUrl) {
  return new Promise((resolve, reject) => {
    feedburner.get(feedUrl, (err, episodes) => {
      if(err) reject(err);
      else resolve(episodes);
    });
  });
}

function getEpisode(feedUrl, index) {
  return getEpisodes(feedUrl)
  .then(episodes => episodes[index]);
}


module.exports = {
  getEpisodes,
  getEpisode
};
