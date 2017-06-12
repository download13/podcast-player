const initialEpisodeInfo = {
  index: 0,
  size: 0,
  title: 'No Episode Loaded',
  imageUrl: '',
  audioUrl: '',
  cacheProgress: 0
};

export const initialState = {
  episodeList: {
    episodes: []
  },
  episodes: [initialEpisodeInfo],
  index: 0,
  selectedIndex: 0,
  playing: false,
  uiShowsPlaying: false,
  seekToPosition: 0,
  uiPosition: 0,
  duration: 0,
  autoplay: true,
  volume: 1,
  showingBookmarks: false,
  showingEpisodes: false,
  bookmarks: [],
  cacheCommand: null,
  cacheSize: 0
};
