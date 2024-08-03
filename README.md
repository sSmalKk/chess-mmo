Aqui está o `README.md` para o seu projeto, incluindo os changelogs conforme solicitado:

```markdown
# Chess MMO

## Descrição

Este projeto é um aplicativo de xadrez MMO com funcionalidades para criar, entrar e gerenciar jogos de xadrez. Inclui funcionalidades de administração para criar peças personalizadas.

## Requisitos

- Node.js
- MongoDB

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/chessmmo.git
   cd chessmmo
   ```

2. Instale as dependências:
   ```bash
   npm install
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env` para o backend:
   ```env
   MONGO_URI=mongodb://localhost:27017/chessmmo
   JWT_SECRET=your_secret_key
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Inicie o servidor backend:
   ```bash
   cd backend
   npm start
   ```

5. Inicie o servidor frontend:
   ```bash
   cd frontend
   npm start
   ```

## Uso

Após configurar e iniciar os servidores, acesse o aplicativo através do navegador em `http://localhost:3000`.

## Changelog

### v0.1.0
- Configuração inicial do projeto com backend e frontend.
- Criação de modelos para usuários, papéis e rotas no backend.
- Implementação de rotas básicas de autenticação e autorização.

### v0.2.0
- Adicionadas funcionalidades de administração para criar peças de xadrez.
- Implementação das páginas do menu principal no frontend:
  - Iniciar Jogo
  - Entrar em Jogo
  - Criar Peças (somente para administradores)

### v0.3.0
- Melhoria na funcionalidade de iniciar jogo com tamanho configurável.
- Adicionada funcionalidade para entrar em jogos existentes usando ID do jogo.
- Ajustes na verificação do tipo de usuário para exibir opções administrativas.

### v0.4.0
- Adicionada animação para ocultar/mostrar o cabeçalho com transição suave.
- Implementação de funcionalidades para salvar movimentos das peças.
- Correção de bugs e melhorias na integração com a API.

## Estrutura do Projeto

```plaintext
chessmmo/
├── backend/
│   ├── model/
│   ├── routes/
│   ├── middleware/
│   ├── constants/
│   ├── utils/
│   ├── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   └── package.json
└── README.md
```

## Contribuição

Se você deseja contribuir com o projeto, por favor siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```

Esse `README.md` contém todas as informações necessárias para configurar, utilizar e contribuir para o projeto, além dos changelogs detalhados das alterações feitas até agora.