
# Cadastro de Pets API

API REST e GraphQL para cadastro de usuários e pets, com autenticação JWT e documentação Swagger.

## Estrutura do Projeto

```
├── src
│   ├── model
│   │   ├── userModel.js
│   │   └── petModel.js
│   └── service
│       ├── userService.js
│       └── petService.js
├── rest
│   ├── controller
│   │   ├── userController.js
│   │   └── petController.js
│   ├── app.js
│   ├── server.js
│   └── swagger.js
├── graphql
│   ├── resolvers
│   │   ├── userResolver.js
│   │   └── petResolver.js
│   ├── schema.js
│   ├── app.js
│   └── server.js
└── README.md
```

## Instalação

1. Clone o repositório ou copie os arquivos para seu computador.
2. Instale as dependências:
   ```powershell
   npm install express@4 apollo-server-express@3 jsonwebtoken bcryptjs swagger-ui-express
   ```

## Como rodar

### API REST

- Para iniciar a API REST:
  ```powershell
  node rest/server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API GraphQL

- Para iniciar a API GraphQL:
  ```powershell
  node graphql/server.js
  ```
- Acesse o playground GraphQL em: [http://localhost:4000/graphql](http://localhost:4000/graphql)


## Endpoints REST principais

- `POST /register` — Cadastro de usuário
- `POST /login` — Login (retorna JWT)
- `GET /users` — Consulta de usuários (JWT obrigatório)
- `POST /pets` — Cadastro de pet (JWT obrigatório)
- `GET /pets` — Consulta de pets (JWT obrigatório)
- `GET /mypets` — Consulta de pets do usuário logado (JWT obrigatório)
- `DELETE /pets/:id` — Exclusão de pet do usuário logado (JWT obrigatório)


## Queries e Mutations GraphQL principais

- `register(username, password): User` — Cadastro de usuário
- `login(username, password): String` — Login (retorna JWT)
- `users: [User]` — Consulta de usuários (JWT obrigatório)
- `addPet(name, type): Pet` — Cadastro de pet (JWT obrigatório)
- `deletePet(id: ID!): Boolean` — Exclusão de pet do usuário logado (JWT obrigatório)
- `pets: [Pet]` — Consulta de pets (JWT obrigatório)
- `myPets: [Pet]` — Consulta de pets do usuário logado (JWT obrigatório)

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Não é permitido cadastrar pets com o mesmo nome para o mesmo usuário.
- Endpoints protegidos exigem autenticação via Bearer Token (JWT).

## Configurações para os Testes
- Crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST E BASE_URL_GRAPHQL, com a URL base desses serviços.

## Banco de dados
- Os dados são armazenados em memória, em variáveis.

## Swagger
- O Swagger está disponível em `/api-docs` e suporta autenticação JWT nos endpoints protegidos.
