"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Token ausente' });
    jsonwebtoken_1.default.verify(token, 'secreta', (err, user) => {
        if (err)
            return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};
router.get('/', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const tasks = await client_1.default.task.findMany({
        where: { userId: req.user.id },
    });
    res.json(tasks);
});
router.post('/', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const { title, description } = req.body;
    const task = await client_1.default.task.create({
        data: {
            title,
            description,
            userId: req.user.id,
        },
    });
    res.status(201).json(task);
});
router.put('/:id', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const { title, description, completed } = req.body;
    const task = await client_1.default.task.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (task && task.userId === req.user.id) {
        const updatedTask = await client_1.default.task.update({
            where: { id: task.id },
            data: {
                title: title || task.title,
                description: description || task.description,
                completed: completed !== undefined ? completed : task.completed,
            },
        });
        res.json(updatedTask);
    }
    else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});
router.delete('/:id', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const task = await client_1.default.task.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (task && task.userId === req.user.id) {
        await client_1.default.task.delete({ where: { id: task.id } });
        res.json({ message: 'Tarefa excluída' });
    }
    else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});
exports.default = router;
