function updateRecords(url, script, doRun, doFocus) {
  let codeToExecute =
    'document.getElementById("runscript").innerHTML = `' + script + "`;";
  if (doRun)
    codeToExecute += 'document.getElementsByName("runscript")[0].click();';

  chrome.tabs.create({ url, active: doFocus }, function(tab) {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (info.status === "complete" && tabId === tab.id) {
        chrome.tabs.executeScript(tab.id, { code: codeToExecute });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}
