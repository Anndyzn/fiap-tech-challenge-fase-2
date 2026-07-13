import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      mensagem: "Token não informado."
    });
  }

  const token = authorization.replace("Bearer ", "");

  if (token !== "fiap123") {
    return res.status(401).json({
      mensagem: "Token inválido."
    });
  }

  next();
}