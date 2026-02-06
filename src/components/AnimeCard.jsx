import { getDayOfWeek } from '../services/jikanApi';
import { useLanguage } from '../contexts/LanguageContext';
import { useFavorites } from '../contexts/FavoritesContext';
import './AnimeCard.css';

function AnimeCard({ anime }) {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const broadcastDay = getDayOfWeek(anime.broadcast, language);
  const broadcastTime = anime.broadcast?.time || '';
  const favorite = isFavorite(anime.id);

  return (
    <div className="anime-card">
      <div className="anime-image-container">
        <img 
          src={anime.image} 
          alt={anime.title}
          className="anime-image"
          loading="lazy"
        />
        {anime.score && (
          <div className="anime-score">
            ⭐ {anime.score.toFixed(2)}
          </div>
        )}
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(anime)}
          aria-label={favorite ? t('removeFromFavorites') : t('addToFavorites')}
          title={favorite ? t('removeFromFavorites') : t('addToFavorites')}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="anime-content">
        <h3 className="anime-title">{anime.title}</h3>
        
        {anime.titleEnglish && anime.titleEnglish !== anime.title && (
          <p className="anime-title-alt">{anime.titleEnglish}</p>
        )}

        <div className="anime-info">
          <div className="info-item">
            <span className="info-label">📅 {t('release')}</span>
            <span className="info-value">{broadcastDay}</span>
          </div>

          {broadcastTime && (
            <div className="info-item">
              <span className="info-label">🕐 {t('time')}</span>
              <span className="info-value">{broadcastTime} (JST)</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">📺 {t('type')}</span>
            <span className="info-value">{anime.type || 'N/A'}</span>
          </div>

          {anime.episodes && (
            <div className="info-item">
              <span className="info-label">📼 {t('episodes')}</span>
              <span className="info-value">{anime.episodes}</span>
            </div>
          )}

          {anime.studios && anime.studios.length > 0 && (
            <div className="info-item">
              <span className="info-label">🎬 {t('studio')}</span>
              <span className="info-value">{anime.studios[0].name}</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">👥 {t('members')}</span>
            <span className="info-value">{anime.members?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>

        {anime.genres && anime.genres.length > 0 && (
          <div className="anime-genres">
            {anime.genres.slice(0, 3).map(genre => (
              <span key={genre.mal_id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {anime.synopsis && (
          <p className="anime-synopsis">
            {anime.synopsis.length > 150 
              ? anime.synopsis.substring(0, 150) + '...' 
              : anime.synopsis}
          </p>
        )}

        <a 
          href={anime.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="anime-link"
        >
          {t('viewOnMAL')} →
        </a>
      </div>
    </div>
  );
}

export default AnimeCard;
