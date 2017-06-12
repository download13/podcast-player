import {h, app, Router} from 'hyperapp';
import {initialState} from './state';

import indexView from './views/index';
import syncView from './views/sync';
import episodesView from './views/episodes';
import bookmarksView from './views/bookmarks';

import SyncPlugin from './plugins/sync';


const Logger = app => ({
  events: {
    update(state, actions, data, emit) {
      console.log('update', data, state);
    },
    action(state, actions, data) {
      console.log('action', data);
    }
  }
});


// https://www.html5rocks.com/en/tutorials/audio/scheduling/
const PlayerPlugin = app => {
  return {
    state: {
      podcastName: '',
      episodeIndex: 0
    },
    events: {
      update(state, actions, data, emit) {
        // TODO: Control the audio player on changes from this
        return data;
      }
    }
  };
};


app({
  state: initialState,
  view: {
    '/': indexView,
    '/sync': syncView,
    '/p/:podcastName': episodesView,
    '/p/:podcastName/bookmarks': bookmarksView
  },
  actions: {
    selectView(state, actions, {view, podcastName}) {
      // view should be one of ['index', 'sync', 'episodes', 'bookmarks']
    },
    episodeList: {
      play(state, actions, episodeIndex) {
        return {
          ...state,
          episodeList: {
            playing: episodeIndex
          },
          player: {
            url: state.episodeList.episodes[episodeIndex].url
          }
        };
      },
      async load(state, actions, podcastName) {
        // TODO load from server or local cache
      }
    },
    storage: {
      async downloadEpisode(state, actions, {podcastName, episodeIndex}) {
        // TODO
      },
      async deleteEpisode(state, actions, {podcastName, episodeIndex}) {
        // TODO
      }
    }
  },
  events: {
    update(state, actions, data) {
      if(data.router && data.router.match) {
        const {match, params} = data.router;

        if(match === '/') {
          actions.selectView({view: 'index'});
        } else if(match === '/sync') {
          actions.selectView({view: 'sync'});
        } else if(match === '/p/:podcastName') {
          actions.selectView({view: 'episodes', podcastName: params.podcastName});
        } else if(match === '/p/:podcastName/bookmarks') {
          actions.selectView({view: 'bookmarks', podcastName: params.podcastName});
        }
      }
    }
  },
  plugins: [
    Router,
    SyncPlugin,
    PlayerPlugin,
    Logger
  ],
  root: document.getElementById('mountpoint')
});


// TODO: import {syncStoreToStorage} from './plugins/storage';
// TODO: import {bootServiceWorker} from '../common';
