import {initialEpisodeInfo} from './index';


export function getEpisode(state, index) {
  return state.episodes[index] || initialEpisodeInfo;
}

export function getCurrentEpisode(state) {
  const {index} = state;

  return getEpisode(state, index);
}

export function getNextEpisode(state, episode) {
  const nextIndex = episode.index + 1;

  if(nextIndex >= state.episodes) {
    return null;
  }

  return getEpisode(state, nextIndex);
}
