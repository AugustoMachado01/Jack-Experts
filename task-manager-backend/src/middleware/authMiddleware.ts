import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/custom-request";

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

export default authenticateToken;
