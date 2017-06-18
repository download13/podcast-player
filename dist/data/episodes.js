const FeedParser = require('feedparser');
const request = require('request');
const AsyncCache = require('async-cache');
const {getPodcast} = require('./podcasts-hardcoded');


// TODO: Provide real urls to our server app, provide app urls to the client
const feedCache = new AsyncCache({
  max: 50,
  maxAge: 1000 * 60 * 5,
  load(feedUrl, cb) {
    const episodes = [];
    let index = 0;

    const fp = new FeedParser();
    fp.on('readable', () => {
      let item;
      while(item = fp.read()) {
        if(item.enclosures.length === 0) continue;
        episodes.unshift({
          date: new Date(item.pubDate).getTime(),
          size: parseInt(item.enclosures[0].length),
          title: item.title,
          imageUrl: item.image ? item.image.url : '',
          audioUrl: item.enclosures[0].url
        });
      }

      episodes.forEach((episode, i) => episode.index = i);
    })
    .on('end', () => cb(null, episodes))
    .on('error', cb);

    request(feedUrl).pipe(fp, {end: true});
  }
});


function getEpisodes(podcastName) {
  return new Promise((resolve, reject) => {
    const podcast = getPodcast(podcastName);

    if(!podcast) {
      return null;
    }

    feedCache.get(podcast.feedUrl, (err, episodes) => {
      if(err) reject(err);
      else resolve(episodes);
    });
  });
}

function getEpisode(podcastName, index) {
  return getEpisodes(podcastName)
    .then(episodes => {
      if(episodes === null) {
        return null;
      }

      return episodes[index];
    });
}


module.exports = {
  getEpisodes,
  getEpisode
};
