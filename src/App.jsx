import { useState, useEffect } from 'react';
import './App.css';
import AnimeList from './components/AnimeList';
import SeasonSelector from './components/SeasonSelector';
import LanguageToggle from './components/LanguageToggle';
import { fetchSeasonalAnime } from './services/jikanApi';
import { useLanguage } from './contexts/LanguageContext';
{ t } = useLanguage();
  const 
function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState({ season: 'winter', year: 2026 });

  useEffect(() => {
    loadAnimes();
  }, [selectedSeason]);

  const loadAnimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSeasonalAnime(selectedSeason.year, selectedSeason.season);
      setAnimes(data);
    } catch (ert('errorLoading')
      setError('Erro ao carregar animes. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (season, year) => {
    setSelectedSeason({ season, year });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <LanguageToggle />
        </div>
        <h1>📺 {t('appTitle')}</h1>
        <p>{t('appSubtitle')}</p>
      </header>
      
      <SeasonSelector 
        currentSeason={selectedSeason.season}
        currentYear={selectedSeason.year}
        onSeasonChange={handleSeasonChange}
      />

      {loadin{t('loading')}</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadAnimes}>{t('tryAgain')}
        <div className="error">
          <p>{error}</p>
          <button onClick={loadAnimes}>Tentar novamente</button>
        </div>
      )}

      {!loading && !error && (
        <AnimeList animes={animes} />
      )}
    </div>
  );
}

export default App;
