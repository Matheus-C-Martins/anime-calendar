import { useState } from 'react';
import './AnimeList.css';
import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';
import { useLanguage } from '../contexts/LanguageContext';

function AnimeList({ animes, showFilters = true }) {
  const { t } = useLanguage();
  const [filterDay, setFilterDay] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [searchTerm, setSearchTerm] = useState('');

  const days = ['all', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];
  
  const getDayLabel = (day) => {
    const dayMap = {
      'all': 'all',
      'Mondays': 'monday',
      'Tuesdays': 'tuesday',
      'Wednesdays': 'wednesday',
      'Thursdays': 'thursday',
      'Fridays': 'friday',
      'Saturdays': 'saturday',
      'Sundays': 'sunday'
    };
    return t(dayMap[day]);
  };

  // Filtrar por busca
  const searchedAnimes = searchTerm 
    ? animes.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.titleEnglish?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.titleJapanese?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : animes;

  // Filtrar por dia
  const filteredAnimes = filterDay === 'all' 
    ? searchedAnimes 
    : searchedAnimes.filter(anime => anime.broadcast?.day === filterDay);

  // Ordenar
  const sortedAnimes = [...filteredAnimes].sort((a, b) => {
    if (sortBy === 'score') {
      if (!a.score && !b.score) return 0;
      if (!a.score) return 1;
      if (!b.score) return -1;
      return b.score - a.score;
    } else if (sortBy === 'popularity') {
      return a.popularity - b.popularity;
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="anime-list-container">
      {showFilters && (
        <>
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          <div className="filters">
            <div className="filter-group">
              <label>{t('filterByDay')}</label>
              <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
                {days.map(day => (
                  <option key={day} value={day}>{getDayLabel(day)}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>{t('sortBy')}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="score">{t('score')}</option>
                <option value="popularity">{t('popularity')}</option>
                <option value="title">{t('title')}</option>
              </select>
            </div>

            <div className="results-count">
              {sortedAnimes.length} {sortedAnimes.length === 1 ? t('animeFound') : t('animesFound')}
            </div>
          </div>
        </>
      )}

      <div className="anime-grid">
        {sortedAnimes.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {sortedAnimes.length === 0 && (
        <div className="no-results">
          <p>{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}

export default AnimeList;
