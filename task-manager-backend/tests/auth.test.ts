import request from "supertest";
import express from "express";
import authRouter from "../src/routes/auth"; // Rota de autenticação
import prisma from "../src/prisma/client";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

beforeEach(async () => {
  await prisma.user.deleteMany(); // Limpa os usuários antes de cada teste
});

describe("Auth Routes", () => {
  it("should register a user and return a token", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    console.log(response.body); // Adicione isso para depuração

    expect(response.status).toBe(201); // Espera o status 201
    expect(response.body).toHaveProperty("token"); // Espera a propriedade token
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com" }); // Sem senha

    expect(response.status).toBe(400); // Espera o status 400
    expect(response.body).toHaveProperty("error"); // Espera a propriedade error
  });
});
