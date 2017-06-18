import {h} from 'hyperapp';
import * as styles from './player.scss';


const PlayButton = () =>
  <button class="toggle-playing" onclick={togglePlaying} title={uiShowsPlaying ? 'Pause' : 'Play'}>
    <span class={uiShowsPlaying ? 'icon-pause' : 'icon-play'}></span>
  </button>;

export default (state, actions) => {
  const {episode} = state.player;

  if(episode) {
    const {title} = episode;

    return <div class={styles.appPlayer}>
      {title}
      <div class={styles.seek_scrub}>
        <PlayButton/>
        <input
          class="scrubber"
          type="range"
          min="0"
          max={Math.round(duration)}
          value={Math.round(uiPosition)}
          oninput={seekScrubbedTo}
        />
        <div class="time">{formatTime(uiPosition) + ' / ' + formatTime(duration)}</div>
      </div>
    </div>
  } else {
    return null;
  }
};
