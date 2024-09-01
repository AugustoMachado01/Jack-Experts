import request from "supertest";
import express from "express";
import taskRouter from "../src/routes/tasks"; // Rota de tarefas
import authRouter from "../src/routes/auth"; // Rota de autenticação
import prisma from "../src/prisma/client";

const app = express();
app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

let token: string;

beforeEach(async () => {
  await prisma.task.deleteMany(); // Limpa as tarefas antes de cada teste
  await prisma.user.deleteMany(); // Limpa os usuários antes de cada teste

  // Obtenha um token válido
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "test@example.com", password: "password123" });
  token = response.body.token;

  console.log("Obtained token:", token);
});

describe("Tasks Routes", () => {
  it("should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "New Task", userId: 1 });

    console.log(response.body); // Adicione isso para depuração

    expect(response.status).toBe(201); // Espera o status 201
    expect(response.body).toHaveProperty("id"); // Espera a propriedade id
  });

  it("should get all tasks", async () => {
    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Another Task", userId: 1 });

    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`); // Adiciona o token JWT

    console.log(response.body); // Adicione isso para depuração

    expect(response.status).toBe(200); // Espera o status 200
    expect(response.body).toHaveLength(1); // Espera que haja 1 tarefa
  });
});
