import express from "express";
import cors from "cors";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API do Tech Challenge FIAP funcionando!"
  });
});

app.use("/posts", postRoutes);

export default app;