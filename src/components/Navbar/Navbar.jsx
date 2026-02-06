import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Navbar.css';

function Navbar({ onShowFavorites, showingFavorites }) {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    onShowFavorites();
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-icon">📺</span>
          <span className="navbar-title">Anime Calendar</span>
        </div>

        <button 
          className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <button 
            className={`navbar-item favorites-btn ${showingFavorites ? 'active' : ''}`}
            onClick={handleFavoritesClick}
            aria-label="Favoritos"
          >
            <span className="navbar-item-icon">❤️</span>
            <span className="navbar-item-text">
              {language === 'pt' ? 'Favoritos' : 'Favorites'}
            </span>
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </button>

          <button 
            className="navbar-item theme-toggle"
            onClick={() => { toggleTheme(); closeMenu(); }}
            aria-label={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            <span className="navbar-item-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="navbar-item-text">
              {theme === 'dark' 
                ? (language === 'pt' ? 'Modo Claro' : 'Light Mode')
                : (language === 'pt' ? 'Modo Escuro' : 'Dark Mode')
              }
            </span>
          </button>

          <button 
            className="navbar-item language-toggle"
            onClick={() => { toggleLanguage(); closeMenu(); }}
            aria-label={language === 'pt' ? 'Português' : 'English'}
          >
            <span className="navbar-item-icon">{language === 'pt' ? '🇵🇹' : '🇺🇸'}</span>
            <span className="navbar-item-text">
              {language === 'pt' ? 'Português' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
