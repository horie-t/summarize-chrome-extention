document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getSelectedText,
        },
        function (results) {
          document.getElementById('selected-text').innerText = results[0].result;
        }
      );
    });
  });
  
  function getSelectedText() {
    return window.getSelection().toString();
  }
  