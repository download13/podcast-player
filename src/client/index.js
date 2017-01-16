import {h, render} from 'preact';
import Router from 'preact-router';
import Podcasts from './components/podcasts';
import Player from './components/player';


if(location.protocol === 'http:' && location.hostname !== 'localhost') {
  location.replace('https://' + location.host + location.pathname);
}

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

const place = localStorage.getItem('place');
if(place) {
  localStorage.setItem('mbmbam_place', place);
  localStorage.removeItem('place');
}

render(
  <Router>
    <Podcasts path="/"/>
    <Player path="/p/:podcast"/>
  </Router>,
  document.getElementById('mount')
);
