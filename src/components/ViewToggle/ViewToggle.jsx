import { useLanguage } from '../../contexts/LanguageContext';
import './ViewToggle.css';

function ViewToggle({ view, onViewChange }) {
  const { t } = useLanguage();

  return (
    <div className="view-toggle">
      <button 
        className={`view-btn ${view === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        aria-label={t('listView')}
      >
        <span className="view-icon">▦</span>
        <span className="view-label">{t('listView')}</span>
      </button>
      <button 
        className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
        onClick={() => onViewChange('calendar')}
        aria-label={t('calendarView')}
      >
        <span className="view-icon">📅</span>
        <span className="view-label">{t('calendarView')}</span>
      </button>
    </div>
  );
}

export default ViewToggle;
