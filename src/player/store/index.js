import {createStore} from 'redux';
import {getEpisode} from './selectors';


export default () => createStore(
  playerReducer
  //, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export const initialEpisodeInfo = {
  index: 0,
  size: 0,
  title: 'No Episode Loaded',
  imageUrl: '',
  audioUrl: '',
  cacheProgress: 0
};

const initalPlayerState = {
  podcastName: '',
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


function playerReducer(state = initalPlayerState, {type, payload}) {
  const {index} = state;

  switch(type) {
    case 'SET_PODCAST_NAME':
      return {...state, podcastName: payload};
    case 'TOGGLE_PLAYING':
      return {...state, playing: !state.uiShowsPlaying};
    case 'CHANGE_PLAYING':
      return {...state, playing: payload};
    case 'SELECT_EPISODE':
      if(payload >= 0 && payload < state.episodes.length) {
        return {...state, selectedIndex: payload};
      } else {
        return state;
      }
    case 'FLUSH_SELECTED_EPISODE':
      return {...state, index: state.selectedIndex};
    case 'RESET_SELECTED_EPISODE':
      return {...state, selectedIndex: index};
    case 'CHANGE_VOLUME':
      return {...state, volume: payload};
    case 'NEXT_EPISODE':
      if(index + 1 < state.episodes.length) {
        return {
          ...state,
          index: index + 1,
          selectedIndex: index + 1
        };
      } else {
        return state;
      }
    case 'PREVIOUS_EPISODE':
      if(index - 1 >= 0) {
        return {
          ...state,
          index: index - 1,
          selectedIndex: index - 1
        };
      } else {
        return state;
      }
    case 'SET_EPISODES':
      if(Array.isArray(payload) && payload.length) {
        return {...state, episodes: payload};
      }
      return state;
    case 'SET_EPISODE_CACHE_PROGRESS':
      const episode = getEpisode(state, payload.index);

      return {
        ...state,
        episodes: replaceElement(state.episodes, payload.index, {
          ...episode,
          cacheProgress: payload.progress
        })
      };
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
        add.selectedIndex = restoreIndex;
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
    case 'SHOW_BOOKMARKS':
      return {...state, showingBookmarks: true};
    case 'HIDE_BOOKMARKS':
      return {...state, showingBookmarks: false};
    case 'SHOW_EPISODES':
      return {...state, showingEpisodes: true};
    case 'HIDE_EPISODES':
      return {...state, showingEpisodes: false};
    case 'SET_BOOKMARKS':
      if(Array.isArray(payload)) {
        return {...state, bookmarks: payload};
      }
      return state;
    case 'CREATE_CURRENT_BOOKMARK':
      return {
        ...state,
        bookmarks: addElement(state.bookmarks, {
          episode: state.index,
          position: state.uiPosition
        })
      };
    case 'DELETE_BOOKMARK':
      return {
        ...state,
        bookmarks: removeElement(state.bookmarks, payload)
      };
    case 'SEND_CACHE_COMMAND':
      return {
        ...state,
        cacheCommand: payload
      };
    case 'SET_CACHE_SIZE':
      return {
        ...state,
        cacheSize: payload
      };
    default:
      return state;
  }
}


function addElement(array, newElement) {
  const r = array.slice();

  r.push(newElement);

  return r;
}

function replaceElement(array, index, newElement) {
  const r = array.slice();

  r[index] = newElement;

  return r;
}

function removeElement(array, index) {
  const r = array.slice();

  r.splice(index, 1);

  return r;
}
