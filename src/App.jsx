import { useState, useEffect } from 'react';
import './App.css';
import AnimeList from './components/AnimeList';
import WeeklyCalendar from './components/WeeklyCalendar';
import SeasonSelector from './components/SeasonSelector';
import LanguageToggle from './components/LanguageToggle';
import ThemeToggle from './components/ThemeToggle';
import ViewToggle from './components/ViewToggle';
import SkeletonCard from './components/SkeletonCard';
import { fetchSeasonalAnime } from './services/jikanApi';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState({ season: 'winter', year: 2026 });
  const [view, setView] = useState(() => {
    return localStorage.getItem('anime-calendar-view') || 'list';
  });

  useEffect(() => {
    loadAnimes();
  }, [selectedSeason]);

  const loadAnimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSeasonalAnime(selectedSeason.year, selectedSeason.season);
      setAnimes(data);
    } catch (err) {
      setError(t('errorLoading'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (season, year) => {
    setSelectedSeason({ season, year });
  };

  const handleViewChange = (newView) => {
    setView(newView);
    localStorage.setItem('anime-calendar-view', newView);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <h1> {t('appTitle')}</h1>
        <p>{t('appSubtitle')}</p>
      </header>
      
      <div className="controls-container">
        <SeasonSelector 
          currentSeason={selectedSeason.season}
          currentYear={selectedSeason.year}
          onSeasonChange={handleSeasonChange}
        />
        {!loading && !error && (
          <ViewToggle view={view} onViewChange={handleViewChange} />
        )}
      </div>

      {loading && (
        <div className="skeleton-container">
          <div className="anime-grid">
            {[...Array(12)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadAnimes}>{t('tryAgain')}</button>
        </div>
      )}

      {!loading && !error && (
        view === 'list' ? (
          <AnimeList animes={animes} />
        ) : (
          <WeeklyCalendar animes={animes} />
        )
      )}
    </div>
  );
}

export default App;
