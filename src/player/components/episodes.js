import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {seekToPosition} from '../store/actions';


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

class Episodes extends Component {
  constructor(...args) {
    super(...args);

    this.readyToScroll = true;
  }

  componentDidMount() {
    if(this.readyToScroll && this.selectedEpisodeEl) {
      this.selectedEpisodeEl.scrollIntoView();

      this.readyToScroll = false;
    }
  }

  render({
    index,
    episodes,

    hideEpisodes,
    deleteEpisode,
    cacheEpisode,
    playEpisode
  }) {
    const scrollIndex = Math.max(index - 1, 0);

    // TODO: Show size of all cached episodes
    return <div>
      <div class="titlebar">
        <button class="back" title="Back to Player" onClick={hideEpisodes}>
          <span class="icon-play"></span>
        </button>
      </div>
      <div class="episodes">
        {episodes.map(episode => {
          const episodeEl = <Episode
            {...episode}
            deleteEpisode={() => deleteEpisode(episode.index)}
            cacheEpisode={() => cacheEpisode(episode.index)}
            playEpisode={() => playEpisode(episode.index)}
          />;

          if(scrollIndex === episode.index) {
            return <div key={episode.index} ref={el => this.selectedEpisodeEl = el}>{episodeEl}</div>;
          }

          return <div key={episode.index}>{episodeEl}</div>;
        })}
      </div>
    </div>;
  }
}

export default connect(
  state => state,
  dispatch => ({
    hideEpisodes() {
      dispatch({type: 'HIDE_EPISODES'});
    },
    playEpisode(index) {
      dispatch({type: 'SELECT_EPISODE', payload: index});
      dispatch({type: 'FLUSH_SELECTED_EPISODE'});
      dispatch(seekToPosition(0));
      dispatch({type: 'CHANGE_PLAYING', payload: true});
      dispatch({type: 'HIDE_EPISODES'});
    },
    cacheEpisode(index) {
      dispatch({
        type: 'SEND_CACHE_COMMAND',
        payload: {
          type: 'cache',
          payload: index
        }
      });
    },
    deleteEpisode(index) {
      dispatch({
        type: 'SEND_CACHE_COMMAND',
        payload: {
          type: 'delete',
          payload: index
        }
      });
    }
  })
)(Episodes);
