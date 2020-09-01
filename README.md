# Chrome/Firefox Extension to Update/Print Record Fields in ServiceNow Tables

## Building
```bash
yarn install
yarn build

# Then copy dist/js/app.xxxxxxxx.js to extensions/chrome_ext/js
# Then edit the js reference in extensions/chrome_ext/index.html
# Follow the same for extensions/firefox_ext
```

## Installing Extension in Chrome
* Navigate to chrome://extensions/
* Enable Developer Mode on Top Right
* Click Load Unpacked and select extensions/chrome_ext folder

## Installing Extension in Firefox
* Navigate to about:debugging
* Select This Firefox on left
* Click Load Temporary Add-on and select extensions/chrome_ext/manifest.json
