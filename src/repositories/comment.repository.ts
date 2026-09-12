import { pool } from "../database/db";

export async function listarComentariosNoBanco(postId: number) {
  const resultado = await pool.query(
    `
      SELECT
        id,
        post_id AS "postId",
        autor,
        conteudo,
        criado_em AS "criadoEm"
      FROM comentarios
      WHERE post_id = $1
      ORDER BY criado_em DESC
    `,
    [postId]
  );

  return resultado.rows;
}

export async function criarComentarioNoBanco(
  postId: number,
  autor: string,
  conteudo: string
) {
  const resultado = await pool.query(
    `
      INSERT INTO comentarios (
        post_id,
        autor,
        conteudo
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        post_id AS "postId",
        autor,
        conteudo,
        criado_em AS "criadoEm"
    `,
    [postId, autor, conteudo]
  );

  return resultado.rows[0];
}

export async function excluirComentarioNoBanco(
  id: number
) {
  const resultado = await pool.query(
    `
      DELETE FROM comentarios
      WHERE id = $1
      RETURNING *
    `,
    [id]
  );

  return resultado.rows[0];
}