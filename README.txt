POCKETLEDGER PWA FIX

Put these files in the same project folder as index.html:

manifest.json
sw.js
icons/icon-192.svg
icons/icon-512.svg

Your existing index.html already contains:
- the manifest link
- service-worker registration

Important:
1. Do not open index.html by double-clicking it.
2. Serve the folder through localhost or HTTPS.
3. For a quick local test, run a local web server in the project folder.
4. After replacing the files, clear the old service worker/cache once and reload.

The PWA installation prompt may still appear. That is normal: the prompt is the browser offering installation. The actual installed app should open in standalone mode after installation.
