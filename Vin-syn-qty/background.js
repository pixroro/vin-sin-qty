// Listen for extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    // Inject the content script into the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"]
      },
      (result) => {
        if (chrome.runtime.lastError) {
          console.error("Script injection failed: ", chrome.runtime.lastError.message);
        }
      }
    );
  }
});
