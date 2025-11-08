# Desafio Técnico GNTech

API Node.js para consulta e armazenamento de dados climáticos utilizando OpenWeather e PostgreSQL. Containerizada com Docker.

---

## Tecnologias Utilizadas

* Node.js / Express
* PostgreSQL
* Docker / Docker Compose
* Axios
* dotenv

---

## Configuração Local

1. Clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
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

---

## Endpoints Disponíveis

* **GET /health**
  Retorna status do servidor.

* **GET /weather**
  Consulta dados do clima via API OpenWeather e salva no banco.
  Parâmetro opcional: `city`
  Exemplo: `/weather?city=Florianopolis`

* **GET /weather/all**
  Retorna todos os registros salvos no banco, do mais recente ao mais antigo.

---

## Estrutura do Projeto

```
desafio-gntech/
├─ src/
│  ├─ config/db.js
│  ├─ routes/weatherRoutes.js
│  ├─ services/openWeatherService.js
│  └─ index.js
├─ migrations/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ .env-example
└─ README.md
```

---

## Observações

* Todas as credenciais sensíveis devem ficar no `.env` e **não** no Git.
* A aplicação está pronta para rodar tanto localmente quanto em ambiente containerizado.