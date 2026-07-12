import { Router } from "express";
import {
  listarPosts,
  criarPost,
  buscarPostPorId,
  atualizarPost,
  excluirPost,
  buscarPosts
} from "../controllers/post.controller";

const postRoutes = Router();

postRoutes.get("/", listarPosts);
postRoutes.get("/search", buscarPosts);
postRoutes.get("/:id", buscarPostPorId);
postRoutes.post("/", criarPost);
postRoutes.put("/:id", atualizarPost);
postRoutes.delete("/:id", excluirPost);

export default postRoutes;