// >>> External modules >>>
// a set of modules that are intended to run in the window context, which is to say, inside of your web pages.
import { Workbox } from 'workbox-window';

// >>> Internal modules >>>
// export Editor class
import Editor from './editor';
// includes all exports to update the database and the stylesheet
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// load the spinning elements
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Create a new instance of the Editor class
const editor = new Editor();

if (typeof editor === 'undefined') {
  // if no editor is defined, call the loadSpinner function
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Create a new instance of the workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  // register workbox service worker
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
