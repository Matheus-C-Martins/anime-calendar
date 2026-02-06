import { useState, useEffect } from 'react';
import './App.css';
import AnimeList from './components/AnimeList';
import SeasonSelector from './components/SeasonSelector';
import { fetchSeasonalAnime } from './services/jikanApi';

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
    } catch (err) {
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
        <h1>📺 Anime Calendar</h1>
        <p>Descubra os animes da temporada e quando eles são lançados</p>
      </header>
      
      <SeasonSelector 
        currentSeason={selectedSeason.season}
        currentYear={selectedSeason.year}
        onSeasonChange={handleSeasonChange}
      />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando animes...</p>
        </div>
      )}

      {error && (
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
