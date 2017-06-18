import {h} from 'hyperapp';
import Link from './components/link';
import {ProgressPlayPauseButton} from './components/play-pause-button';
import styles from './episodes.scss';


const Episode = ({
  title,
  date,
  downloadProgress,

  deleteEpisode,
  downloadEpisode,
  playEpisode
}) => {
  let button;
  if(downloadProgress === 1) {
    button = <button onclick={deleteEpisode} class={styles.leanRight}>
      <span class="icon-trash-empty"></span>
    </button>;
  } else if(downloadProgress === 0) {
    button = <button onclick={downloadEpisode} class={styles.leanRight}>
      <span class="icon-download-cloud"></span>
    </button>;
  } else if(typeof downloadProgress !== 'number') {
    button = <div class={styles.progress}>
      {downloadProgress}
    </div>;
  } else {
    button = <div class={styles.progress}>
      {Math.round(downloadProgress * 100) + '%'}
    </div>;
  }

  return <div class={styles.episode}>
    <time datetime={formatDate(date)}>{formatHumanDate(date)}</time>
    <div class={styles.title}>{title}</div>
    <ProgressPlayPauseButton progress={1} playing={false} color={'#fff'}/>
    <button onClick={playEpisode}>
      <span class="icon-play"></span>
    </button>
    {button}
  </div>;
};


export default (state, actions) => {
  // TODO: When showing this page, scroll to the currently playing episode if there is one
  const {episodes} = state.episodeList;

  const {downloadEpisode, deleteEpisode} = actions.storage;

  // TODO: Show size of all cached episodes
  return <div>
    <div class={styles.titlebar}>
      <Link class={styles.back} title="Back to Podcasts" href="/" go={actions.router.go}>
        <span class="icon-play"></span>
      </Link>
    </div>
    <div class={styles.episodes}>
      {episodes.map(episode => {
        return <Episode
          key={episode.index}
          {...episode}
        />
      })}
    </div>
  </div>;
};


function formatDate(time) {
  const d = new Date(time);

  return (d.getYear() + 1900) + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function formatHumanDate(time) {
  const d = new Date(time);

  return (d.getMonth() + 1) + '/' + d.getDate();
}
