import express, { Response, NextFunction } from "express";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";

import { CustomRequest } from "../types/custom-request";

const router = express.Router();

interface JwtPayload {
  id: number;
}

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token ausente" });

  jwt.verify(token, "secreta", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    req.user = user as JwtPayload;
    next();
  });
};

router.get(
  "/",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  }
);

router.post(
  "/",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  }
);

router.put(
  "/:id",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title and userId are required" });
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (task && task.userId === req.user.id) {
      const updatedTask = await prisma.task.update({
        where: { id: task.id },
        data: {
          title: title || task.title,
          description: description || task.description,
          completed: completed !== undefined ? completed : task.completed,
        },
      });
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: "Tarefa não encontrada" });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (task && task.userId === req.user.id) {
      await prisma.task.delete({ where: { id: task.id } });
      res.json({ message: "Tarefa excluída" });
    } else {
      res.status(404).json({ error: "Tarefa não encontrada" });
    }
  }
);

export default router;
