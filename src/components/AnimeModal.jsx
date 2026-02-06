import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { getDayOfWeek } from '../services/jikanApi';
import './AnimeModal.css';

function AnimeModal({ anime, onClose }) {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(anime.id);
  const broadcastDay = getDayOfWeek(anime.broadcast, language);
  const broadcastTime = anime.broadcast?.time || '';

  useEffect(() => {
    // Bloquear scroll quando modal aberto
    document.body.style.overflow = 'hidden';
    
    // Fechar com tecla ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <img src={anime.image} alt={anime.title} className="modal-image" />
            {anime.score && (
              <div className="modal-score">
                ⭐ {anime.score.toFixed(2)}
                {anime.scoredBy && (
                  <span className="modal-score-count">
                    ({anime.scoredBy.toLocaleString()} {language === 'pt' ? 'votos' : 'votes'})
                  </span>
                )}
              </div>
            )}
            <button 
              className={`modal-favorite-btn ${favorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(anime)}
              aria-label={favorite ? t('removeFromFavorites') : t('addToFavorites')}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="modal-header-info">
            <h2 className="modal-title">{anime.title}</h2>
            
            {anime.titleEnglish && anime.titleEnglish !== anime.title && (
              <p className="modal-title-alt">{anime.titleEnglish}</p>
            )}
            
            {anime.titleJapanese && (
              <p className="modal-title-japanese">{anime.titleJapanese}</p>
            )}

            <div className="modal-badges">
              {anime.type && (
                <span className="modal-badge">{anime.type}</span>
              )}
              {anime.status && (
                <span className="modal-badge">{anime.status}</span>
              )}
              {anime.year && (
                <span className="modal-badge">{anime.year}</span>
              )}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="modal-info-label">📅 {t('release')}</span>
              <span className="modal-info-value">{broadcastDay}</span>
            </div>

            {broadcastTime && (
              <div className="modal-info-item">
                <span className="modal-info-label">🕐 {t('time')}</span>
                <span className="modal-info-value">{broadcastTime} (JST)</span>
              </div>
            )}

            {anime.episodes && (
              <div className="modal-info-item">
                <span className="modal-info-label">📼 {t('episodes')}</span>
                <span className="modal-info-value">{anime.episodes}</span>
              </div>
            )}

            {anime.popularity && (
              <div className="modal-info-item">
                <span className="modal-info-label">🔥 {t('popularity')}</span>
                <span className="modal-info-value">#{anime.popularity}</span>
              </div>
            )}

            {anime.rank && (
              <div className="modal-info-item">
                <span className="modal-info-label">🏆 Rank</span>
                <span className="modal-info-value">#{anime.rank}</span>
              </div>
            )}

            {anime.members && (
              <div className="modal-info-item">
                <span className="modal-info-label">👥 {t('members')}</span>
                <span className="modal-info-value">{anime.members.toLocaleString()}</span>
              </div>
            )}
          </div>

          {anime.studios && anime.studios.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">🎬 {t('studio')}</h3>
              <div className="modal-tags">
                {anime.studios.map(studio => (
                  <span key={studio.mal_id} className="modal-tag">{studio.name}</span>
                ))}
              </div>
            </div>
          )}

          {anime.genres && anime.genres.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">🎭 {language === 'pt' ? 'Gêneros' : 'Genres'}</h3>
              <div className="modal-tags">
                {anime.genres.map(genre => (
                  <span key={genre.mal_id} className="modal-tag genre-tag">{genre.name}</span>
                ))}
              </div>
            </div>
          )}

          {anime.themes && anime.themes.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">🎨 {language === 'pt' ? 'Temas' : 'Themes'}</h3>
              <div className="modal-tags">
                {anime.themes.map(theme => (
                  <span key={theme.mal_id} className="modal-tag">{theme.name}</span>
                ))}
              </div>
            </div>
          )}

          {anime.demographics && anime.demographics.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">👤 {language === 'pt' ? 'Demografia' : 'Demographics'}</h3>
              <div className="modal-tags">
                {anime.demographics.map(demo => (
                  <span key={demo.mal_id} className="modal-tag">{demo.name}</span>
                ))}
              </div>
            </div>
          )}

          {anime.synopsis && (
            <div className="modal-section">
              <h3 className="modal-section-title">📖 {language === 'pt' ? 'Sinopse' : 'Synopsis'}</h3>
              <p className="modal-synopsis">{anime.synopsis}</p>
            </div>
          )}

          <div className="modal-actions">
            <a 
              href={anime.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="modal-button primary"
            >
              {t('viewOnMAL')} →
            </a>
            <button 
              onClick={() => toggleFavorite(anime)}
              className={`modal-button ${favorite ? 'secondary' : 'primary'}`}
            >
              {favorite ? '❤️ ' + t('removeFromFavorites') : '🤍 ' + t('addToFavorites')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeModal;
