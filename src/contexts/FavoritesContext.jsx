import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('anime-calendar-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('anime-calendar-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (animeId) => {
    return favorites.some(fav => fav.id === animeId);
  };

  const addFavorite = (anime) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === anime.id)) {
        return prev;
      }
      return [...prev, anime];
    });
  };

  const removeFavorite = (animeId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== animeId));
  };

  const toggleFavorite = (anime) => {
    if (isFavorite(anime.id)) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      isFavorite, 
      addFavorite, 
      removeFavorite, 
      toggleFavorite,
      clearFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
