POCKETLEDGER STANDALONE PWA FIX

This package is designed for the existing PocketLedger index.html.

FILES:
- manifest.json: forces standalone display mode.
- sw.js: service worker with cache version reset.
- pwa-install.js: captures the browser's real PWA installation prompt.
- icons/: app icons.

IMPORTANT:
1. Keep index.html in the same folder as manifest.json and sw.js.
2. Add this in the <head> of index.html:
   <script src="pwa-install.js"></script>

3. Keep this in index.html:
   <link rel="manifest" href="manifest.json">

4. Keep service-worker registration at the bottom of index.html.

5. Serve the application through HTTPS or localhost.
   Do not open index.html by double-clicking it.

6. Do NOT use:
   Edge/Chrome menu -> Create shortcut

   That creates a shortcut.

7. Use the browser's actual:
   Install PocketLedger
   or
   Install app

After installing, open PocketLedger from the Windows Start menu or desktop app entry. It should open in a separate standalone window without the browser address bar.

If the old shortcut/PWA is already installed:
- uninstall/remove the old PocketLedger shortcut/app;
- clear the old service worker/cache;
- reload the website;
- install again using the browser's Install app option.
