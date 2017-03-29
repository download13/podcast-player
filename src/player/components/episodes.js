import {h} from 'preact';
import {connect} from 'preact-redux';
import {seekToPosition} from '../store/actions';


const Episode = ({
  cacheProgress,
  index,
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

  return <div class="episode" data-index={index}>
    <div class="episode-title" onClick={playEpisode}>{title}</div>
    {button}
  </div>;
};

const Episodes = ({
  episodes,

  hideEpisodes,
  deleteEpisode,
  cacheEpisode,
  playEpisode
}) => {
  // TODO: Show size of all cached episodes
  return <div class="episodes">
    <div class="titlebar">
      <button class="back" title="Back to Player" onClick={hideEpisodes}>
        <span class="icon-play"></span>
      </button>
    </div>
    <div>
      {episodes.map(episode => <Episode {...episode} key={episode.index} deleteEpisode={deleteEpisode} cacheEpisode={cacheEpisode} playEpisode={playEpisode} />)}
    </div>
  </div>;
};

export default connect(
  state => {
    console.log('state Episodes', window.store.getState().episodes[0].cacheProgress)
    console.log('Episodes', state.episodes[0].cacheProgress)
    return state;
  },
  dispatch => ({
    hideEpisodes() {
      dispatch({type: 'HIDE_EPISODES'});
    },
    playEpisode(e) {
      const {index} = e.currentTarget.parentNode.dataset;

      dispatch({type: 'SELECT_EPISODE', payload: episode});
      dispatch({type: 'FLUSH_SELECTED_EPISODE'});
      dispatch(seekToPosition(position));
      dispatch({type: 'CHANGE_PLAYING', payload: true});
      dispatch({type: 'HIDE_EPISODES'});
    },
    cacheEpisode(e) {
      const index = parseInt(e.currentTarget.parentNode.dataset.index);

      if(!isNaN(index)) {
        dispatch({
          type: 'SEND_CACHE_COMMAND',
          payload: {
            type: 'cache',
            payload: index
          }
        });
      }
    },
    deleteEpisode(e) {
      const index = parseInt(e.currentTarget.parentNode.dataset.index);

      if(!isNaN(index)) {
        dispatch({
          type: 'SEND_CACHE_COMMAND',
          payload: {
            type: 'delete',
            payload: index
          }
        });
      }
    }
  })
)(Episodes);
