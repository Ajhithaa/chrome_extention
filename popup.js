document.getElementById('summarize-btn').addEventListener('click', function () {
  // Get the active tab and capture its content
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: getPageContent
    }, (results) => {
      const pageContent = results[0].result;
      chrome.runtime.sendMessage({ action: "summarize", content: pageContent }, function(response) {
        document.getElementById('output').innerText = response.summary;
      });
    });
  });
});

// Function to capture more meaningful content of the page (focusing on paragraphs)
function getPageContent() {
  const paragraphs = document.querySelectorAll('p');
  let content = '';
  
  paragraphs.forEach(p => {
    content += p.innerText + '\n';
  });
  
  return content;
}
