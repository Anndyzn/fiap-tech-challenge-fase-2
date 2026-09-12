import { Request, Response } from "express";

import {
  listarComentariosNoBanco,
  criarComentarioNoBanco,
  excluirComentarioNoBanco
} from "../repositories/comment.repository";

export async function listarComentariosDoPost(
  req: Request,
  res: Response
) {
  try {
    const postId = Number(req.params.id);

    const comentarios =
      await listarComentariosNoBanco(postId);

    return res.status(200).json(comentarios);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao buscar comentários."
    });
  }
}

export async function adicionarComentario(
  req: Request,
  res: Response
) {
  try {
    const postId = Number(req.params.id);
    const { autor, conteudo } = req.body;

    if (!autor || !conteudo) {
      return res.status(400).json({
        mensagem: "Autor e comentário são obrigatórios."
      });
    }

    const comentario = await criarComentarioNoBanco(
      postId,
      autor,
      conteudo
    );

    return res.status(201).json(comentario);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao criar comentário."
    });
  }
}

export async function excluirComentario(
  req: Request,
  res: Response
) {
  try {
    const comentarioId = Number(
      req.params.comentarioId
    );

    const comentario =
      await excluirComentarioNoBanco(
        comentarioId
      );

    if (!comentario) {
      return res.status(404).json({
        mensagem: "Comentário não encontrado."
      });
    }

    return res.status(200).json({
      mensagem: "Comentário excluído com sucesso."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao excluir comentário."
    });
  }
}