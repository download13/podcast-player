import {h, app, Router} from 'hyperapp';
import {initialState} from './state';

import indexView from './views/index';
import syncView from './views/sync';
import episodesView from './views/episodes';
import bookmarksView from './views/bookmarks';
import playerView from './views/player';

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
      episodeIndex: 0,
      player: {
        episode: null
      }
    },
    events: {
      update(state, actions, data, emit) {
        // TODO: Control the audio player on changes from this
        return data;
      },
      render(state, actions, view, emit) {
        return (state, actions) =>
          <div class="app-holder">
            {view(state, actions)}
            {playerView(state, actions)}
          </div>
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
    episodeList: {
      play(state, actions, episodeIndex) {
        return {
          player: {
            episode: state.episodeList.episodes[episodeIndex]
          }
        };
      },
      setEpisodes(state, actions, episodes) {
        return {
          episodeList: {
            episodes
          }
        };
      },
      async load(state, actions) {
        const {podcastName} = state.router.params;

        const res = await fetch(`/p/${podcastName}/list`);

        if(res.ok) {
          const episodes = await res.json();

          actions.episodeList.setEpisodes(episodes);
        }
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
        const {match} = data.router;

        if(match === '/p/:podcastName') {
          actions.episodeList.load();
        } else if(match === '/p/:podcastName/bookmarks') {
          // TODO refresh bookmark data from server
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
