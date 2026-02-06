const BASE_URL = 'https://api.jikan.moe/v4';

// Função para adicionar delay entre requests (Jikan API tem rate limiting)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cache simples para evitar requests desnecessários
const cache = new Map();

export const fetchSeasonalAnime = async (year, season) => {
  const cacheKey = `${year}-${season}`;
  
  // Verificar cache
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    const cacheAge = Date.now() - cached.timestamp;
    // Cache válido por 10 minutos
    if (cacheAge < 600000) {
      return cached.data;
    }
  }

  try {
    await delay(1000); // Rate limiting
    const response = await fetch(`${BASE_URL}/seasons/${year}/${season}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Processar e formatar os dados
    const animes = result.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      titleEnglish: anime.title_english,
      titleJapanese: anime.title_japanese,
      image: anime.images.jpg.large_image_url,
      score: anime.score,
      scoredBy: anime.scored_by,
      rank: anime.rank,
      popularity: anime.popularity,
      members: anime.members,
      synopsis: anime.synopsis,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      airing: anime.airing,
      aired: anime.aired,
      broadcast: anime.broadcast,
      season: anime.season,
      year: anime.year,
      studios: anime.studios,
      genres: anime.genres,
      themes: anime.themes,
      demographics: anime.demographics,
      url: anime.url
    }));

    // Ordenar por score (maiores primeiro)
    const sortedAnimes = animes.sort((a, b) => {
      if (!a.score && !b.score) return 0;
      if (!a.score) return 1;
      if (!b.score) return -1;
      return b.score - a.score;
    });

    // Salvar no cache
    cache.set(cacheKey, {
      data: sortedAnimes,
      timestamp: Date.now()
    });

    return sortedAnimes;
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    throw error;
  }
};

// Função para obter a temporada e ano atual
export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  
  let season;
  if (month >= 1 && month <= 3) {
    season = 'winter';
  } else if (month >= 4 && month <= 6) {
    season = 'spring';
  } else if (month >= 7 && month <= 9) {
    season = 'summer';
  } else {
    season = 'fall';
  }
  
  return { season, year };
};

// Função para obter o dia da semana em português
export const getDayOfWeek = (broadcast) => {
  if (!broadcast?.day) return 'Desconhecido';
  
  const days = {
    'Mondays': 'Segunda-feira',
    'Tuesdays': 'Terça-feira',
    'Wednesdays': 'Quarta-feira',
    'Thursdays': 'Quinta-feira',
    'Fridays': 'Sexta-feira',
    'Saturdays': 'Sábado',
    'Sundays': 'Domingo'
  };
  
  return days[broadcast.day] || broadcast.day;
};
