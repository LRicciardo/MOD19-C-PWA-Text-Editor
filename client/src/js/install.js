//
// controls the button to install the application locallly.

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// EventHandler window (global) object (before DOM)
//   (screen object is just for the physical screen dimensions)
//  when the window is displayed, (before the installation of the app),
//      we want the button to show 
window.addEventListener('beforeinstallprompt', (event) => {
  // sets the state of the deferredPrompt
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
//  event listener on the install button
butInstall.addEventListener('click', async () => {
  // holds the value of the deferredPrompt
  const promptEvent = window.deferredPrompt;
  // checks the state of the deferredPrompt
  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
  // changes the state of the deferredPrompt
  window.deferredPrompt = null;
  // changes the class to hide the install button
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // changes the state of the deferredPrompt
  window.deferredPrompt = null;
});
