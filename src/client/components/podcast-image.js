import {h, Component} from 'preact';
import {getRemoteFile} from '../common';


export default class PodcastImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: ''
    };
  }

  componentWillReceiveProps(props) {
    if(props.src === '') {
      this.setState({src: ''});
    } else if(props.src !== this.state.src) {
      fetch(props.src)
      .then(res => {
          if(res.ok) {
            this.setState({src: props.src});
          } else {
            throw null;
          }
      })
      .catch(err => {
        this.setState({src: ''});
      });
    }
  }

  render(props, {src}) {
    return <div class="podcast-image">
      <img src={src || '/images/podcast_300.png'}/>
    </div>;
  }
}
