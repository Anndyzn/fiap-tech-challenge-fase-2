import request from "supertest";
import app from "../src/app";
import { pool } from "../src/database/db";

const tokenValido = "Bearer fiap123";

describe("API de postagens", () => {
  beforeAll(async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        conteudo TEXT NOT NULL,
        autor VARCHAR(150) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  beforeEach(async () => {
    await pool.query("DELETE FROM posts");
    await pool.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("deve retornar 401 quando o token não for informado", async () => {
    const resposta = await request(app).get("/posts");

    expect(resposta.status).toBe(401);
    expect(resposta.body).toEqual({
      mensagem: "Token não informado."
    });
  });

  it("deve retornar 401 quando o token for inválido", async () => {
    const resposta = await request(app)
      .get("/posts")
      .set("Authorization", "Bearer token-invalido");

    expect(resposta.status).toBe(401);
    expect(resposta.body).toEqual({
      mensagem: "Token inválido."
    });
  });

  it("deve criar uma nova postagem", async () => {
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", tokenValido)
      .send({
        titulo: "Teste de criação",
        conteudo: "Conteúdo do teste automatizado.",
        autor: "Andy"
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty("id");
    expect(resposta.body.titulo).toBe("Teste de criação");
    expect(resposta.body.autor).toBe("Andy");
  });

  it("não deve criar postagem sem os campos obrigatórios", async () => {
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", tokenValido)
      .send({
        titulo: "Post incompleto"
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({
      mensagem: "Título, conteúdo e autor são obrigatórios."
    });
  });

  it("deve listar as postagens cadastradas", async () => {
    await pool.query(
      `
        INSERT INTO posts (titulo, conteudo, autor)
        VALUES ($1, $2, $3)
      `,
      [
        "Post para listagem",
        "Conteúdo do post",
        "Professor FIAP"
      ]
    );

    const resposta = await request(app)
      .get("/posts")
      .set("Authorization", tokenValido);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body).toHaveLength(1);
    expect(resposta.body[0].titulo).toBe("Post para listagem");
  });

  it("deve buscar uma postagem pelo ID", async () => {
    const resultado = await pool.query(
      `
        INSERT INTO posts (titulo, conteudo, autor)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [
        "Post por ID",
        "Conteúdo para teste",
        "Professora Ana"
      ]
    );

    const id = resultado.rows[0].id;

    const resposta = await request(app)
      .get(`/posts/${id}`)
      .set("Authorization", tokenValido);

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(id);
    expect(resposta.body.titulo).toBe("Post por ID");
  });

  it("deve retornar 404 ao buscar um ID inexistente", async () => {
    const resposta = await request(app)
      .get("/posts/999")
      .set("Authorization", tokenValido);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({
      mensagem: "Postagem não encontrada."
    });
  });
});