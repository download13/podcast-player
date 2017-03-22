import {seekRelative} from '../store/actions';


export function mediaSessionControls(store) {
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

    store.subscribe(() => {
      const state = store.getState();
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
  addEventListener('keyup', e => {
    if(e.code === 'Space') {
      e.preventDefault();
      store.dispatch({type: 'TOGGLE_PLAYING'});
    }
  });
}
