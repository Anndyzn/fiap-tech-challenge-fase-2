import { Request, Response } from "express";

export function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Email e senha são obrigatórios."
    });
  }

  if (
    email !== "professor@fiap.com" ||
    senha !== "123456"
  ) {
    return res.status(401).json({
      mensagem: "Email ou senha inválidos."
    });
  }

  return res.status(200).json({
    mensagem: "Login realizado com sucesso.",
    token: "fiap123",
    usuario: {
      nome: "Professor FIAP",
      email: "professor@fiap.com"
    }
  });
}