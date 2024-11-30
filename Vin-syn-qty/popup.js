document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    // Inject the content script every time the popup is opened
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"],
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError.message);
          document.getElementById("results").textContent = "Error: Could not load data.";
          return;
        }

        // Get the results from the content script
        const output = results && results[0]?.result;

        const list = document.getElementById("results");
        list.innerHTML = ""; // Clear previous results

        if (output && output.length > 0) {
          output
            .filter(item => parseInt(item.split(':')[1].trim(), 10) > 0) // Exclude 0 quantities
            .forEach(item => {
              const li = document.createElement("li");
              li.textContent = item;
              list.appendChild(li);
            });
        } else {
          list.textContent = "No options with available inventory found.";
        }
      }
    );
  });
});
