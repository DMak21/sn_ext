chrome.storage.local.get({ settings: "{}" }, (items) => {
  const settings = JSON.parse(items["settings"]);

  if ("exp1" in settings && settings["exp1"])
    if (document.readyState !== "complete") {
      window.addEventListener("load", executeCode);
    } else {
      executeCode();
    }
});

function executeCode() {
  const iframe = document.getElementById("gsft_main");
  const doc = iframe
    ? iframe.contentDocument || iframe.contentWindow.document
    : document;

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
