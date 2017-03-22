import {h, Component} from 'preact';


export default class AudioComponent extends Component {
  constructor(props) {
    super(props);

    this.el = new Audio()
    this.el.preload = 'auto';
  }

  componentDidMount() {
    const {el} = this;
    const {
      src,
      playing,
      position,
      onStateChange,
      onEnded,
      volume
    } = this.props;

    el.src = src;
    el.volume = volume;

    if(position) {
      seekWhenReady(el, position);
    }

    if(playing) {
      playWhenReady(el);
    }

    if(onStateChange) {
      const stateChange = () => {
        onStateChange({position: el.currentTime, playing: !el.paused, duration: el.duration});
      };

      el.ontimeupdate = stateChange;
      el.ondurationchange = stateChange;
      el.onplaying = stateChange;
    }

    if(onEnded) {
      el.onended = () => onEnded();
    }
  }

  componentWillReceiveProps({src, playing, position, volume}) {
    const {el, props} = this;

    if(volume !== el.volume) {
      el.volume = volume;
    }

    if(src && src !== props.src) {
      try { el.pause(); } catch(e) { console.log('src change error', e) }

      el.src = src;

      if(playing) {
        playWhenReady(el);
      }
    }

    if(playing === (!props.playing)) {
      if(el.paused) {
        playWhenReady(el);
      } else {
        el.pause();
      }
    }

    if(position != null && position !== props.position) {
      seekWhenReady(el, position);
    }
  }

  render(props, state) {
    return null;
  }
}


function playWhenReady(audio) {
  whenAudioReady(audio).then(() => audio.play());
}

function seekWhenReady(audio, position) {
  whenAudioReady(audio).then(() => audio.currentTime = position);
}

function whenAudioReady(audio) {
  return new Promise((resolve, reject) => {
    if(audio.readyState === audio.HAVE_ENOUGH_DATA) {
      resolve();
    } else {
      audio.addEventListener('canplaythrough', () => {
        resolve();
      }, {once: true});
    }
  });
}
