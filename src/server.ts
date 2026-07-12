import app from "./app";
import { pool } from "./database/db";

const PORT = process.env.PORT || 4000;

async function iniciarServidor() {
  try {
    const resultado = await pool.query("SELECT NOW()");

    console.log(
      "PostgreSQL conectado:",
      resultado.rows[0].now
    );

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao conectar com o PostgreSQL:", erro);
    process.exit(1);
  }
}

iniciarServidor();