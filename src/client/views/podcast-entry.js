import {h} from 'hyperapp';
import {Link} from './components';


export default ({name, humanName, go}) => {
  return <section class="podcast-card">
    <Link href={`/p/${name}`} go={go}>
      <img class="card-image" src={`/p/${name}/icon`}/>
      <h1 class="card-title">{humanName}</h1>
    </Link>
  </section>
};
