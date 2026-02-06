import { getDayOfWeek } from '../services/jikanApi';
import './AnimeCard.css';

function AnimeCard({ anime }) {
  const broadcastDay = getDayOfWeek(anime.broadcast);
  const broadcastTime = anime.broadcast?.time || '';

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
      </div>

      <div className="anime-content">
        <h3 className="anime-title">{anime.title}</h3>
        
        {anime.titleEnglish && anime.titleEnglish !== anime.title && (
          <p className="anime-title-alt">{anime.titleEnglish}</p>
        )}

        <div className="anime-info">
          <div className="info-item">
            <span className="info-label">📅 Lançamento:</span>
            <span className="info-value">{broadcastDay}</span>
          </div>

          {broadcastTime && (
            <div className="info-item">
              <span className="info-label">🕐 Horário:</span>
              <span className="info-value">{broadcastTime} (JST)</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">📺 Tipo:</span>
            <span className="info-value">{anime.type || 'N/A'}</span>
          </div>

          {anime.episodes && (
            <div className="info-item">
              <span className="info-label">📼 Episódios:</span>
              <span className="info-value">{anime.episodes}</span>
            </div>
          )}

          {anime.studios && anime.studios.length > 0 && (
            <div className="info-item">
              <span className="info-label">🎬 Studio:</span>
              <span className="info-value">{anime.studios[0].name}</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">👥 Membros:</span>
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
          Ver no MyAnimeList →
        </a>
      </div>
    </div>
  );
}

export default AnimeCard;
