import {h, Component} from 'preact';


export default class Podcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: []
    };
  }

  componentDidMount() {
    fetch('/list')
    .then(res => res.json())
    .then(podcasts => {
      this.setState({podcasts});
    });
  }

  render(props, {podcasts}) {
    return <div class="podcasts">
      {podcasts.map(podcast => <Podcast podcast={podcast}/>)}
    </div>;
  }
}

const Podcast = ({podcast}) => {
  const {name, humanName} = podcast;

  return <section class="podcast-card">
    <a href={`/p/${name}`}>
      <img class="card-image" src={`/p/${name}/icon`}/>
      <h1 class="card-title">{humanName}</h1>
    </a>
  </section>;
};

function getPodcastUrl(name) {
  return `/p/${podcastName}`;
}
