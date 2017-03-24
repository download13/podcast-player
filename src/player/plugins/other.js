import {getCurrentEpisode} from '../store/selectors';


export function loadEpisodes(store) {
  const {podcastName} = store.getState();

  return fetch(`/p/${podcastName}/list`)
    .then(res => res.json())
    .then(episodes => {
      const clientEpisodes = episodes.map(episode => {
        const episodeUrlPrefix = `${location.protocol}//${location.host}/p/${podcastName}/episodes/${episode.index}/`;
        return {
          ...episode,
          imageUrl: episodeUrlPrefix + 'image',
          audioUrl: episodeUrlPrefix + 'audio'
        };
      });
      store.dispatch({type: 'SET_EPISODES', payload: clientEpisodes});
    });
}

export function syncTitle(store) {
  const flushTitle = () => {
    const {title, imageUrl} = getCurrentEpisode(store.getState());

    document.title = title;

    if(navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artwork: [
          {src: imageUrl}
        ]
      });
    }
  };

  store.subscribe(flushTitle);
  flushTitle();
}
