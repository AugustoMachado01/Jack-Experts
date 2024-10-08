import express, { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Define a secret key for JWT
const JWT_SECRET = "secreta";

// Endpoint para cadastro de usuário
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Email de usuário já Existente tenta outro email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({ token });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Gera um token JWT
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
});

export default router;
