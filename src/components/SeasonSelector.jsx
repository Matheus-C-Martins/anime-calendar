import { useState } from 'react';
import './SeasonSelector.css';

const SEASONS = [
  { value: 'winter', label: '❄️ Inverno', emoji: '❄️' },
  { value: 'spring', label: '🌸 Primavera', emoji: '🌸' },
  { value: 'summer', label: '☀️ Verão', emoji: '☀️' },
  { value: 'fall', label: '🍂 Outono', emoji: '🍂' }
];

function SeasonSelector({ currentSeason, currentYear, onSeasonChange }) {
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    onSeasonChange(season, selectedYear);
  };

  const handleYearChange = (direction) => {
    const newYear = direction === 'next' ? selectedYear + 1 : selectedYear - 1;
    if (newYear >= 2000 && newYear <= 2030) {
      setSelectedYear(newYear);
      onSeasonChange(selectedSeason, newYear);
    }
  };

  return (
    <div className="season-selector">
      <div className="year-selector">
        <button 
          onClick={() => handleYearChange('prev')}
          disabled={selectedYear <= 2000}
          className="year-btn"
        >
          ← 
        </button>
        <h2>{selectedYear}</h2>
        <button 
          onClick={() => handleYearChange('next')}
          disabled={selectedYear >= 2030}
          className="year-btn"
        >
          →
        </button>
      </div>

      <div className="seasons-grid">
        {SEASONS.map(season => (
          <button
            key={season.value}
            onClick={() => handleSeasonClick(season.value)}
            className={`season-btn ${selectedSeason === season.value ? 'active' : ''}`}
          >
            <span className="season-emoji">{season.emoji}</span>
            <span className="season-label">{season.label.replace(season.emoji + ' ', '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SeasonSelector;
