# 📺 Anime Calendar

> Uma aplicação web moderna e responsiva para acompanhar os animes de cada temporada com informações detalhadas do MyAnimeList.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://matheus-c-martins.github.io/anime-calendar/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Destaques

- 🌍 **Suporte Multilíngue** - Português (PT) e Inglês (EN)
- 🌓 **Tema Claro/Escuro** - Alterna entre modos com persistência
- ❤️ **Sistema de Favoritos** - Salva seus animes preferidos localmente
- 📱 **PWA** - Instalável como aplicação nativa
- 🔍 **Busca Global** - Encontre animes por nome instantaneamente
- 📊 **Duas Vistas** - Lista detalhada ou calendário semanal
- ⚡ **Performance** - Loading skeletons e caching inteligente
- 🎨 **Design Moderno** - Interface limpa e animações suaves

## 🚀 Demo

**[Ver aplicação ao vivo →](https://matheus-c-martins.github.io/anime-calendar/)**

## 📋 Funcionalidades

### Core Features
- ✅ **Seleção de Temporada** - Navegue entre anos (2000-2030) e temporadas (Inverno, Primavera, Verão, Outono)
- ✅ **Visualizações Flexíveis** - Alterne entre vista de lista e calendário semanal
- ✅ **Filtros Avançados** - Filtre por dia da semana e ordene por pontuação, popularidade ou título
- ✅ **Busca em Tempo Real** - Encontre animes enquanto digita
- ✅ **Modal de Detalhes** - Veja sinopse completa, gêneros, estúdios e mais
- ✅ **Favoritos Persistentes** - Adicione/remova favoritos com localStorage

### UX/UI Features
- ✅ **Internacionalização** - Sistema completo de traduções PT/EN
- ✅ **Temas Dinâmicos** - Dark/Light mode com transições suaves
- ✅ **Skeleton Loading** - Feedback visual durante carregamento
- ✅ **Navbar Responsiva** - Menu hamburger em mobile
- ✅ **Animações** - Hover effects e transições com cubic-bezier
- ✅ **Estados Disabled** - Filtros mostram-se disabled na vista de calendário mantendo valores

### Funcionalidades PWA
- ✅ **Instalável** - Adicione à tela inicial do dispositivo
- ✅ **Service Worker** - Cache inteligente para uso offline
- ✅ **Manifest** - Ícones e configurações para experiência nativa
- ✅ **Prompt de Instalação** - UI customizada para instalação

## 🛠️ Tecnologias

### Frontend
- **[React 19.2.0](https://reactjs.org/)** - Biblioteca UI com hooks modernos
- **[Vite 5.4.0](https://vitejs.dev/)** - Build tool ultra-rápido
- **CSS3** - Variáveis CSS, Grid, Flexbox, animações

### APIs e Serviços
- **[Jikan API v4](https://jikan.moe/)** - API REST do MyAnimeList
- **Context API** - Gerenciamento de estado global (Theme, Language, Favorites)
- **localStorage** - Persistência de preferências do utilizador

### DevOps
- **[GitHub Pages](https://pages.github.com/)** - Hospedagem estática
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automático
- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** - Configuração PWA

## 📂 Estrutura do Projeto

```
anime-calendar/
├── public/
│   ├── android-chrome-192x192.png    # PWA icon 192x192
│   ├── android-chrome-512x512.png    # PWA icon 512x512
│   ├── apple-touch-icon.png          # iOS icon
│   ├── favicon.ico                   # Favicon
│   └── vite.svg                      # Vite logo
├── src/
│   ├── assets/                       # Recursos estáticos
│   ├── components/                   # Componentes React
│   │   ├── AnimeCard/               # Card individual de anime
│   │   │   ├── AnimeCard.jsx
│   │   │   ├── AnimeCard.css
│   │   │   └── index.js
│   │   ├── AnimeList/               # Lista/grid de animes
│   │   │   ├── AnimeList.jsx
│   │   │   ├── AnimeList.css
│   │   │   └── index.js
│   │   ├── AnimeModal/              # Modal com detalhes completos
│   │   │   ├── AnimeModal.jsx
│   │   │   ├── AnimeModal.css
│   │   │   └── index.js
│   │   ├── InstallPrompt/           # Prompt de instalação PWA
│   │   │   ├── InstallPrompt.jsx
│   │   │   ├── InstallPrompt.css
│   │   │   └── index.js
│   │   ├── Navbar/                  # Barra de navegação
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── index.js
│   │   ├── SearchBar/               # Barra de pesquisa
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchBar.css
│   │   │   └── index.js
│   │   ├── SeasonSelector/          # Seletor de temporada/ano
│   │   │   ├── SeasonSelector.jsx
│   │   │   ├── SeasonSelector.css
│   │   │   └── index.js
│   │   ├── SkeletonCard/            # Loading skeleton
│   │   │   ├── SkeletonCard.jsx
│   │   │   ├── SkeletonCard.css
│   │   │   └── index.js
│   │   ├── ViewToggle/              # Toggle lista/calendário
│   │   │   ├── ViewToggle.jsx
│   │   │   ├── ViewToggle.css
│   │   │   └── index.js
│   │   └── WeeklyCalendar/          # Vista de calendário semanal
│   │       ├── WeeklyCalendar.jsx
│   │       ├── WeeklyCalendar.css
│   │       └── index.js
│   ├── contexts/                     # React Context providers
│   │   ├── FavoritesContext.jsx     # Gestão de favoritos
│   │   ├── LanguageContext.jsx      # Sistema de traduções
│   │   └── ThemeContext.jsx         # Tema claro/escuro
│   ├── services/                     # Lógica de API
│   │   └── jikanApi.js              # Cliente Jikan API com cache
│   ├── App.jsx                       # Componente raiz
│   ├── App.css                       # Estilos globais
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Reset e variáveis CSS
├── .github/
│   └── workflows/
│       └── deploy.yml                # Workflow de deploy
├── index.html                        # HTML principal
├── vite.config.js                    # Configuração Vite + PWA
├── package.json                      # Dependências e scripts
└── README.md                         # Documentação

```

## 🎯 Arquitetura

### Componentes Principais

#### `App.jsx`
- Gerencia estado global (animes, loading, erro, filtros)
- Controla visualização (lista vs calendário)
- Integra todos os contextos (Theme, Language, Favorites)

#### `AnimeList.jsx`
- Renderiza grid de animes com filtros ativos
- Implementa busca, filtro por dia e ordenação
- Gerencia modal de detalhes

#### `WeeklyCalendar.jsx`
- Organiza animes por dia da semana
- Layout em grid 7 colunas (seg-dom)
- Mostra filtros disabled mantendo valores

#### Context Providers
- **LanguageContext** - Traduções PT/EN com função `t()`
- **ThemeContext** - Tema dark/light com localStorage
- **FavoritesContext** - CRUD de favoritos com localStorage

### Fluxo de Dados

1. **Seleção de Temporada** → `App.jsx` → `fetchSeasonalAnime()`
2. **API Response** → Cache (30min) → Estado `animes`
3. **Filtros/Busca** → `AnimeList.jsx` → Arrays filtrados
4. **Toggle Vista** → `ViewToggle` → `AnimeList` ou `WeeklyCalendar`
5. **Favoritos** → `FavoritesContext` → localStorage → Re-render

## 🚀 Começar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Matheus-C-Martins/anime-calendar.git
cd anime-calendar
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 5173) |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Preview da build de produção localmente |
| `npm run deploy` | Build + deploy para GitHub Pages |

## 🌐 Deploy

### GitHub Pages (Automático)

O projeto usa **GitHub Actions** para deploy automático:

1. Cada push para `main` dispara workflow
2. Build da aplicação com Vite
3. Deploy para branch `gh-pages`
4. Disponível em: `https://matheus-c-martins.github.io/anime-calendar/`

**Configuração:**
- Workflow: `.github/workflows/deploy.yml`
- Base URL: `/anime-calendar/` (definido em `vite.config.js`)

### Deploy Manual

```bash
npm run build
npm run deploy
```

## 🎨 Customização

### Temas

Edite variáveis CSS em `src/index.css`:

```css
:root {
  --bg-gradient-start: #1a1a2e;
  --bg-gradient-end: #16213e;
  --text-primary: #ffffff;
  /* ... */
}

[data-theme="light"] {
  --bg-gradient-start: #f0f4f8;
  /* ... */
}
```

### Traduções

Adicione/modifique em `src/contexts/LanguageContext.jsx`:

```javascript
const translations = {
  pt: {
    appTitle: 'Anime Calendar',
    // ...
  },
  en: {
    appTitle: 'Anime Calendar',
    // ...
  }
};
```

## 📊 Performance

- **Bundle Size**: ~243 KB (gzip: ~67 KB)
- **First Load**: < 2s (conexão 3G)
- **API Cache**: 30 minutos
- **Skeleton Loading**: Feedback em < 100ms
- **PWA Score**: 100/100 (Lighthouse)

## 🐛 Troubleshooting

### API Rate Limiting
A Jikan API tem limite de 3 requisições/segundo e 60/minuto. O projeto implementa:
- Cache de 30min por temporada
- Debounce em requisições sequenciais
- Error handling com retry

### Build Errors
```bash
# Limpar cache e reinstalar
rm -rf node_modules dist
npm install
npm run build
```

## 🤝 Contribuir

Contribuições são bem-vindas! 

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Matheus C. Martins**

- GitHub: [@Matheus-C-Martins](https://github.com/Matheus-C-Martins)

## 🙏 Agradecimentos

- [Jikan API](https://jikan.moe/) - API gratuita do MyAnimeList
- [MyAnimeList](https://myanimelist.net/) - Fonte de dados
- [React](https://reactjs.org/) - Framework fantástico
- [Vite](https://vitejs.dev/) - Build tool incrível

---

⭐ Se este projeto te ajudou, considera dar uma estrela no GitHub!
