import {h} from 'preact';
import PodcastImage from './podcast-image';
import Audio from './audio';
import {connect} from 'preact-redux';
import debounce from 'debounce';
import {formatTime} from '../../common';
import {seekRelative, seekToPosition} from '../store/actions';
import {getCurrentEpisode} from '../store/selectors';


const Player = ({
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
  showEpisodes,
  showBookmarks
}) => {
  const {title, imageUrl, audioUrl, status} = episode;

  return <div class="player">
    <div class="titlebar">
      <a class="back button" title="Back to Podcasts" href="/">
        <span class="icon-play"></span>
      </a>
      <h1 class="title">{title}</h1>
      <button title="Bookmarks" onClick={showBookmarks} style={{marginLeft: 'auto'}}>
        <span class="icon-bookmark"></span>
      </button>
      <button title="Episodes" onClick={showEpisodes}>
        <span class="icon-menu"></span>
      </button>
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
      dispatch(seekToPosition(position));
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
    showBookmarks() {
      dispatch({type: 'SHOW_BOOKMARKS'});
    },
    showEpisodes() {
      dispatch({type: 'SHOW_EPISODES'});
    }
  })
)(Player);
