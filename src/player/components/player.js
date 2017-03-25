import {h} from 'preact';
import PodcastImage from './podcast-image';
import Audio from './audio';
import {connect} from 'preact-redux';
import debounce from 'debounce';
import {seekRelative} from '../store/actions';
import {getCurrentEpisode} from '../store/selectors';


// TODO Sync features as buttons
// TODO: Add volume control
const Player = ({
  index,
  selectedIndex,
  autoplay,
  playing,
  uiShowsPlaying,
  seekToPosition,
  uiPosition,
  duration,
  volume,

  episode,

  autoplayClicked,
  togglePlaying,
  playerStateChanged,
  nextEpisode,
  previousEpisode,
  seekScrubbedTo,
  setVolumeTo,
  seekBackward5,
  seekBackward30,
  seekForward5,
  seekForward30,
  selectEpisode,
  flushSelectedEpisode,
  resetSelectedEpisode
}) => {
  const {title, imageUrl, audioUrl, status} = episode;

  return <div class="player">
    <div class="titlebar">
      <a class="back button" href="/">
        <span class="icon-play"></span>
      </a>
      <h1 class="title">{title}</h1>
    </div>
    <PodcastImage src={imageUrl}/>
    <Audio
      src={audioUrl}
      playing={playing}
      position={seekToPosition}
      onStateChange={playerStateChanged}
      onEnded={nextEpisode}
      volume={volume}
    />
    <div class="seek_scrub">
      <button class="toggle-playing" onClick={togglePlaying} title={uiShowsPlaying ? 'Pause' : 'Play'}>
        <span class={uiShowsPlaying ? 'icon-pause' : 'icon-play'}></span>
      </button>
      <input
        class="scrubber"
        type="range"
        min="0"
        max={Math.round(duration)}
        value={Math.round(uiPosition)}
        onInput={seekScrubbedTo}
      />
      <div class="time">{formatTime(uiPosition) + ' / ' + formatTime(duration)}</div>
    </div>
    <div class="seek">
      <button onClick={seekBackward30} title="Back 30 Seconds">
        <span class="icon-fast-bw"></span> 30
      </button>
      <button onClick={seekBackward5} title="Back 5 Seconds">
        <span class="icon-fast-bw"></span> 5
      </button>
      <button onClick={seekForward5} title="Forward 5 Seconds">
        5 <span class="icon-fast-fw"></span>
      </button>
      <button onClick={seekForward30} title="Forward 30 Seconds">
        30 <span class="icon-fast-fw"></span>
      </button>
    </div>
    <div class="nav">
      <button onClick={previousEpisode} title="Previous Episode">
        <span class="icon-to-start-alt"></span>
      </button>
      <input
        type="number"
        onChange={selectEpisode}
        onKeyUp={e => {
          if(e.key === 'Enter') {
            flushSelectedEpisode(e);
          }
        }}
        onBlur={resetSelectedEpisode}
        value={selectedIndex + 1}
      />
      <button onClick={nextEpisode} title="Next Episode">
        <span class="icon-to-end-alt"></span>
      </button>
    </div>
    <div class="volume">
      <input
        class="scrubber"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onInput={setVolumeTo}
      />
    </div>
    <div class="options">
      <span>
        <input type="checkbox" id="autoplay_opt" checked={autoplay} onChange={autoplayClicked}/>
        <label for="autoplay_opt">Autoplay</label>
      </span>
    </div>
  </div>;
}


export default connect(
  state => ({
    ...state,
    episode: getCurrentEpisode(state)
  }),
  dispatch => ({
    autoplayClicked(e) {
      dispatch({autoplay: e.target.checked});
    },
    togglePlaying() {
      dispatch({type: 'TOGGLE_PLAYING'});
    },
    playerStateChanged(playerState) {
      // playerState is {playing, duration, position}
      dispatch({type: 'SET_TRACKED_PLAYER_STATE', payload: playerState});
    },
    nextEpisode() {
      dispatch({type: 'NEXT_EPISODE'});
    },
    previousEpisode() {
      dispatch({type: 'PREVIOUS_EPISODE'});
    },
    seekScrubbedTo(e) {
      const position = parseInt(e.target.value);
      dispatch({type: 'SEEK_TO_POSITION', payload: position});
    },
    setVolumeTo(e) {
      const volume = parseFloat(e.target.value);
      dispatch({type: 'CHANGE_VOLUME', payload: volume});
    },
    seekBackward5() {
      dispatch(seekRelative(-5));
    },
    seekBackward30() {
      dispatch(seekRelative(-30));
    },
    seekForward5() {
      dispatch(seekRelative(5));
    },
    seekForward30() {
      dispatch(seekRelative(30));
    },
    selectEpisode(e) {
      const episodeNumber = parseInt(e.target.value);
      if(typeof episodeNumber === 'number' && !isNaN(episodeNumber)) {
        dispatch({type: 'SELECT_EPISODE', payload: episodeNumber - 1});
      }
    },
    resetSelectedEpisode() {
      dispatch({type: 'RESET_SELECTED_EPISODE'});
    },
    flushSelectedEpisode(e) {
      dispatch({type: 'FLUSH_SELECTED_EPISODE'});
      e.target.blur();
    },
    storeRemoteState() {
      // TODO:
      if(!playing) {
        const {podcast} = this.props;
        storePlace(podcast, localStorage.getItem(podcast + '_place'));
      }
    }
  })
)(Player);


function formatTime(n) {
  if(isNaN(n)) {
    return '00:00';
  }

  let hours = Math.floor(n / 60);
  if(hours < 10) hours = '0' + hours;

  let minutes = Math.floor(n % 60);
  if(minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
}
