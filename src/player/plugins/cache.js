import {
  ensureFileCached,
  deleteSelectedFiles
} from '../../common/file-cache';
import {
  getCurrentEpisode,
  getNextEpisode,
  getPreviousEpisode
} from '../store/selectors';


export function keepEpisodesCached(store) {
  let lastEpisode;

  store.subscribe(() => {
    const state = store.getState();
    const {podcastName} = state;
    const episode = getCurrentEpisode(state);
    const nextEpisode = getNextEpisode(state, episode);
    const prevEpisode = getPreviousEpisode(state, episode);

    if(podcastName) {
      if(lastEpisode !== episode) {
        const task = cleanupOtherEpisodes([prevEpisode, episode, nextEpisode])
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
  return ensureFileCached(episode.imageUrl)
    .then(() => ensureFileCached(episode.audioUrl));
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
