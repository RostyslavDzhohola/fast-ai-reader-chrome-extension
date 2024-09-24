console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('Background script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === 'showPopup') {
    console.log('Attempting to show popup');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.action.setPopup({ tabId: tabs[0].id, popup: 'popup.html' });
        chrome.action.setIcon({ tabId: tabs[0].id, path: 'icon-34.png' });
        chrome.action.openPopup();
        console.log('Popup should be shown now');
        sendResponse({ success: true });
      } else {
        console.error('No active tab found');
        sendResponse({ success: false, error: 'No active tab' });
      }
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
