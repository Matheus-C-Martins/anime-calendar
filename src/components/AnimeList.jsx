import { useState } from 'react';
import './AnimeList.css';
import AnimeCard from './AnimeCard';

function AnimeList({ animes }) {
  const [filterDay, setFilterDay] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const days = ['all', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];
  const dayLabels = {
    'all': 'Todos',
    'Mondays': 'Segunda',
    'Tuesdays': 'Terça',
    'Wednesdays': 'Quarta',
    'Thursdays': 'Quinta',
    'Fridays': 'Sexta',
    'Saturdays': 'Sábado',
    'Sundays': 'Domingo'
  };

  // Filtrar por dia
  const filteredAnimes = filterDay === 'all' 
    ? animes 
    : animes.filter(anime => anime.broadcast?.day === filterDay);

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

  return (
    <div className="anime-list-container">
      <div className="filters">
        <div className="filter-group">
          <label>Filtrar por dia:</label>
          <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
            {days.map(day => (
              <option key={day} value={day}>{dayLabels[day]}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="score">Pontuação</option>
            <option value="popularity">Popularidade</option>
            <option value="title">Título</option>
          </select>
        </div>

        <div className="results-count">
          {sortedAnimes.length} anime{sortedAnimes.length !== 1 ? 's' : ''} encontrado{sortedAnimes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="anime-grid">
        {sortedAnimes.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {sortedAnimes.length === 0 && (
        <div className="no-results">
          <p>Nenhum anime encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
}

export default AnimeList;
