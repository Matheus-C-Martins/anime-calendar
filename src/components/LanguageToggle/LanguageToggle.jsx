import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className={`lang-option ${language === 'pt' ? 'active' : ''}`}>PT</span>
      <span className="lang-separator">/</span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
    </button>
  );
}

export default LanguageToggle;
