const podcasts = [
  {
    name: 'mbmbam',
    humanName: 'MBMBAM',
    feedUrl: 'https://feeds.feedburner.com/mbmbam',
    icon: 'mbmbam_300.jpg'
  },
  {
    name: 'rosebuddies',
    humanName: 'Rosebuddies',
    feedUrl: 'http://rosebuddies.libsyn.com/rss',
    icon: 'rosebuddies_300.jpg'
  },
  {
    name: 'adventurezone',
    humanName: 'The Adventure Zone',
    feedUrl: 'http://adventurezone.libsyn.com/rss',
    icon: 'adventurezone_300.jpg'
  },
  {
    name: 'throwingshade',
    humanName: 'Throwing Shade',
    feedUrl: 'http://throwingshade.libsyn.com/rss',
    icon: 'throwingshade_300.jpg'
  },
  {
    name: 'cipyd',
    humanName: 'Can I Pet Your Dog?',
    feedUrl: 'http://cipyd.libsyn.com/rss',
    icon: 'cipyd_300.jpg'
  },
  {
    name: 'ladytolady',
    humanName: 'Lady to Lady',
    feedUrl: 'http://ladytolady.libsyn.com/rss',
    icon: 'ladytolady_300.jpg'
  },
  {
    name: 'stoppodcastingyourself',
    humanName: 'Stop Podcasting Yourself',
    feedUrl: 'http://feeds.feedburner.com/stoppodcastingyourself',
    icon: 'stoppodcastingyourself_300.jpg'
  },
  {
    name: 'jordanjessego',
    humanName: 'Jordan, Jesse GO!',
    feedUrl: 'http://feeds.feedburner.com/thornmorris',
    icon: 'jordanjessego_300.jpg'
  },
  {
    name: 'bunkerbuddies',
    humanName: 'Bunker Buddies with Andie and Travis',
    feedUrl: 'http://bunkerbuddies.libsyn.com/rss',
    icon: 'bunkerbuddies_300.jpg'
  },
  {
    name: 'theflophouse',
    humanName: 'The Flop House',
    feedUrl: 'http://theflophouse.libsyn.com/rss',
    icon: 'theflophouse_300.jpg'
  },
  {
    name: 'judgejohnhodgman',
    humanName: 'Judge John Hodgman',
    feedUrl: 'http://feeds.feedburner.com/todayinthepast',
    icon: 'judgejohnhodgman_300.jpg'
  }
];

const podcastMap = {};
podcasts.forEach(podcast => podcastMap[podcast.name] = podcast);

function getPodcasts() {
  return podcasts;
}

function getPodcast(name) {
  if(!podcastMap.hasOwnProperty(name)) name = 'mbmbam';
  return podcastMap[name];
}


module.exports = {
  podcasts,
  getPodcasts,
  getPodcast
};
