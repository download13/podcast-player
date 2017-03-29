import {getCurrentEpisode} from '../store/selectors';
import {seekRelative} from '../store/actions';
import {Observable} from './common';


export function syncTitle(state$) {
  state$
    .map(getCurrentEpisode)
    .distinctUntilChanged()
    .subscribe(episode => {
      const {title, imageUrl} = episode;

      document.title = title;

      if(navigator.mediaSession) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artwork: [
            {src: imageUrl}
          ]
        });
      }
    });
}

export function mediaSessionControls(store, state$) {
  if(navigator.mediaSession) {
    navigator.mediaSession.setActionHandler('play', () => {
      store.dispatch({type: 'CHANGE_PLAYING', payload: true});
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      store.dispatch({type: 'CHANGE_PLAYING', payload: false});
    });

    navigator.mediaSession.setActionHandler('seekbackward', () => {
      store.dispatch(seekRelative(-5));
    });

    navigator.mediaSession.setActionHandler('seekforward', () => {
      store.dispatch(seekRelative(5));
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      store.dispatch({type: 'PREVIOUS_EPISODE'});
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      store.dispatch({type: 'NEXT_EPISODE'});
    });

    state$
      .subscribe(state => {
        const {audioUrl} = getCurrentEpisode(state);
        const {uiShowsPlaying} = state;

        let playbackState = 'none';
        if(audioUrl) {
          if(uiShowsPlaying) {
            playbackState = 'playing';
          } else {
            playbackState = 'paused';
          }
        }

        navigator.mediaSession.playbackState = playbackState;
      });
  }
}

export function playerKeyControls(store) {
  Observable.fromEvent(window, 'keyup')
    .filter(e => e.code === 'Space')
    .subscribe(e => {
      e.stopPropagation();
      e.preventDefault();
      store.dispatch({type: 'TOGGLE_PLAYING'});
    });
}
