import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimeModal from './AnimeModal';
import ViewToggle from './ViewToggle';
import './WeeklyCalendar.css';

function WeeklyCalendar({ animes, view, setView }) {
  const { t } = useLanguage();
  const [selectedAnime, setSelectedAnime] = useState(null);

  const daysOfWeek = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];
  
  const getDayLabel = (day) => {
    const dayMap = {
      'Mondays': 'mondays',
      'Tuesdays': 'tuesdays',
      'Wednesdays': 'wednesdays',
      'Thursdays': 'thursdays',
      'Fridays': 'fridays',
      'Saturdays': 'saturdays',
      'Sundays': 'sundays'
    };
    return t(dayMap[day]);
  };

  const getAnimesByDay = (day) => {
    return animes
      .filter(anime => anime.broadcast?.day === day)
      .sort((a, b) => {
        // Ordenar por horário se disponível
        if (a.broadcast?.time && b.broadcast?.time) {
          return a.broadcast.time.localeCompare(b.broadcast.time);
        }
        // Senão, ordenar por score
        if (!a.score && !b.score) return 0;
        if (!a.score) return 1;
        if (!b.score) return -1;
        return b.score - a.score;
      });
  };

  const unknownDayAnimes = animes.filter(anime => !anime.broadcast?.day);

  return (
    <div className="weekly-calendar">      <div className="calendar-controls">
        <ViewToggle view={view} setView={setView} />
      </div>
            <div className="calendar-grid">
        {daysOfWeek.map(day => {
          const dayAnimes = getAnimesByDay(day);
          
          return (
            <div key={day} className="calendar-day">
              <div className="day-header">
                <h3 className="day-name">{getDayLabel(day)}</h3>
                <span className="day-count">{dayAnimes.length}</span>
              </div>
              
              <div className="day-animes">
                {dayAnimes.length > 0 ? (
                  dayAnimes.map(anime => (
                    <div 
                      key={anime.id} 
                      className="calendar-anime-item"
                      onClick={() => setSelectedAnime(anime)}
                    >
                      <div className="calendar-anime-image">
                        <img src={anime.image} alt={anime.title} />
                      </div>
                      
                      <div className="calendar-anime-info">
                        <h4 className="calendar-anime-title">{anime.title}</h4>
                        
                        {anime.broadcast?.time && (
                          <div className="calendar-anime-time">
                            🕐 {anime.broadcast.time} (JST)
                          </div>
                        )}
                        
                        {anime.score && (
                          <div className="calendar-anime-score">
                            ⭐ {anime.score.toFixed(2)}
                          </div>
                        )}
                        
                        {anime.genres && anime.genres.length > 0 && (
                          <div className="calendar-anime-genres">
                            {anime.genres.slice(0, 2).map(genre => (
                              <span key={genre.mal_id} className="genre-tag-small">
                                {genre.name}
                              </span>
                            ))}
                            {anime.genres.length > 2 && (
                              <span className="genre-tag-small">+{anime.genres.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-animes-day">
                    <p>{t('noResults')}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {unknownDayAnimes.length > 0 && (
        <div className="calendar-day unknown-day">
          <div className="day-header">
            <h3 className="day-name">{t('unknown')}</h3>
            <span className="day-count">{unknownDayAnimes.length}</span>
          </div>
          
          <div className="day-animes horizontal-scroll">
            {unknownDayAnimes.map(anime => (
              <div 
                key={anime.id} 
                className="calendar-anime-item"
                onClick={() => setSelectedAnime(anime)}
              >
                <div className="calendar-anime-image">
                  <img src={anime.image} alt={anime.title} />
                </div>
                
                <div className="calendar-anime-info">
                  <h4 className="calendar-anime-title">{anime.title}</h4>
                  
                  {anime.score && (
                    <div className="calendar-anime-score">
                      ⭐ {anime.score.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedAnime && (
        <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}
    </div>
  );
}

export default WeeklyCalendar;
