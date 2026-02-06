import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  pt: {
    // Header
    appTitle: 'Anime Calendar',
    appSubtitle: 'Descubra os animes da temporada e quando eles são lançados',
    
    // Seasons
    winter: 'Inverno',
    spring: 'Primavera',
    summer: 'Verão',
    fall: 'Outono',
    
    // Days
    all: 'Todos',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo',
    
    // Full days
    mondays: 'Segunda-feira',
    tuesdays: 'Terça-feira',
    wednesdays: 'Quarta-feira',
    thursdays: 'Quinta-feira',
    fridays: 'Sexta-feira',
    saturdays: 'Sábado',
    sundays: 'Domingo',
    unknown: 'Desconhecido',
    
    // Filters
    filterByDay: 'Filtrar por dia:',
    sortBy: 'Ordenar por:',
    score: 'Pontuação',
    popularity: 'Popularidade',
    title: 'Título',
    
    // Results
    animesFound: 'animes encontrados',
    animeFound: 'anime encontrado',
    noResults: 'Nenhum anime encontrado com os filtros selecionados.',
    
    // Loading
    loading: 'Carregando animes...',
    
    // Error
    errorLoading: 'Erro ao carregar animes. Tente novamente mais tarde.',
    tryAgain: 'Tentar novamente',
    
    // Anime Info
    release: 'Lançamento:',
    time: 'Horário:',
    type: 'Tipo:',
    episodes: 'Episódios:',
    studio: 'Studio:',
    members: 'Membros:',
    viewOnMAL: 'Ver no MyAnimeList',
    
    // Language
    language: 'Idioma',
    portuguese: 'Português',
    english: 'English',
    
    // Theme
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    
    // Favorites
    favorites: 'Favoritos',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    myFavorites: 'Meus Favoritos',
    noFavorites: 'Você ainda não tem favoritos. Clique no coração nos cards dos animes para adicionar!',
    
    // Search
    search: 'Buscar anime...',
    searchPlaceholder: 'Digite o nome do anime',
    clearSearch: 'Limpar busca',
    
    // Calendar
    calendar: 'Calendário',
    listView: 'Lista',
    calendarView: 'Calendário',
    weeklySchedule: 'Programação Semanal'
  },
  
  en: {
    // Header
    appTitle: 'Anime Calendar',
    appSubtitle: 'Discover seasonal anime and their release schedule',
    
    // Seasons
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    
    // Days
    all: 'All',
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
    
    // Full days
    mondays: 'Monday',
    tuesdays: 'Tuesday',
    wednesdays: 'Wednesday',
    thursdays: 'Thursday',
    fridays: 'Friday',
    saturdays: 'Saturday',
    sundays: 'Sunday',
    unknown: 'Unknown',
    
    // Filters
    filterByDay: 'Filter by day:',
    sortBy: 'Sort by:',
    score: 'Score',
    popularity: 'Popularity',
    title: 'Title',
    
    // Results
    animesFound: 'animes found',
    animeFound: 'anime found',
    noResults: 'No anime found with selected filters.',
    
    // Loading
    loading: 'Loading anime...',
    
    // Error
    errorLoading: 'Error loading anime. Please try again later.',
    tryAgain: 'Try again',
    
    // Anime Info
    release: 'Release:',
    time: 'Time:',
    type: 'Type:',
    episodes: 'Episodes:',
    studio: 'Studio:',
    members: 'Members:',
    viewOnMAL: 'View on MyAnimeList',
    
    // Language
    language: 'Language',
    portuguese: 'Português',
    english: 'English',
    
    // Theme
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    
    // Favorites
    favorites: 'Favorites',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    myFavorites: 'My Favorites',
    noFavorites: 'You don\'t have any favorites yet. Click the heart on anime cards to add!',
    
    // Search
    search: 'Search anime...',
    searchPlaceholder: 'Type anime name',
    clearSearch: 'Clear search',
    
    // Calendar
    calendar: 'Calendar',
    listView: 'List',
    calendarView: 'Calendar',
    weeklySchedule: 'Weekly Schedule'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('anime-calendar-language');
    if (saved) return saved;
    
    // Detectar idioma do navegador
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('anime-calendar-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
