import * as firebase from './firebase.js';
import * as core from './core.js';
const [app,database]=firebase.load();
core.init();
