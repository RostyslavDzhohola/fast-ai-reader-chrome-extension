import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
console.log('Content script loaded');

printLine("Using the 'printLine' function from the Print Module");

function injectPopup() {
  console.log('Checking URL:', window.location.hostname);
  if (window.location.hostname === 'discord.com') {
    console.log('Discord detected, sending message to show popup');
    chrome.runtime.sendMessage({ action: 'showPopup' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent, response:', response);
      }
    });
  } else {
    console.log('Not on Discord, popup not shown');
  }
}

// Run the injection function when the page loads
document.addEventListener('DOMContentLoaded', injectPopup);

// Also run the injection function when the URL changes without a page reload
let lastUrl = window.location.href;
new MutationObserver(() => {
  const url = window.location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL changed, running injectPopup');
    injectPopup();
  }
}).observe(document, { subtree: true, childList: true });
