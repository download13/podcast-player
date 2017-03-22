import {createStore} from 'redux';


export default () => createStore(playerReducer);


export const initialEpisodeInfo = {
  index: 0,
  size: 0,
  title: 'No Episode Loaded',
  imageUrl: '',
  audioUrl: ''
};

const initalPlayerState = {
  podcastName: '',
  episodes: [initialEpisodeInfo],
  index: 0,
  playing: false,
  uiShowsPlaying: false,
  seekToPosition: 0, // was playFromPosition
  uiPosition: 0,
  duration: 0,
  autoplay: true,
  volume: 1
};


function playerReducer(state = initalPlayerState, {type, payload}) {
  const {index, episodes} = state;

  switch(type) {
    case 'SET_PODCAST_NAME':
      return {...state, podcastName: payload};
    case 'TOGGLE_PLAYING':
      return {...state, playing: !state.uiShowsPlaying};
    case 'CHANGE_PLAYING':
      return {...state, playing: payload};
    case 'CHANGE_EPISODE':
      if(payload >= 0 && payload < episodes.length) {
        return {...state, index: payload};
      } else {
        return state;
      }
    case 'CHANGE_VOLUME':
      return {...state, volume: payload};
    case 'NEXT_EPISODE':
      if(index + 1 < episodes.length) {
        return {...state, index: index + 1};
      } else {
        return state;
      }
    case 'PREVIOUS_EPISODE':
      if(index - 1 >= 0) {
        return {...state, index: index - 1};
      } else {
        return state;
      }
    case 'SET_EPISODES':
      if(payload && payload.length) {
        return {...state, episodes: payload};
      }
      return state;
    case 'SET_EPISODE_STATUS':
      const episode = getCurrentEpisode(state);
      const newEpisodes = episodes.slice();
      newEpisodes.splice(index, 1, {...episode, status});
      return {...state, episodes: newEpisodes};
    case 'SEEK_TO_POSITION':
      return {
        ...state,
        seekToPosition: payload,
        uiPosition: payload
      };
    case 'SEEK_RELATIVE':
      const newPosition = state.uiPosition + payload;
      return {
        ...state,
        seekToPosition: newPosition,
        uiPosition: newPosition
      };
    case 'RESTORE_STATE':
      const {
        position,
        playing,
        autoplay,
        index: restoreIndex,
        volume
      } = payload;

      const add = {};

      if(typeof position === 'number') {
        add.seekToPosition = position;
        add.uiPosition = position;
      }
      if(typeof playing === 'boolean') {
        add.uiShowsPlaying = playing;
        add.playing = playing;
      }
      if(typeof autoplay === 'boolean') {
        add.autoplay = autoplay;
      }
      if(typeof restoreIndex === 'number') {
        add.index = restoreIndex;
      }
      if(typeof volume === 'number') {
        add.volume = volume;
      }

      return {
        ...state,
        ...add
      };
    case 'SET_TRACKED_PLAYER_STATE':
      return {
        ...state,
        uiShowsPlaying: payload.playing,
        duration: payload.duration,
        uiPosition: payload.position
      };
    default:
      return state;
  }
}
