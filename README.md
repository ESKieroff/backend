### Estrutura de diretórios
#/backend
#├── src/
#│   ├── config/
#│   │   └── configuration.ts      # Arquivo para gerenciar configurações e variáveis de ambiente
#│   ├── core/
#│   │   ├── domain/
#│   │   │   ├── entities/         # Entidades do domínio
#│   │   │   └── interfaces/       # Interfaces para os repositórios do domínio
#│   │   └── application/
#│   │       ├── services/         # Serviços que contêm lógica de negócios
#│   │       └── dto/              # Data Transfer Objects
#│   ├── infrastructure/
#│   │   ├── db/
#│   │   │   ├── prisma/           # Configurações e migrações do Prisma
#│   │   │   └── repository/       # Implementações dos repositórios
#│   │   ├── web/
#│   │   │   ├── controllers/      # Controladores que lidam com requisições HTTP
#│   │   │   └── middleware/       # Middlewares específicos da aplicação
#│   │   └── auth/
#│   │       └── strategies/       # Estratégias de autenticação (ex: JWT)
#│   ├── shared/
#│   │   ├── filters/              # Filtros globais (ex: para captura de exceções)
#│   │   └── utilities/            # Utilidades gerais
#│   └── app.module.ts             # Módulo raiz que organiza e importa outros módulos
#├── test/
#│   ├── unit/                     # Testes unitários
#│   └── integration/              # Testes de integração
#├── .env                          # Variáveis de ambiente
#├── nest-cli.json                 # Configurações do CLI do Nest
#├── package.json
#├── tsconfig.json                 # Configurações do TypeScript
#└── README.md

### Node Express template project

This project is based on a GitLab [Project Template](https://docs.gitlab.com/ee/gitlab-basics/create-project.html).

Improvements can be proposed in the [original project](https://gitlab.com/gitlab-org/project-templates/express).

### CI/CD with Auto DevOps

This template is compatible with [Auto DevOps](https://docs.gitlab.com/ee/topics/autodevops/).

If Auto DevOps is not already enabled for this project, you can [turn it on](https://docs.gitlab.com/ee/topics/autodevops/#enabling-auto-devops) in the project settings.

### Developing with Gitpod

This template has a fully-automated dev setup for [Gitpod](https://docs.gitlab.com/ee/integration/gitpod.html).

If you open this project in Gitpod, you'll get all Node dependencies pre-installed and Express will open a web preview.
