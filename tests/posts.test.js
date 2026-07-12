"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/database/db");
describe("API de postagens", () => {
    beforeAll(async () => {
        await db_1.pool.query(`
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
        await db_1.pool.query("DELETE FROM posts");
        await db_1.pool.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
    });
    afterAll(async () => {
        await db_1.pool.end();
    });
    it("deve criar uma nova postagem", async () => {
        const resposta = await (0, supertest_1.default)(app_1.default)
            .post("/posts")
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
        const resposta = await (0, supertest_1.default)(app_1.default)
            .post("/posts")
            .send({
            titulo: "Post incompleto"
        });
        expect(resposta.status).toBe(400);
        expect(resposta.body).toEqual({
            mensagem: "Título, conteúdo e autor são obrigatórios."
        });
    });
    it("deve listar as postagens cadastradas", async () => {
        await db_1.pool.query(`
        INSERT INTO posts (titulo, conteudo, autor)
        VALUES ($1, $2, $3)
      `, [
            "Post para listagem",
            "Conteúdo do post",
            "Professor FIAP"
        ]);
        const resposta = await (0, supertest_1.default)(app_1.default).get("/posts");
        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
        expect(resposta.body).toHaveLength(1);
        expect(resposta.body[0].titulo).toBe("Post para listagem");
    });
    it("deve buscar uma postagem pelo ID", async () => {
        const resultado = await db_1.pool.query(`
        INSERT INTO posts (titulo, conteudo, autor)
        VALUES ($1, $2, $3)
        RETURNING id
      `, [
            "Post por ID",
            "Conteúdo para teste",
            "Professora Ana"
        ]);
        const id = resultado.rows[0].id;
        const resposta = await (0, supertest_1.default)(app_1.default).get(`/posts/${id}`);
        expect(resposta.status).toBe(200);
        expect(resposta.body.id).toBe(id);
        expect(resposta.body.titulo).toBe("Post por ID");
    });
    it("deve retornar 404 ao buscar um ID inexistente", async () => {
        const resposta = await (0, supertest_1.default)(app_1.default).get("/posts/999");
        expect(resposta.status).toBe(404);
        expect(resposta.body).toEqual({
            mensagem: "Postagem não encontrada."
        });
    });
});
