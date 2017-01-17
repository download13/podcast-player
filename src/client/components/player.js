import {h, Component} from 'preact';
import {getRemoteFile, getBlob} from '../common';
import PodcastImage from './podcast-image';


export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageUrl: '',
      currentAudioUrl: '',
      episodes: [],
      index: 0,
      playing: false,
      position: 0,
      duration: 0,
      autoplay: true
    };

    this.keyListener = this.keyListener.bind(this);
    this.unloadListener = this.unloadListener.bind(this);
  }

  componentDidMount() {
    const {audioEl} = this;

    getEpisodes(this.props.podcast).then(episodes => {
      this.setState({episodes});
      this.load();
    });

    audioEl.ontimeupdate = () => {
      this.setState({position: audioEl.currentTime});
    };

    audioEl.ondurationchange = () => {
      this.setState({duration: audioEl.duration});
    };

    audioEl.onplaying = audioEl.onpause = () => {
      this.setState({playing: !audioEl.paused})
    };

    window.addEventListener('beforeunload', this.unloadListener);
    window.addEventListener('keyup', this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unloadListener);
    window.removeEventListener('keyup', this.keyListener);
  }

  render(props, {
    currentImageUrl,
    currentAudioUrl,
    index,
    episodes,
    autoplay,
    playing,
    position,
    duration
  }) {
    const {title, imageUrl, audioUrl, status} = episodes[index] || {};

    let downloadIcon = 'icon-download';
    let downloadTitle = 'Download Episode';
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
      <audio
        class="audio"
        ref={el => this.audioEl = el}
        preload="auto"
        src={currentAudioUrl}
        onPause={() => this.save()}
        onEnded={() => this.episodeEnded()}
      ></audio>
      <div class="seek_scrub">
        <button class="toggle-playing" onClick={() => this.togglePlaying()} title={playing ? 'Pause' : 'Play'}>
          <span class={playing ? 'icon-pause' : 'icon-play'}></span>
        </button>
        <input
          class="scrubber"
          type="range"
          min="0"
          max={Math.round(duration)}
          value={Math.round(position)}
          onInput={e => this.seekTo(parseInt(e.target.value))}
        />
        <div class="time">{formatTime(position) + ' / ' + formatTime(duration)}</div>
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

  keyListener(e) {
    if(e.code === 'Space') {
      e.preventDefault();
      this.togglePlaying();
    }
  }

  unloadListener() {
    this.save();
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
    const {audioEl} = this;
    const {podcast} = this.props;
    const {episodes, currentImageUrl, currentAudioUrl, playing} = this.state;
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

      if(playing) {
        audioEl.addEventListener('canplay', () => {
          audioEl.play();
        }, {once: true});
      }

      document.title = episodes[index].title;
    });
  }

  seekTo(position) {
    this.audioEl.currentTime = position;
  }

  seekBackward(seconds) {
    this.audioEl.currentTime -= seconds;
  }

  seekForward(seconds) {
    this.audioEl.currentTime += seconds;
  }

  togglePlaying() {
    const {audioEl} = this;

    if(audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
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

  episodeEnded() {
    const {index, episodes, autoplay} = this.state;

    if(index < episodes.length - 1 && autoplay) {
      this.selectEpisode(index + 1);
    }
  }

  save() {
    const {podcast} = this.props;
    const {index, playing, position, autoplay} = this.state;

    const data = JSON.stringify({
      index,
      playing,
      position,
      autoplay
    });

    localStorage.setItem(podcast + '_place', data);
  }

  load() {
    const {audioEl} = this;
    const {podcast} = this.props;
    let place;
    try {
      const {index, playing, position, autoplay} = JSON.parse(localStorage.getItem(podcast + '_place'));
      audioEl.currentTime = position;
      this.setState({playing, autoplay});
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
