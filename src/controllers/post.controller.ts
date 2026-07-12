import { Request, Response } from "express";
import {
    listarPostsNoBanco,
    criarPostNoBanco,
    buscarPostPorIdNoBanco,
    atualizarPostNoBanco,
    excluirPostNoBanco,
    buscarPostsNoBanco
} from "../repositories/post.repository";

export async function listarPosts(req: Request, res: Response) {
  try {
    const postsDoBanco = await listarPostsNoBanco();

    return res.status(200).json(postsDoBanco);
  } catch (erro) {
    console.error("Erro ao listar postagens:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao listar postagens."
    });
  }
}

export async function criarPost(req: Request, res: Response) {
  const { titulo, conteudo, autor } = req.body;

  if (!titulo || !conteudo || !autor) {
    return res.status(400).json({
      mensagem: "Título, conteúdo e autor são obrigatórios."
    });
  }

  try {
    const novoPost = await criarPostNoBanco(
      titulo,
      conteudo,
      autor
    );

    return res.status(201).json(novoPost);
  } catch (erro) {
    console.error("Erro ao criar postagem:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao criar postagem."
    });
  }
}

export async function buscarPostPorId(
    req: Request,
    res: Response
) {

    const id = Number(req.params.id);

    try {

        const post = await buscarPostPorIdNoBanco(id);

        if (!post) {
            return res.status(404).json({
                mensagem: "Postagem não encontrada."
            });
        }

        return res.status(200).json(post);

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro interno."
        });

    }

}

export async function atualizarPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { titulo, conteudo, autor } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      mensagem: "O ID informado é inválido."
    });
  }

  if (!titulo || !conteudo || !autor) {
    return res.status(400).json({
      mensagem: "Título, conteúdo e autor são obrigatórios."
    });
  }

  try {
    const postAtualizado = await atualizarPostNoBanco(
      id,
      titulo,
      conteudo,
      autor
    );

    if (!postAtualizado) {
      return res.status(404).json({
        mensagem: "Postagem não encontrada."
      });
    }

    return res.status(200).json(postAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar postagem:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar postagem."
    });
  }
}

export async function excluirPost(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      mensagem: "O ID informado é inválido."
    });
  }

  try {

    const post = await excluirPostNoBanco(id);

    if (!post) {
      return res.status(404).json({
        mensagem: "Postagem não encontrada."
      });
    }

    return res.status(200).json({
      mensagem: "Postagem excluída com sucesso.",
      post
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      mensagem: "Erro interno."
    });

  }

}

export async function buscarPosts(req: Request, res: Response) {
  const termo = String(req.query.termo || "").trim();

  if (!termo) {
    return res.status(400).json({
      mensagem: "Informe um termo para realizar a busca."
    });
  }

  try {
    const postsEncontrados = await buscarPostsNoBanco(termo);

    return res.status(200).json(postsEncontrados);
  } catch (erro) {
    console.error("Erro ao buscar postagens:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao buscar postagens."
    });
  }
}