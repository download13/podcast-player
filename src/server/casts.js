const casts = {
  mbmbam: {
    name: 'mbmbam',
    humanName: 'MBMBAM',
    feedUrl: 'https://feeds.feedburner.com/mbmbam',
    icon: 'mbmbam_300.jpg'
  },
  rosebuddies: {
    name: 'rosebuddies',
    humanName: 'Rosebuddies',
    feedUrl: 'http://rosebuddies.libsyn.com/rss',
    icon: 'rosebuddies_300.jpg'
  },
  adventurezone: {
    name: 'adventurezone',
    humanName: 'The Adventure Zone',
    feedUrl: 'http://adventurezone.libsyn.com/rss',
    icon: 'adventurezone_300.jpg'
  },
  throwingshade: {
    name: 'throwingshade',
    humanName: 'Throwing Shade',
    feedUrl: 'http://throwingshade.libsyn.com/rss',
    icon: 'throwingshade_300.jpg'
  },
  cipyd: {
    name: 'cipyd',
    humanName: 'Can I Pet Your Dog?',
    feedUrl: 'http://cipyd.libsyn.com/rss',
    icon: 'cipyd_300.jpg'
  },
  ladytolady: {
    name: 'ladytolady',
    humanName: 'Lady to Lady',
    feedUrl: 'http://ladytolady.libsyn.com/rss',
    icon: 'ladytolady_300.jpg'
  },
  stoppodcastingyourself: {
    name: 'stoppodcastingyourself',
    humanName: 'Stop Podcasting Yourself',
    feedUrl: 'http://feeds.feedburner.com/stoppodcastingyourself',
    icon: 'stoppodcastingyourself_300.jpg'
  },
  jordanjessego: {
    name: 'jordanjessego',
    humanName: 'Jordan, Jesse GO!',
    feedUrl: 'http://feeds.feedburner.com/thornmorris',
    icon: 'jordanjessego_300.jpg'
  },
  bunkerbuddies: {
    name: 'bunkerbuddies',
    humanName: 'Bunker Buddies with Andie and Travis',
    feedUrl: 'http://bunkerbuddies.libsyn.com/rss',
    icon: 'bunkerbuddies_300.jpg'
  },
  theflophouse: {
    name: 'theflophouse',
    humanName: 'The Flop House',
    feedUrl: 'http://theflophouse.libsyn.com/rss',
    icon: 'theflophouse_300.jpg'
  },
  judgejohnhodgman: {
    name: 'judgejohnhodgman',
    humanName: 'Judge John Hodgman',
    feedUrl: 'http://feeds.feedburner.com/todayinthepast',
    icon: 'judgejohnhodgman_300.jpg'
  }
};

const castArray = Object.keys(casts).map(n => {
  const {name, humanName} = casts[n];
  return {name, humanName};
});

export function getPodcasts() {
  return castArray;
}

export function getPodcast(name) {
  if(!casts.hasOwnProperty(name)) name = 'mbmbam';
  return casts[name];
}
