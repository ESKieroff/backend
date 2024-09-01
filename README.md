# Installation and Setup Instructions

# Opção de utilização com Docker

### Utilização da imagem disponiblizada no Docker Hub

1. Logar no DockerHub:

`docker login`

2. Pull da Imagem Docker:
Fazer o pull da imagem Docker do DockerHub usando:

`docker pull norohim/cp-planta-backend:latest`

3. Executar a Imagem Docker:
Executando a imagem Docker, mapeando as portas necessárias:

`docker run -d -p 3000:3000 --name cp-planta-backend norohim/cp-planta-backend:latest`

Este comando iniciará a aplicação em localhost:3000.

4. Utilizando Volumes do Docker (opcional)

Se for necessário persistir os dados gerados pelo contêiner, como logs ou arquivos de banco de dados, você pode usar `volumes` do Docker. No entanto, eles não farão parte da própria image; eles são armazenados na máquina local.

`docker run -d -p 3000:3000 -v app-data-back:/app/data --name cp-planta-backend norohim/cp-planta-backend:latest`

Este comando cria e monta um volume chamado app-data-back no diretório /app/data dentro do contêiner.

### Construção padrão Local Sem Dockerhub

1. Construir a Imagem Docker

Execute o comando abaixo para construir a imagem Docker. Substitua nome-da-imagem pelo nome desejado para sua imagem.

`docker build -t <nome-da-imagem> .`

2. Rodar o Contêiner Docker

Depois de construir a imagem, você pode rodar o contêiner com o comando abaixo. Substitua o nome-do-container e nome-da-imagem pelos nomes apropriados.

`docker run -d --name nome-do-container -v $(pwd):/app -w /app -p 3000:3000 nome-da-imagem`

Explicação dos parâmetros:

`-d: Executa o contêiner em segundo plano (modo "detached").`

`--name: Nomeia o contêiner.`

`-v $(pwd):/app: Monta o diretório atual $(pwd) no diretório /app dentro do contêiner.`

`-w /app: Define o diretório de trabalho dentro do contêiner como /app.`

`-p 3000:3000: Mapeia a porta 3000 do contêiner para a porta 3000 do host (ajuste conforme necessário).`


Alguns destes paramêtros já estão configurados no arquivo Dockerfile, mas você pode ajustá-los conforme necessário e deixá-los expliícitos no comando de execução docker run.

3. Conectar ao Contêiner Docker Usando VS Code

Clique no ícone verde no canto inferior esquerdo do VS Code (ou use o atalho Ctrl+Shift+P para abrir o Command Palette).
Selecione Dev Containers: Attach to Running Container....
Escolha o contêiner que você acabou de rodar (nome-do-container).

4. Versão simplificada para acesso via terminal ao ambiente do container:

`docker build -t cp-planta-backend .`

`docker run -it -p 3000:3000 cp-planta-backend`

### Opção de utilização sem Docker

1. Instalar NVM (Node Version Manager)

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`

`source ~/.bashrc `

ou source ~/.zshrc para usuários de zsh

2. Instalar Node.js e npm com NVM

`nvm install 18`
`nvm use 18`
`nvm install --lts`

3. Instalar TypeScript

`npm install -g typescript`

4. Instalar NestJS CLI

`npm install -g @nestjs/cli`

5. Comandos para Verificação de versões

`node -v`  # Verificar versão do Node.js

`npm -v`   # Verificar versão do npm

`tsc -v`   # Verificar versão do TypeScript

`nest -v` # Verificar versão do NestJS

### Build e Run na Mão

1. Instale as dependencias do projeto

`npm install`

2. Compile o projeto com npm run build.

`npm run build`

3. Iniciar o Projeto:

`npm run start`

# Estrutura de diretórios
```
/backend
├── src/
│ ├── config/
│ │ └── configuration.ts # Arquivo para gerenciar configurações e variáveis de ambiente
│ ├── core/
│ │ ├── domain/
│ │ │ ├── entities/ # Entidades do domínio
│ │ │ └── interfaces/ # Interfaces para os repositórios do domínio
│ │ └── application/
│ │ ├── services/ # Serviços que contêm lógica de negócios
│ │ └── dto/ # Data Transfer Objects
│ ├── infrastructure/
│ │ ├── db/
│ │ │ ├── prisma/ # Configurações e migrações do Prisma
│ │ │ └── repository/ # Implementações dos repositórios
│ │ ├── web/
│ │ │ ├── controllers/ # Controladores que lidam com requisições HTTP
│ │ │ └── middleware/ # Middlewares específicos da aplicação
│ │ └── auth/
│ │ └── strategies/ # Estratégias de autenticação (ex: JWT)
│ ├── shared/
│ │ ├── filters/ # Filtros globais (ex: para captura de exceções)
│ │ └── utilities/ # Utilidades gerais
│ └── app.module.ts # Módulo raiz que organiza e importa outros módulos
├── test/
│ ├── unit/ # Testes unitários
│ └── integration/ # Testes de integração
├── .env # Variáveis de ambiente
├── nest-cli.json # Configurações do CLI do Nest
├── package.json
├── tsconfig.json # Configurações do TypeScript
└── README.md
```
## update configuration:

Backend
├── src
│   ├── config/       # Configurações
│   ├── controllers/  # Controladores que lidam com requisições HTTP
│   ├── dto/          # Data Transfer Objects
│   ├── entities/     # Entidades do domínio
│   ├── interfaces/   # Interfaces de tipos e contratos
│   ├── middleware/   # Tratamento de erros e middleware
│   ├── models/       # Modelos de dados e estruturas de dados
│   ├── repositories/ # Implementações de repositórios e acesso a dados
│   ├── routes/       # Definição das rotas e endpoints
│   ├── services/     # Serviços que contêm a lógica de negócios
│   └── utils/        # Utilidades gerais e funções auxiliares
└── index.ts          # Arquivo principal do aplicativo
