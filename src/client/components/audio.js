import {h, Component} from 'preact';


export default class Audio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {el} = this;
    const {
      onPositionChange,
      onDurationChange,
      onPlayingChange
    } = this.props;

    if(onPositionChange) {
      el.ontimeupdate = () => onPositionChange(el.currentTime);
    }

    if(onDurationChange) {
      el.ondurationchange = () => onDurationChange(el.duration);
    }

    if(onPlayingChange) {
      el.onplaying = el.onpause = () => onPlayingChange(!el.paused);
    }

    audioEl.onplaying = audioEl.onpause = () => {
      this.setState({playing: !audioEl.paused})
    };
  }

  componentWillReceiveProps(newProps) {
    const {el} = this;
    const {playing, src} = newProps;

    if(playing) {

    }
  }

  render(props, state) {
    return <audio
      class="audio"
      ref={el => this.el = el}
      preload="auto"
      src={currentAudioUrl}
      onPause={() => this.save()}
      onEnded={() => this.episodeEnded()}
    />;
  }
}
