import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './SearchBar.css';

function SearchBar({ onSearch = () => {}, onClear = () => {}, disabled = false }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={handleChange}
          disabled={disabled}
          aria-label={t('search')}
        />
        {searchTerm && (
          <button 
            className="clear-search-btn"
            onClick={handleClear}
            aria-label={t('clearSearch')}
            title={t('clearSearch')}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
