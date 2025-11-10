# Desafio Técnico GNTech

API Node.js para consulta e armazenamento de dados climáticos utilizando OpenWeather e PostgreSQL. Containerizada com Docker.

---

## Tecnologias Utilizadas

* Node.js / Express
* PostgreSQL
* Docker / Docker Compose
* Axios
* dotenv
* Zod
* Jest e Supertest
* Insomnia

---

## Configuração Local

1. Clone o repositório:

```bash
git clone https://github.com/joaoasilveira/desafio-gntech
cd desafio-gntech
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` baseado no `.env-example`:

```bash
cp .env-example .env
```

> Preencha a chave da API do OpenWeather em `OPENWEATHER_API_KEY`.

4. Rode as migrations para criar a tabela:

```bash
npm run migrate
```

5. Inicie o servidor localmente:

```bash
npm run dev
```

O servidor vai rodar em: `http://localhost:3000`

---

## Rodando com Docker

1. Suba os containers:

```bash
docker-compose up --build
```

2. A API estará disponível em:

```
http://localhost:3000
```

> O container do Postgres persiste os dados usando o volume `db-data`.

> Configurações do banco e porta podem ser sobrescritas via `.env`.
> Exemplo de defaults no Docker Compose:
>
> ```text
> POSTGRES_USER=postgres
> POSTGRES_PASSWORD=postgres
> POSTGRES_DB=weatherdb
> DATABASE_URL=postgresql://postgres:postgres@db:5432/weatherdb
> PORT=3000
> ```

---

## Endpoints Disponíveis

* **GET /health**
  Retorna status do servidor.

* **POST /weather**
  Consulta dados do clima via API OpenWeather e salva no banco.
  Parâmetro obrigatório (query string): `city`
  Exemplo: `/weather?city=Florianopolis`

* **GET /weather/all**
  Retorna todos os registros salvos no banco, do mais recente ao mais antigo.
  Suporta paginação via query string: `?page=1&limit=10`
  Exemplo: `/weather/all?page=1&limit=10`

---

## Testes

Testes automatizados com **Jest** e **Supertest** cobrem os seguintes cenários:

* `GET /health` → verifica se o servidor está funcionando
* `POST /weather` sem cidade → retorna 400
* `POST /weather` com cidade inválida → retorna 404
* `POST /weather` com cidade válida → retorna 201 e salva dados
* `GET /weather/all` → retorna dados paginados

Para rodar os testes:

```bash
npm run test
```

---

## Documentação Insomnia

A coleção de requisições para testar a API está disponível em:

```
docs/insomnia-weatherAPI
```

Importe no Insomnia para testar todas as rotas da API.

---

## Estrutura do Projeto

```
desafio-gntech/
├─ src/
│  ├─ config/db.js
│  ├─ config/config.js
│  ├─ routes/weatherRoutes.js
│  ├─ services/weatherService.js
│  ├─ repositories/weatherRepository.js
│  ├─ utils/logger.js
│  └─ index.js
├─ docs/
│  └─ insomnia-weatherAPI
├─ migrations/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ .env-example
├─ .dockerignore
└─ README.md
```

## Observações

* Todas as credenciais sensíveis devem permanecer no `.env` e **não** devem ser commitadas.
* O arquivo `.env-example` já contém os valores padrões que você pode usar.
* A aplicação está pronta para rodar tanto localmente quanto em ambiente containerizado.
