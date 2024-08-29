import express from 'express';
import cors from 'cors'; // Importa o middleware CORS
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import authenticateToken from './middleware/authMiddleware';

const app = express();
const PORT = 3000;

// Configura o CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3001', // Permite requisições do frontend na porta 3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tarefas (precisa de autenticação)
app.use('/tasks', authenticateToken, taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
