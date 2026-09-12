import { Router } from "express";

import {
  listarPosts,
  criarPost,
  buscarPostPorId,
  atualizarPost,
  excluirPost,
  buscarPosts
} from "../controllers/post.controller";

import {
  listarComentariosDoPost,
  adicionarComentario,
  excluirComentario
} from "../controllers/comment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const postRoutes = Router();

// ROTAS PÚBLICAS
postRoutes.get("/", listarPosts);

postRoutes.get("/search", buscarPosts);

postRoutes.get(
  "/:id/comentarios",
  listarComentariosDoPost
);

postRoutes.post(
  "/:id/comentarios",
  adicionarComentario
);

postRoutes.get("/:id", buscarPostPorId);

postRoutes.delete(
  "/:id/comentarios/:comentarioId",
  authMiddleware,
  excluirComentario
);

// ROTAS PROTEGIDAS
postRoutes.post(
  "/",
  authMiddleware,
  criarPost
);

postRoutes.put(
  "/:id",
  authMiddleware,
  atualizarPost
);

postRoutes.delete(
  "/:id",
  authMiddleware,
  excluirPost
);

export default postRoutes;