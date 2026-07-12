# 🚀 Tech Challenge FIAP - Fase 2

## API de Gerenciamento de Postagens

> Projeto desenvolvido para o Tech Challenge da FIAP, com foco na construção de uma API REST utilizando Node.js, Express, TypeScript e PostgreSQL.

Este projeto foi desenvolvido como parte do **Tech Challenge da FIAP**.

O objetivo foi criar uma API REST para gerenciamento de postagens de um blog utilizando **Node.js**, **Express**, **TypeScript** e **PostgreSQL**, aplicando boas práticas de desenvolvimento como containerização com Docker, testes automatizados e integração contínua com GitHub Actions.

---

# 📑 Índice

- 📌 Objetivo do Projeto
- 🛠️ Tecnologias Utilizadas
- 📁 Estrutura do Projeto
- 🏗️ Arquitetura da Aplicação
- ⚙️ Como Executar o Projeto
- 🗄️ Banco de Dados
- 📡 Endpoints da API
- 🧪 Testes Automatizados
- 🐳 Docker
- ⚙️ GitHub Actions
- 📈 Resultado dos Testes
- ⚠️ Dificuldades Encontradas
- 🎯 Conclusão
- 👨‍💻 Autor

---

# 📌 Objetivo do Projeto

Desenvolver uma API capaz de realizar operações de criação, consulta, atualização, exclusão e pesquisa de postagens.

Além das funcionalidades da API, o projeto também teve como objetivo colocar em prática conceitos estudados durante as aulas, como:

- Desenvolvimento de APIs REST;
- Integração com banco de dados PostgreSQL;
- Containerização utilizando Docker;
- Testes automatizados com Jest;
- Integração Contínua utilizando GitHub Actions.

---

# 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Docker Compose
- Jest
- Supertest
- GitHub Actions

---

# 📁 Estrutura do Projeto

```text
src
│
├── controllers
├── database
├── repositories
├── routes
├── app.ts
└── server.ts
```

Cada pasta possui uma responsabilidade específica para manter o projeto organizado e facilitar futuras manutenções.

---

# 🏗️ Arquitetura da Aplicação

Para organizar melhor o projeto, a aplicação foi dividida em camadas. Cada uma possui uma responsabilidade específica.

```text
Cliente (Thunder Client / Postman)
                │
                ▼
            Express
                │
                ▼
          Controllers
                │
                ▼
         Repositories
                │
                ▼
          PostgreSQL
```

### Controllers

São responsáveis por receber as requisições da API, validar os dados enviados pelo usuário e retornar as respostas.

### Repositories

São responsáveis pela comunicação com o banco de dados, executando consultas SQL para buscar, inserir, atualizar e remover informações.

### Database

Contém a configuração da conexão com o PostgreSQL.

### Routes

Define todas as rotas disponíveis na API.

---

# ⚙️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/Andydzn/fiap-tech-challenge-fase-2.git
```

Depois acesse a pasta do projeto.

```bash
cd fiap-tech-challenge-fase-2
```

---

## 2. Instalar as dependências

```bash
npm install
```

---

## 3. Configurar o arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as seguintes informações:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_fiap
```

---

## 4. Executar utilizando Docker

Para iniciar a aplicação juntamente com o PostgreSQL execute:

```bash
docker compose up --build
```

Após a inicialização, a aplicação estará disponível em:

```
http://localhost:4000
```

---

## 5. Executar sem Docker

Caso prefira executar localmente:

```bash
npm install
npm run dev
```

---

# 🗄️ Banco de Dados

O projeto utiliza o PostgreSQL como banco de dados.

A tabela utilizada é:

| Campo | Tipo |
|--------|------|
| id | SERIAL |
| titulo | VARCHAR |
| conteudo | TEXT |
| autor | VARCHAR |
| criado_em | TIMESTAMP |
| atualizado_em | TIMESTAMP |

Os dados permanecem salvos mesmo após reiniciar os containers graças ao volume configurado no Docker Compose.

---

# 📡 Endpoints da API

