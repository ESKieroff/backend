yarn install
yarn add reflect-metadata


#### **Modo de Produção:**
- Para construir e rodar o Docker no modo de produção (com apenas as dependências de produção), use:

  ```bash
  docker build --build-arg NODE_ENV=production -t meu-app-prod .
  docker run -p 3000:3000 meu-app-prod
  ```

#### **Modo de Desenvolvimento:**
- Para construir e rodar o Docker no modo de desenvolvimento (com todas as dependências e com o servidor reiniciando automaticamente ao detectar mudanças), use:

  ```bash
  docker build --build-arg NODE_ENV=development -t meu-app-dev .
  docker run -p 3000:3000 meu-app-dev npm run start:dev
  ```

