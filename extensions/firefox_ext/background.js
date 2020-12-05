// eslint-disable-next-line no-unused-vars
function updateRecords(url, script, doRun, doFocus, scope) {
  let codeToExecute =
    'document.getElementById("runscript").innerHTML = `' + script + "`;";

  if (scope != undefined && scope != "") {
    codeToExecute +=
      'const options = document.getElementsByName("sys_scope")[0].options;';
    codeToExecute += `const key = Object.keys(options).find((key) => options[key].text == "${scope}");`;
    codeToExecute += "if (key != undefined)";
    codeToExecute +=
      'document.getElementsByName("sys_scope")[0].value=options[key].value;';
  }

  if (doRun)
    codeToExecute += 'document.getElementsByName("runscript")[0].click();';

  chrome.tabs.create({ url, active: doFocus }, function(tab) {
    console.log("listener");
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (info.status === "complete" && tabId === tab.id) {
        chrome.tabs.executeScript(tab.id, { code: codeToExecute });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}
