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
