# 📱 PWA Features - Anime Calendar

## O que foi implementado

### ✅ Progressive Web App (PWA)
A aplicação agora é um **PWA completo** com todas as funcionalidades de uma aplicação nativa!

## Funcionalidades

### 🔌 Funciona Offline
- **Service Worker** ativo que armazena dados em cache
- Animes já visualizados ficam disponíveis offline
- Imagens e recursos são salvos automaticamente
- Cache inteligente com estratégias diferentes:
  - **API Jikan**: Network First (sempre tenta buscar dados frescos)
  - **Imagens MAL**: Cache First (economiza dados, carrega instantâneo)

### 📲 Instalável
- Botão "Instalar" aparece automaticamente no navegador
- Componente **InstallPrompt** notifica usuários sobre a instalação
- Funciona em **Android, iOS, Windows, macOS, Linux**
- Abre em janela própria, sem barra do navegador

### ⚡ Performance
- **Carregamento instantâneo** em visitas repetidas
- Cache de até **500 imagens** de anime
- Cache de até **100 requisições** da API
- Recursos (JS, CSS) são pré-carregados

### 🔄 Atualizações Automáticas
- Service Worker detecta novas versões
- Atualização automática em segundo plano
- Usuário sempre tem a versão mais recente

## Como Instalar (Para Usuários)

### Android (Chrome/Edge)
1. Acesse https://matheus-c-martins.github.io/anime-calendar/
2. Toque nos **três pontos** (⋮) no canto superior direito
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme a instalação
5. O ícone aparecerá na tela inicial! 🎉

### iOS (Safari)
1. Acesse https://matheus-c-martins.github.io/anime-calendar/
2. Toque no botão **Compartilhar** (□↑)
3. Role para baixo e toque em **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"**
5. O ícone aparecerá na tela inicial! 🎉

### Desktop (Chrome/Edge)
1. Acesse https://matheus-c-martins.github.io/anime-calendar/
2. Clique no **ícone de instalação** (⊕) na barra de endereços
3. Ou: Menu → **"Instalar Anime Calendar"**
4. Confirme a instalação
5. Abrirá como aplicativo de desktop! 🎉

## Arquitetura Técnica

### Arquivos Criados

```
public/
├── icon.svg              # Ícone da aplicação (SVG escalável)
├── manifest.json         # Configuração do PWA (antigo)
└── sw.js                 # Service Worker customizado (antigo)

vite.config.js            # Configuração do vite-plugin-pwa

src/components/
├── InstallPrompt.jsx     # Componente de notificação de instalação
└── InstallPrompt.css     # Estilos do prompt
```

### Plugin: vite-plugin-pwa
- Gera automaticamente o Service Worker otimizado
- Cria o manifest.webmanifest
- Pré-cache de todos os recursos estáticos
- Workbox para estratégias de cache avançadas

### Estratégias de Cache

#### Network First (API Jikan)
```javascript
{
  urlPattern: /^https:\/\/api\.jikan\.moe\/.*/i,
  handler: 'NetworkFirst',
  options: {
    cacheName: 'jikan-api-cache',
    expiration: {
      maxEntries: 100,
      maxAgeSeconds: 60 * 60 * 24 // 24 horas
    }
  }
}
```
- Sempre tenta buscar dados frescos da rede
- Se falhar, usa cache
- Cache expira em 24 horas

#### Cache First (Imagens MAL)
```javascript
{
  urlPattern: /^https:\/\/cdn\.myanimelist\.net\/.*/i,
  handler: 'CacheFirst',
  options: {
    cacheName: 'mal-images-cache',
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
    }
  }
}
```
- Usa cache primeiro (carregamento instantâneo)
- Atualiza cache em segundo plano
- Cache dura 30 dias

## Benefícios para o Usuário

✅ **Acesso Rápido**: Ícone na tela inicial  
✅ **Offline**: Funciona sem internet  
✅ **Leve**: Não precisa baixar da loja  
✅ **Atualização Automática**: Sempre atualizado  
✅ **Multiplataforma**: Android, iOS, Desktop  
✅ **Economia de Dados**: Cache inteligente  
✅ **Performance**: Carregamento instantâneo  

## Monitoramento

### DevTools - Application Tab
Abra o DevTools (F12) → **Application**:

- **Manifest**: Ver configurações do PWA
- **Service Workers**: Status de instalação/ativação
- **Cache Storage**: Ver dados em cache
- **Storage**: localStorage com favoritos/preferências

### Console Logs
```
✅ Service Worker registrado com sucesso
🔄 Nova versão disponível! Atualizando...
```

## Próximos Passos (Opcionais)

- [ ] Push notifications para novos episódios
- [ ] Background sync para atualizar favoritos
- [ ] Share API para compartilhar animes
- [ ] Screenshots no manifest para loja do navegador

## Build & Deploy

O PWA está configurado para deploy automático via GitHub Actions:

```bash
npm run build    # Gera PWA completo em dist/
git push         # Deploy automático via GitHub Actions
```

Arquivos gerados no build:
- `dist/sw.js` - Service Worker otimizado
- `dist/manifest.webmanifest` - Configuração do PWA
- `dist/workbox-*.js` - Biblioteca de cache
- `dist/registerSW.js` - Script de registro

---

**🎉 Parabéns! Seu Anime Calendar agora é um PWA completo!**
