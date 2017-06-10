import {
  ensureFileCached,
  deleteCachedFile,
  listCachedFiles
} from '../../common/file-cache';
import {getEpisode} from '../store/selectors';


export function keepEpisodesCached(store, state$, episodes$) {
  const cacheCommand$ = state$
    .pluck('cacheCommand')
    .filter(cmd => !!cmd)
    .distinctUntilChanged();

  cacheCommand$
    .subscribe(({type, payload: index}) => {
      const episode = getEpisode(state$.getValue(), index);

      const updateProgress = progress => {
        store.dispatch({
          type: 'SET_EPISODE_CACHE_PROGRESS',
          payload: {
            index,
            progress
          }
        });
      };

      if(type === 'cache') {
        ensureEpisodeCached(episode)
          .subscribe(
            progress => updateProgress(progress),
            err => {
              console.error('ensureEpisodeCached error');
              console.error(err);
              onProgress('Error');
            }
          );
      } else if(type === 'delete') {
        deleteEpisode(episode)
          .then(
            () => updateProgress(0),
            err => {
              console.error('deleteEpisode error');
              console.error(err);
              onProgress('Error');
            }
          );
      }
    });
}

export function ensureEpisodeCached(episode) {
  return ensureFileCached(episode.imageUrl)
    .ignoreElements()
    .concat(ensureFileCached(episode.audioUrl));
}

function deleteEpisode(episode) {
  return Promise.all([
    deleteCachedFile(episode.imageUrl),
    deleteCachedFile(episode.audioUrl)
  ]);
}

function cleanupOtherEpisodes(episodes) {
  return deleteSelectedFiles(fileUrl => {
    return episodes.every(episode => {
      if(episode) {
        const {imageUrl, audioUrl} = episode;
        return audioUrl !== fileUrl && imageUrl !== fileUrl;
      }
      return false;
    });
  });
}


export function getCachedEpisodeState(episodes) {
  const state = episodes.map(episode => ({
    shouldCache: false,
    progress: 0
  }));

  return listCachedFiles()
    .then(files =>
      files
        .filter(url => {
          if(url.endsWith('/audio')) {
            const match = url.match(/episodes\/([0-9]+)\/audio$/);
            return match && match[1];
          }
          return false;
        })
        .map(url => {
          const index = parseInt(url.match(/episodes\/([0-9]+)\/audio$/)[1]);
          return index;
        })
    )
    .then(cachedIndexes => {
      cachedIndexes.forEach(index => {
        const episode = state[index];

        episode.progress = 1;
        episode.shouldCache = true;
      });

      return state;
    });
}
