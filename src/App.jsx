import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AnimeList from './components/AnimeList';
import WeeklyCalendar from './components/WeeklyCalendar';
import SeasonSelector from './components/SeasonSelector';
import ViewToggle from './components/ViewToggle';
import SkeletonCard from './components/SkeletonCard';
import InstallPrompt from './components/InstallPrompt';
import { fetchSeasonalAnime } from './services/jikanApi';
import { useLanguage } from './contexts/LanguageContext';
import { useFavorites } from './contexts/FavoritesContext';

function App() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState({ season: 'winter', year: 2026 });
  const [view, setView] = useState(() => {
    return localStorage.getItem('anime-calendar-view') || 'list';
  });
  const [showFavorites, setShowFavorites] = useState(false);

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

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const displayAnimes = showFavorites ? favorites : animes;

  return (
    <div className="app">
      <Navbar 
        onShowFavorites={handleShowFavorites}
        showingFavorites={showFavorites}
      />

      <div className="app-content">
        {!showFavorites && (
          <SeasonSelector 
            currentSeason={selectedSeason.season}
            currentYear={selectedSeason.year}
            onSeasonChange={handleSeasonChange}
          />
        )}

        {showFavorites && (
          <div className="favorites-header">
            <h2>❤️ {t('myFavorites')}</h2>
            <p className="favorites-count">
              {favorites.length} {favorites.length === 1 ? t('animeFound') : t('animesFound')}
            </p>
          </div>
        )}

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

      {!loading && !error && displayAnimes.length > 0 && (
        view === 'list' ? (
          <AnimeList animes={displayAnimes} showFilters={!showFavorites} view={view} setView={handleViewChange} />
        ) : (
          <WeeklyCalendar animes={displayAnimes} view={view} setView={handleViewChange} />
        )
      )}

        {!loading && !error && displayAnimes.length === 0 && showFavorites && (
          <div className="no-favorites">
            <p className="no-favorites-icon">💔</p>
            <h3>{t('noFavorites')}</h3>
          </div>
        )}

        <InstallPrompt />
      </div>
    </div>
  );
}

export default App;
