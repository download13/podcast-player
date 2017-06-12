import {h} from 'hyperapp';
import {Link} from './components';


const Episode = ({
  cacheProgress,
  title,

  deleteEpisode,
  cacheEpisode,
  playEpisode
}) => {
  let button;
  if(cacheProgress === 1) {
    button = <button onClick={deleteEpisode} class="lean-right">
      <span class="icon-trash-empty"></span>
    </button>;
  } else if(cacheProgress === 0) {
    button = <button onClick={cacheEpisode} class="lean-right">
      <span class="icon-download-cloud"></span>
    </button>;
  } else if(typeof cacheProgress !== 'number') {
    button = <div class="episode-progress">
      {cacheProgress}
    </div>;
  } else {
    button = <div class="episode-progress">
      {Math.round(cacheProgress * 100) + '%'}
    </div>;
  }

  return <div class="episode">
    <div class="episode-title">{title}</div>
    <button onClick={playEpisode}>
      <span class="icon-play"></span>
    </button>
    {button}
  </div>;
};

class Episodes {
  render({
    index,

    hideEpisodes,
    deleteEpisode,
    cacheEpisode,
    playEpisode
  }) {

  }
}

export default (state, actions) => {
  // TODO: When showing this page, scroll to the currently playing episode if there is one
  actions.episodeList.load(state.router.params.podcastName);

  const {episodes} = state.episodeList;

  const {downloadEpisode, deleteEpisode} = actions.storage;

  // TODO: Show size of all cached episodes
  return <div>
    <div class="titlebar">
      <Link class="back" title="Back to Podcasts" href="/" go={actions.router.go}>
        <span class="icon-play"></span>
      </Link>
    </div>
    <div class="episodes">
      {episodes.map(episode => {
        return <Episode
          key={episode.index}
          {...episode}
        />
      })}
    </div>
  </div>;
};
