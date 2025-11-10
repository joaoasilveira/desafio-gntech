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
  Parâmetro obrigatório: `city` (query string)
  Exemplo: `/weather?city=Florianopolis`

* **GET /weather/all**
  Retorna todos os registros salvos no banco, do mais recente ao mais antigo.
  Suporta paginação via query string: `?page=1&limit=10`

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
├─ migrations/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ .env-example
├─ .dockerignore
└─ README.md
```

---

## Observações

* Todas as credenciais sensíveis devem ficar no `.env` e **não** no Git.
* O arquivo `.env-example` já contém os valores padrões que você pode usar.
* A aplicação está pronta para rodar tanto localmente quanto em ambiente containerizado.
