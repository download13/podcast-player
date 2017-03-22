import {h, Component} from 'preact';


export default class PodcastImage extends Component {
  constructor(props) {
    super(props);
    this.state = {src: props.src};
  }

  componentWillReceiveProps(props) {
    this.setState({src: props.src});
  }

  render(props, {src}) {
    return <div class="podcast-image">
      <img src={src} onError={e => this.setState({src: '/images/podcast_300.png'})}/>
    </div>;
  }
}
