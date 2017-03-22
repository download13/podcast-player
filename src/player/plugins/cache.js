import {
  ensureFileCached,
  deleteSelectedFiles
} from '../../common/file-cache';
import {getCurrentEpisode, getNextEpisode} from '../store/selectors';


export function keepEpisodesCached(store) {
  let lastEpisode;

  store.subscribe(() => {
    const state = store.getState();
    const {podcastName} = state;
    const episode = getCurrentEpisode(state);
    const nextEpisode = getNextEpisode(state, episode);

    if(podcastName) {
      if(lastEpisode !== episode) {
        const task = cleanupOtherEpisodes([episode, nextEpisode])
          .then(() => ensureEpisodeCached(episode));

        if(nextEpisode) {
          task.then(() => ensureEpisodeCached(nextEpisode));
        }

        lastEpisode = episode;
      }
    }
  });
}

function ensureEpisodeCached(episode) {
  // console.log('trying ensure ' + index)
  return ensureFileCached(episode.audioUrl);
}

function cleanupOtherEpisodes(episodes) {
  return deleteSelectedFiles(fileUrl => {
    return episodes.every(episode => episode.audioUrl !== fileUrl);
  });
}
