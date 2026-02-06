# Guia de Contribuição

Obrigado pelo interesse em contribuir para o Anime Calendar! 🎉

## 🚀 Como Contribuir

### Reportar Bugs

Se encontrou um bug, por favor crie uma issue com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Informações do ambiente (browser, OS)

### Sugerir Features

Sugestões são sempre bem-vindas! Abra uma issue com:

- Descrição detalhada da feature
- Casos de uso
- Possível implementação (opcional)
- Mockups ou exemplos (se aplicável)

### Pull Requests

1. **Fork o repositório**
2. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```

3. **Faça suas alterações** seguindo os padrões do projeto

4. **Commit suas mudanças**
   ```bash
   git commit -m "feat: Adiciona nova feature incrível"
   ```
   
   Utilize conventional commits:
   - `feat:` Nova funcionalidade
   - `fix:` Correção de bug
   - `docs:` Documentação
   - `style:` Formatação, CSS
   - `refactor:` Refatoração de código
   - `test:` Adição de testes
   - `chore:` Tarefas gerais

5. **Push para sua branch**
   ```bash
   git push origin feature/MinhaNovaFeature
   ```

6. **Abra um Pull Request**

## 📝 Padrões de Código

### JavaScript/React

- Use functional components com hooks
- Nomes de componentes em PascalCase
- Nomes de arquivos matching do componente
- Props destructuring no início do componente
- Use `const` para funções arrow

```javascript
function MeuComponente({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  
  const handleAction = () => {
    // lógica
  };
  
  return (
    <div>...</div>
  );
}
```

### CSS

- Um arquivo CSS por componente
- Classes em kebab-case
- Use variáveis CSS para temas
- Mobile-first (media queries para desktop)

```css
.meu-componente {
  background: var(--card-bg);
  padding: 20px;
}

@media (min-width: 768px) {
  .meu-componente {
    padding: 30px;
  }
}
```

### Estrutura de Arquivos

```
src/
├── components/
│   ├── MeuComponente.jsx
│   └── MeuComponente.css
├── contexts/
│   └── MeuContext.jsx
└── services/
    └── meuService.js
```

## 🧪 Testes

Antes de submeter PR:

1. Teste localmente com `npm run dev`
2. Faça build com `npm run build`
3. Verifique se não há erros no console
4. Teste responsividade (mobile/tablet/desktop)
5. Teste em dark/light mode
6. Teste em PT e EN

## 📦 Commits

### Mensagens de Commit

Siga o padrão Conventional Commits:

```
<tipo>: <descrição curta>

<descrição detalhada (opcional)>

<footer (opcional)>
```

Exemplos:
```
feat: Adiciona filtro por gênero de anime
fix: Corrige bug no modal de detalhes
docs: Atualiza README com novas features
style: Melhora espaçamento dos cards
refactor: Reorganiza lógica de filtros
```

## 🎯 Áreas para Contribuir

### Fácil (Good First Issue)
- Melhorias de CSS/UI
- Correções de typos
- Adição de traduções
- Documentação

### Médio
- Novos filtros ou ordenações
- Melhorias de performance
- Novos componentes
- Testes unitários

### Avançado
- Integração com outras APIs
- Sistema de notificações
- Sincronização entre dispositivos
- Melhorias de PWA

## 💬 Comunicação

- Issues: Para bugs e features
- Pull Requests: Para código
- Discussions: Para ideias e questões gerais

## 📖 Recursos Úteis

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Jikan API Docs](https://docs.api.jikan.moe/)
- [PWA Docs](https://web.dev/progressive-web-apps/)

## ✅ Checklist para PR

- [ ] Código segue os padrões do projeto
- [ ] Funciona localmente sem erros
- [ ] Responsivo em diferentes tamanhos de tela
- [ ] Funciona em dark/light mode
- [ ] Funciona em PT e EN
- [ ] Commit messages seguem conventional commits
- [ ] Documentação atualizada (se necessário)

## 🙏 Agradecimentos

Toda contribuição é valiosa, seja um pequeno fix ou uma grande feature. Obrigado por ajudar a melhorar o Anime Calendar!
