import {h} from 'hyperapp';
import Podcast from './podcast-entry';
import {podcasts} from '../../../dist/data/podcasts-hardcoded';
import Link from './components/link';


export default (state, actions) => {
  return <div class="podcast-app">
    <div class="syncbar">
      <Link class="syncbtn button" href="/sync" go={actions.router.go}>Sync</Link>
    </div>
    <div class="podcasts">
      {podcasts.map(podcast => <Podcast go={actions.router.go} {...podcast}/>)}
    </div>
  </div>
};
