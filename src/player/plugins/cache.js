import {
  ensureFileCached,
  deleteCachedFile
} from '../../common/file-cache';
import {
  getEpisode
} from '../store/selectors';


export function keepEpisodesCached(store, state$, episodes$) {
  const cacheCommand$ = state$
    .pluck('cacheCommand')
    .filter(cmd => !!cmd)
    .distinctUntilChanged();

  cacheCommand$
    .subscribe(({type, payload: index}) => {
      const episode = getEpisode(state$.getValue(), index);

      const onProgress = progress => {
        store.dispatch({
          type: 'SET_EPISODE_CACHE_PROGRESS',
          payload: {
            index,
            progress
          }
        });
      };

      if(type === 'cache') {
        ensureEpisodeCached(episode, onProgress)
          .then(
            () => onProgress(1),
            err => {
              console.error('ensureEpisodeCached error');
              console.error(err);
              onProgress('Error');
            }
          );
      } else if(type === 'delete') {
        deleteEpisode(episode)
          .then(
            () => onProgress(0),
            err => {
              console.error('deleteEpisode error');
              console.error(err);
              onProgress('Error');
            }
          );
      }
    });
}

function ensureEpisodeCached(episode, onProgress) {
  return ensureFileCached(episode.imageUrl)
    .then(() => ensureFileCached(episode.audioUrl, {onProgress}));
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
