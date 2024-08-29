"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        const user = await client_1.default.user.create({
            data: { email, password: hashedPassword },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Email já registrado' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await client_1.default.user.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado' });
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ error: 'Senha incorreta' });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
});
exports.default = router;
