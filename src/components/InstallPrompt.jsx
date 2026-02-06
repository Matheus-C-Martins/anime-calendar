import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './InstallPrompt.css';

function InstallPrompt() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Check if user has dismissed the prompt before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  const messages = {
    pt: {
      title: '📱 Instalar Aplicativo',
      description: 'Adicione o Anime Calendar à sua tela inicial para acesso rápido e funcionalidade offline!',
      install: 'Instalar',
      later: 'Agora não'
    },
    en: {
      title: '📱 Install App',
      description: 'Add Anime Calendar to your home screen for quick access and offline functionality!',
      install: 'Install',
      later: 'Not now'
    }
  };

  const t = messages[language];

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-text">
          <h3>{t.title}</h3>
          <p>{t.description}</p>
        </div>
        <div className="install-prompt-actions">
          <button className="install-btn" onClick={handleInstallClick}>
            {t.install}
          </button>
          <button className="dismiss-btn" onClick={handleDismiss}>
            {t.later}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;
