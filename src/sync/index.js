import {bootServiceWorker, createApp} from '../common';
import SyncSettings from './sync-settings';


bootServiceWorker();

createApp(SyncSettings, document.getElementById('mount'));
