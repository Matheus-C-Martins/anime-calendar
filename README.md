# Anime Calendar 📺

Uma aplicação React moderna para visualizar animes da temporada atual com informações do MyAnimeList.

## 🌟 Funcionalidades

- ✅ Visualização de animes por temporada (Inverno, Primavera, Verão, Outono)
- ✅ Informações detalhadas de cada anime (pontuação, dias de lançamento, episódios)
- ✅ Filtros por dia da semana
- ✅ Ordenação por pontuação, popularidade ou título
- ✅ Interface responsiva e moderna
- ✅ Dados em tempo real via API Jikan (MyAnimeList)

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **Jikan API** - API gratuita para dados do MyAnimeList
- **GitHub Pages** - Hospedagem estática
- **GitHub Actions** - CI/CD para deploy automático

## 📦 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/anime-calendar.git
cd anime-calendar
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run deploy` - Faz deploy para GitHub Pages

## 🌐 Deploy

O projeto está configurado para fazer deploy automático no GitHub Pages através do GitHub Actions. Cada push na branch `main` dispara um novo deploy.

## 📝 API

Este projeto utiliza a [Jikan API](https://jikan.moe/), uma API REST não oficial do MyAnimeList. A API é completamente gratuita e não requer autenticação.

## 🎨 Features da Interface

- Seletor de temporada e ano
- Cards de anime com informações completas
- Sistema de filtros e ordenação
- Loading states e tratamento de erros
- Design responsivo para mobile

## 📄 Licença

Este projeto está sob a licença MIT.
