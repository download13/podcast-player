import {getCurrentEpisode} from '../store/selectors';


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
