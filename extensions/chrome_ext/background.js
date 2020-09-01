function updateRecords(url, script, doRun, doFocus) {
  let codeToExecute = 'document.getElementById("runscript").innerHTML = `' + script +'`;'
	if(doRun)
		codeToExecute+='document.getElementsByName("runscript")[0].click();';

	console.log(codeToExecute);

  chrome.tabs.create(
    { url, active: doFocus },
    function(tab) {
      console.log("listener");
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (info.status === "complete" && tabId === tab.id) {
          chrome.tabs.executeScript(tab.id, { code: codeToExecute });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    }
  );
}
