let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('install-btn');
  if (installBtn) installBtn.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User ${outcome} the install prompt`);
        deferredPrompt = null;
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/wp-content/themes/astra-child/service-worker.js')
      .then(() => console.log('✅ Giggre Service Worker registered'))
      .catch(err => console.error('❌ SW registration failed:', err));
  }
});
