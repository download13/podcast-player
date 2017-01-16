import {h, render} from 'preact';
import Router from 'preact-router';
import Podcasts from './components/podcasts';
import Player from './components/player';


if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

render(
  <Router>
    <Podcasts path="/"/>
    <Player path="/p/:podcast"/>
  </Router>,
  document.getElementById('mount')
);