A API possui seis endpoints principais para gerenciamento das postagens.

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/posts` | Lista todas as postagens |
| GET | `/posts/:id` | Busca uma postagem pelo ID |
| POST | `/posts` | Cria uma nova postagem |
| PUT | `/posts/:id` | Atualiza uma postagem existente |
| DELETE | `/posts/:id` | Remove uma postagem |
| GET | `/posts/search?termo=` | Pesquisa postagens pelo título ou conteúdo |

---

## GET /posts

Retorna todas as postagens cadastradas.

### Exemplo de resposta

```json
[
  {
    "id": 1,
    "titulo": "Node.js e Express",
    "conteudo": "Conteúdo da postagem.",
    "autor": "Professor Gustavo",
    "criadoEm": "2026-07-12T10:00:00.000Z",
    "atualizadoEm": "2026-07-12T10:00:00.000Z"
  }
]
```

---

## GET /posts/:id

Retorna uma postagem específica pelo ID.

### Exemplo

```http
GET /posts/1
```

### Resposta

```json
{
  "id": 1,
  "titulo": "Node.js e Express",
  "conteudo": "Conteúdo da postagem.",
  "autor": "Professor Gustavo"
}
```

Caso o ID não exista:

```json
{
  "mensagem": "Postagem não encontrada."
}
```

---

## POST /posts

Cria uma nova postagem.

### Exemplo de requisição

```json
{
  "titulo": "Aprendendo Docker",
  "conteudo": "Conteúdo da postagem.",
  "autor": "Andy"
}
```

### Resposta

```json
{
  "id": 3,
  "titulo": "Aprendendo Docker",
  "conteudo": "Conteúdo da postagem.",
  "autor": "Andy"
}
```

---

## PUT /posts/:id

Atualiza uma postagem existente.

### Exemplo

```http
PUT /posts/3
```

### Corpo da requisição

```json
{
  "titulo": "Docker Atualizado",
  "conteudo": "Novo conteúdo.",
  "autor": "Andy"
}
```

---

## DELETE /posts/:id

Remove uma postagem pelo ID.

### Exemplo

```http
DELETE /posts/3
```

### Resposta

```json
{
  "mensagem": "Postagem excluída com sucesso."
}
```

---

## GET /posts/search

Realiza uma pesquisa por título ou conteúdo.

### Exemplo

```http
GET /posts/search?termo=node
```

### Resposta

```json
[
  {
    "id": 1,
    "titulo": "Node.js e Express",
    "conteudo": "Conteúdo da postagem.",
    "autor": "Professor Gustavo"
  }
]
```

---

# 🧪 Testes Automatizados

Durante o desenvolvimento foram criados testes automatizados utilizando **Jest** e **Supertest** para validar o funcionamento da API.

Os testes verificam:

- Criação de uma nova postagem;
- Validação dos campos obrigatórios;
- Listagem das postagens;
- Busca por ID;
- Retorno de erro para postagens inexistentes.

## Executando os testes

```bash
npm test
```

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

Foi alcançada uma cobertura superior aos **20%** exigidos pelo Tech Challenge.

---

# 🐳 Docker

O projeto foi containerizado utilizando **Docker** e **Docker Compose**.

Foram criados dois containers:

- API Node.js
- Banco de Dados PostgreSQL

Para iniciar toda a aplicação:

```bash
docker compose up --build
```

Após a inicialização:

Aplicação:

```
http://localhost:4000
```

Banco PostgreSQL:

```
localhost:5432
```

O Docker Compose também cria um volume para manter os dados persistidos.

---

# ⚙️ GitHub Actions

Foi configurada uma pipeline de Integração Contínua (CI) utilizando GitHub Actions.

Sempre que um novo código é enviado ao GitHub são executadas automaticamente as seguintes etapas:

- Download do projeto;
- Instalação das dependências;
- Compilação do TypeScript;
- Execução dos testes automatizados;
- Verificação da cobertura de testes.

---

# 📈 Resultado dos Testes

| Métrica | Resultado |
|----------|----------:|
| Statements | 57,54% |
| Branches | 29,16% |
| Functions | 46,66% |
| Lines | 57,54% |

Esses resultados atendem ao requisito mínimo de cobertura solicitado pelo Tech Challenge.

---

# ⚠️ Dificuldades Encontradas

Durante o desenvolvimento do projeto alguns desafios surgiram e foram importantes para o aprendizado.

Os principais foram:

- Configurar corretamente a conexão entre a API e o PostgreSQL;
- Entender a comunicação entre os containers utilizando Docker;
- Organizar o projeto em camadas;
- Configurar testes automatizados;
- Configurar o GitHub Actions.

Apesar das dificuldades iniciais, todas foram superadas durante o desenvolvimento do projeto.

---

# 🎯 Conclusão

Este Tech Challenge permitiu colocar em prática diversos conceitos estudados durante a disciplina, integrando diferentes tecnologias em um único projeto.

Durante o desenvolvimento foi possível aprender mais sobre APIs REST, banco de dados PostgreSQL, Docker, testes automatizados, GitHub Actions e organização de projetos backend.

O projeto também contribuiu para reforçar boas práticas de desenvolvimento, versionamento de código e documentação, servindo como uma base importante para projetos futuros.

---

# 👨‍💻 Autor

**Andy Minoru Higa Arias**

Turma: **Pós Tech - 9FSDT**

Aluno de **Full Stack Development - FIAP**

🔗 Repositório:
https://github.com/Andydzn/fiap-tech-challenge-fase-2

**2026**
