import {bootServiceWorker} from '../common';
import {h, render} from 'preact';
import SyncSettings from './sync-settings';


bootServiceWorker();

render(<SyncSettings/>, document.getElementById('mount'));
