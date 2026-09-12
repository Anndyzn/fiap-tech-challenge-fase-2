import express from "express";
import cors from "cors";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API do Tech Challenge FIAP funcionando!"
  });
});

app.use("/posts", postRoutes);

export default app;