chrome.storage.local.get({ settings: "{}" }, (items) => {
  const settings = JSON.parse(items["settings"]);

  if ("exp1" in settings && settings["exp1"]) {
    var actualCode = `function dispatchIfIframeReady(iframe, count) {
      let doc = iframe.contentDocument || iframe.contentWindow.document;
    
      if (count > 50)
        return;
    
      if (doc.loaded == true) {
        document.dispatchEvent(new CustomEvent('snext_loaded', { detail: "iframe" }));
        return;
      }
    
      setTimeout(() => {
        dispatchIfIframeReady(iframe, ++count);
      }, 500);
    }
    
    function executeCode() {
      const iframe = document.getElementById("gsft_main");
    
      if (iframe) {
        dispatchIfIframeReady(iframe, 0);
      } else {
        document.dispatchEvent(new CustomEvent('snext_loaded', { detail: "window" }));
      }
    }
    
    
    if (document.readyState !== "complete") {
      window.addEventListener("load", executeCode);
    } else {
      executeCode();
    }`;

    var script = document.createElement("script");
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    // script.remove();
  }
});

document.addEventListener("snext_loaded", function(e) {
  var data = e.detail;

  if (data == "iframe") {
    const iframe = document.getElementById("gsft_main");
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    executeCodeWindow(doc);
  } else if (data == "window") {
    executeCodeWindow(document);
  }
});

function executeCodeWindow(doc) {
  doc.querySelectorAll("label").forEach((N) => {
    let u = N.childNodes[1];
    const v = N.parentNode.id
      .split(".")
      .filter((c, i) => i > 1)
      .join(".");
    if (v) {
      u = u ? u : N;

      N.ondblclick = () => {
        if (u.innerHTML == v) {
          u.classList.remove("color-red");
          u.innerHTML = u.getAttribute("old-value");
        } else if (v) {
          u.classList.add("color-red");
          u.setAttribute("old-value", u.innerHTML);
          u.innerHTML = v;
        }
      };
    }
  });
}
