import { Router } from "express";

import {
  listarPosts,
  criarPost,
  buscarPostPorId,
  atualizarPost,
  excluirPost,
  buscarPosts
} from "../controllers/post.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const postRoutes = Router();

// ROTAS PÚBLICAS
postRoutes.get("/", listarPosts);
postRoutes.get("/search", buscarPosts);
postRoutes.get("/:id", buscarPostPorId);

// ROTAS PROTEGIDAS
postRoutes.post("/", authMiddleware, criarPost);
postRoutes.put("/:id", authMiddleware, atualizarPost);
postRoutes.delete("/:id", authMiddleware, excluirPost);

export default postRoutes;