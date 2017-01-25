import {h, Component} from 'preact';
import {getRemoteFile, getBlob} from '../common';
import PodcastImage from './podcast-image';
import Audio from './audio';
import {storePlace, getPlace} from './sync';


export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageUrl: '',
      currentAudioUrl: '',
      episodes: [],
      index: 0,
      playing: false,
      actualPlaying: false,
      playFromPosition: 0,
      actualPosition: 0,
      duration: 0,
      autoplay: true
    };

    this.lastUserActivity = 0;

    this.keyListener = this.keyListener.bind(this);
    this.userActivity = this.userActivity.bind(this);
    this.unloadListener = this.unloadListener.bind(this);
    this.visibilityChange = this.visibilityChange.bind(this);
    this.episodeEnded = this.episodeEnded.bind(this);
    this.audioPlayingChange = this.audioPlayingChange.bind(this);
    this.audioPositionChange = this.audioPositionChange.bind(this);
    this.audioDurationChange = this.audioDurationChange.bind(this);
  }

  componentDidMount() {
    getEpisodes(this.props.podcast).then(episodes => {
      this.setState({episodes});
      this.load();
    });

    window.addEventListener('beforeunload', this.unloadListener);
    window.addEventListener('keyup', this.keyListener);
    window.addEventListener('mousemove', this.userActivity);
    window.addEventListener('pointermove', this.userActivity);
    window.addEventListener('visibilitychange', this.visibilityChange);

    this.saveInterval = setInterval(() => {
      if(this.state.actualPlaying) {
        this.save();
      }
    }, 10 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.saveInterval);

    window.removeEventListener('beforeunload', this.unloadListener);
    window.removeEventListener('keyup', this.keyListener);
    window.removeEventListener('mousemove', this.userActivity);
    window.removeEventListener('pointermove', this.userActivity);
    window.removeEventListener('visibilitychange', this.visibilityChange);
  }

  render(props, {
    currentImageUrl,
    currentAudioUrl,
    index,
    episodes,
    autoplay,
    playing,
    actualPlaying,
    actualPosition,
    duration,
    playFromPosition
  }) {
    const {title, imageUrl, audioUrl, status} = episodes[index] || {};

    let downloadIcon = 'icon-download';
    let downloadTitle = 'Download for Offline Listening';
    if(status === 'downloading') {
      downloadIcon = 'icon-spin';
      downloadTitle = 'Downloading...'
    } else if(status === 'downloaded') {
      downloadIcon = 'icon-ok';
      downloadTitle = 'Downloaded to Device';
    }

    return <div class="player">
      <div class="titlebar">
        <a class="back button" href="/">
          <span class="icon-play"></span>
        </a>
        <h1 class="title">{title}</h1>
      </div>
      <PodcastImage src={currentImageUrl}/>
      <Audio
        src={currentAudioUrl}
        playing={playing}
        position={playFromPosition}
        onPositionChange={this.audioPositionChange}
        onDurationChange={this.audioDurationChange}
        onPlayingChange={this.audioPlayingChange}
        onEnded={this.episodeEnded}
      />
      <div class="seek_scrub">
        <button class="toggle-playing" onClick={() => this.togglePlaying()} title={actualPlaying ? 'Pause' : 'Play'}>
          <span class={actualPlaying ? 'icon-pause' : 'icon-play'}></span>
        </button>
        <input
          class="scrubber"
          type="range"
          min="0"
          max={Math.round(duration)}
          value={Math.round(actualPosition)}
          onInput={e => this.seekTo(parseInt(e.target.value))}
        />
        <div class="time">{formatTime(actualPosition) + ' / ' + formatTime(duration)}</div>
      </div>
      <div class="seek">
        <button onClick={() => this.seekBackward(30)} title="Back 30 Seconds">
          <span class="icon-fast-bw"></span> 30
        </button>
        <button onClick={() => this.seekBackward(5)} title="Back 5 Seconds">
          <span class="icon-fast-bw"></span> 5
        </button>
        <button onClick={() => this.seekForward(5)} title="Forward 5 Seconds">
          5 <span class="icon-fast-fw"></span>
        </button>
        <button onClick={() => this.seekForward(30)} title="Forward 30 Seconds">
          30 <span class="icon-fast-fw"></span>
        </button>
      </div>
      <div class="nav">
        <button onClick={() => this.previousEpisode()} title="Previous Episode">
          <span class="icon-to-start-alt"></span>
        </button>
        <input type="number" onKeyUp={e => this.gotoIndexOnEnter(e)} onInput={e => this.gotoIndex(e)} value={index + 1}/>
        <button onClick={() => this.nextEpisode()} title="Next Episode">
          <span class="icon-to-end-alt"></span>
        </button>
        <button onClick={() => this.cacheEpisode()} title={downloadTitle}>
          <span class={downloadIcon}></span>
        </button>
      </div>
      <div class="options">
        <span>
          <input type="checkbox" id="autoplay_opt" checked={autoplay} onChange={e => this.setAutoplay(e.target.checked)}/>
          <label for="autoplay_opt">Autoplay</label>
        </span>
      </div>
    </div>;
  }

  audioPlayingChange(playing) {
    this.setState({actualPlaying: playing});

    if(!playing) {
      this.save();

      const {podcast} = this.props;
      storePlace(podcast, localStorage.getItem(podcast + '_place'));
    }
  }

  audioPositionChange(position) {
    this.setState({actualPosition: position});
  }

  episodeEnded() {
    const {index, episodes, autoplay} = this.state;

    if(index < episodes.length - 1 && autoplay) {
      this.selectEpisode(index + 1);
    }
  }

  audioDurationChange(duration) {
    this.setState({duration});
  }

  keyListener(e) {
    if(e.code === 'Space') {
      e.preventDefault();
      this.togglePlaying();
    }

    this.userActivity();
  }

  visibilityChange() {
    if(document.visibilityState === 'visible') {
      this.userActivity();
    }
  }

  userActivity() {
    const {playing, actualPlaying} = this.state;
    if(!playing && !actualPlaying) {
      const now = Date.now();
      if(now - this.lastUserActivity > 60000) {
        this.lastUserActivity = now;
        this.loadRemotePlace();
      }
    }
  }

  unloadListener() {
    const {podcast} = this.props;

    this.save();
    storePlace(podcast, localStorage.getItem(podcast + '_place'));
  }

  loadRemotePlace() {
    const {podcast} = this.props;
    getPlace(podcast)
    .then(blob => {
      if(blob) {
        localStorage.setItem(podcast + '_place', blob);
      }
      this.load();
    });
  }

  previousEpisode() {
    const {index} = this.state;

    this.selectEpisode(Math.max(index - 1, 0));
  }

  nextEpisode() {
    const {index, episodes} = this.state;

    this.selectEpisode(Math.min(index + 1, episodes.length - 1));
  }

  selectEpisode(index) {
    const {podcast} = this.props;
    const {episodes, currentImageUrl, currentAudioUrl} = this.state;
    const imageUrl = getImageUrl(podcast, index);
    const audioUrl = getAudioUrl(podcast, index);

    caches.open('episodes')
    .then(cache => Promise.all([
      cache.match(imageUrl).then(getBlob),
      cache.match(audioUrl).then(getBlob)
    ]))
    .then(([imgBlob, audioBlob]) => {
      if(currentImageUrl) {
        URL.revokeObjectURL(currentImageUrl);
      }

      if(currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }

      this.setEpisodeStatus(index, audioBlob ? 'downloaded' : null);
      this.setState({
        index,
        currentImageUrl: imgBlob ? URL.createObjectURL(imgBlob) : imageUrl,
        currentAudioUrl: audioBlob ? URL.createObjectURL(audioBlob) : audioUrl
      });

      if(episodes[index]) {
        document.title = episodes[index].title;
      }
    });
  }

  seekTo(position) {
    this.setState({
      playFromPosition: position,
      actualPosition: position
    });
  }

  seekBackward(seconds) {
    const {actualPosition} = this.state;
    const newPosition = actualPosition - seconds;
    this.setState({
      playFromPosition: newPosition,
      actualPosition: newPosition
    });
  }

  seekForward(seconds) {
    const {actualPosition} = this.state;
    const newPosition = actualPosition + seconds;
    this.setState({
      playFromPosition: newPosition,
      actualPosition: newPosition
    });
  }

  togglePlaying() {
    this.setState({playing: !this.state.actualPlaying});
  }

  setAutoplay(autoplay) {
    this.setState({autoplay});
  }

  gotoIndexOnEnter(e) {
    if(e.key === 'Enter') {
      this.gotoIndex(e);
    }
  }

  gotoIndex(e) {
    const {episodes} = this.state;
    const index = parseInt(e.target.value);

    if(typeof index === 'number' && !isNaN(index)) {
      this.selectEpisode(clamp(index - 1, 0, episodes.length - 1));
    }
  }

  save() {
    const {podcast} = this.props;
    const {index, actualPlaying, actualPosition, autoplay} = this.state;

    const data = JSON.stringify({
      index,
      playing: actualPlaying,
      position: actualPosition,
      autoplay
    });

    localStorage.setItem(podcast + '_place', data);
  }

  load() {
    const {podcast} = this.props;

    try {
      const {index, playing, position, autoplay} = JSON.parse(localStorage.getItem(podcast + '_place'));
      this.setState({
        playFromPosition: position,
        playing,
        autoplay
      });
      this.selectEpisode(index);
    } catch(e) {
      console.log('Invalid saved JSON');
      this.selectEpisode(0);
    }
  }

  cacheEpisode() {
    const {podcast} = this.props;
    const {index, episodes} = this.state;
    const episode = episodes[index];

    if(episode.status) return;

    this.setEpisodeStatus(index, 'downloading');

    cacheEpisode(podcast, index, episode.size)
    .then(() => {
      this.setEpisodeStatus(index, 'downloaded');
    });
  }

  setEpisodeStatus(index, status) {
    const {episodes} = this.state;
    const episode = episodes[index];

    episodes.splice(index, 1, {...episode, status});

    this.setState({episodes: episodes.slice()});
  }
}

function formatTime(n) {
  let hours = Math.floor(n / 60);
  if(hours < 10) hours = '0' + hours;

  let minutes = Math.floor(n % 60);
  if(minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
}

function getEpisodes(name) {
  return fetch(`/p/${name}/list`)
  .then(res => res.json());
}

function cacheEpisode(podcastName, index, fileSize, onProgress) {
  const imageUrl = getImageUrl(podcastName, index);
  const audioUrl = getAudioUrl(podcastName, index);

  return Promise.all([
    caches.open('episodes'),
    getRemoteFile(imageUrl),
    getRemoteFile(audioUrl, onProgress)
  ])
  .then(([cache, image, audio]) => {
    cache.put(imageUrl, new Response(image));
    cache.put(audioUrl, new Response(audio));
  });
}

function getImageUrl(podcastName, index) {
  return `/p/${podcastName}/episodes/${index}/image`;
}

function getAudioUrl(podcastName, index) {
  return `/p/${podcastName}/episodes/${index}/audio`;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
