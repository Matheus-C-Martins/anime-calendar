import { useState } from 'react';
import './AnimeList.css';
import AnimeCard from './AnimeCard';
import AnimeModal from './AnimeModal';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import { useLanguage } from '../contexts/LanguageContext';

function AnimeList({ animes, showFilters = true, view, setView, isCalendarView = false }) {
  const { t } = useLanguage();
  const [filterDay, setFilterDay] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);

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
  const filteredAnimes = filterDay && filterDay !== 'all'
    ? searchedAnimes.filter(anime => anime.broadcast?.day === filterDay)
    : searchedAnimes;

  // Ordenar
  const sortedAnimes = [...filteredAnimes].sort((a, b) => {
    if (!sortBy) return 0;
    
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
        <div className="filters-bar">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} disabled={isCalendarView} />
          
          <select className="filter-select" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} disabled={isCalendarView}>
            <option value="">{t('filterDay')}</option>
            <option value="all">{t('all')}</option>
            {days.filter(d => d !== 'all').map(day => (
              <option key={day} value={day}>{getDayLabel(day)}</option>
            ))}
          </select>

          <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} disabled={isCalendarView}>
            <option value="">{t('filterSort')}</option>
            <option value="score">{t('score')}</option>
            <option value="popularity">{t('popularity')}</option>
            <option value="title">{t('title')}</option>
          </select>

          <ViewToggle view={view} onViewChange={setView} />
        </div>
      )}

      <div className="anime-grid">
        {sortedAnimes.map(anime => (
          <AnimeCard 
            key={anime.id} 
            anime={anime} 
            onCardClick={() => setSelectedAnime(anime)}
          />
        ))}
      </div>

      {sortedAnimes.length === 0 && (
        <div className="no-results">
          <p>{t('noResults')}</p>
        </div>
      )}

      {selectedAnime && (
        <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}
    </div>
  );
}

export default AnimeList;
