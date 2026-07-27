/* PocketLedger PWA install helper */
let pocketLedgerInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  pocketLedgerInstallPrompt = event;
  window.dispatchEvent(new CustomEvent('pocketledger-install-ready'));
});

window.pocketLedgerInstall = async function () {
  if (!pocketLedgerInstallPrompt) return false;
  pocketLedgerInstallPrompt.prompt();
  const result = await pocketLedgerInstallPrompt.userChoice;
  pocketLedgerInstallPrompt = null;
  return result.outcome === 'accepted';
};

window.addEventListener('appinstalled', () => {
  pocketLedgerInstallPrompt = null;
  console.log('PocketLedger installed as a standalone PWA.');
});
