import { pool } from "../database/db";

export async function listarPostsNoBanco() {
  const resultado = await pool.query(`
    SELECT
      id,
      titulo,
      conteudo,
      autor,
      criado_em AS "criadoEm",
      atualizado_em AS "atualizadoEm"
    FROM posts
    ORDER BY id ASC
  `);

  return resultado.rows;
}

export async function criarPostNoBanco(
  titulo: string,
  conteudo: string,
  autor: string
) {
  const resultado = await pool.query(
    `
      INSERT INTO posts (titulo, conteudo, autor)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        titulo,
        conteudo,
        autor,
        criado_em AS "criadoEm",
        atualizado_em AS "atualizadoEm"
    `,
    [titulo, conteudo, autor]
  );

  return resultado.rows[0];
}

export async function buscarPostPorIdNoBanco(id: number) {

    const resultado = await pool.query(
        `
        SELECT
            id,
            titulo,
            conteudo,
            autor,
            criado_em AS "criadoEm",
            atualizado_em AS "atualizadoEm"
        FROM posts
        WHERE id = $1
        `,
        [id]
    );

    return resultado.rows[0];
}

export async function atualizarPostNoBanco(
  id: number,
  titulo: string,
  conteudo: string,
  autor: string
) {
  const resultado = await pool.query(
    `
      UPDATE posts
      SET
        titulo = $1,
        conteudo = $2,
        autor = $3,
        atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING
        id,
        titulo,
        conteudo,
        autor,
        criado_em AS "criadoEm",
        atualizado_em AS "atualizadoEm"
    `,
    [titulo, conteudo, autor, id]
  );

  return resultado.rows[0];
}

export async function excluirPostNoBanco(id: number) {
  const resultado = await pool.query(
    `
      DELETE FROM posts
      WHERE id = $1
      RETURNING
        id,
        titulo,
        conteudo,
        autor,
        criado_em AS "criadoEm",
        atualizado_em AS "atualizadoEm"
    `,
    [id]
  );

  return resultado.rows[0];
}

export async function buscarPostsNoBanco(termo: string) {
  const resultado = await pool.query(
    `
      SELECT
        id,
        titulo,
        conteudo,
        autor,
        criado_em AS "criadoEm",
        atualizado_em AS "atualizadoEm"
      FROM posts
      WHERE
        titulo ILIKE $1
        OR conteudo ILIKE $1
      ORDER BY id ASC
    `,
    [`%${termo}%`]
  );

  return resultado.rows;
}