import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_super_secreto';
// Registro de usuario
export const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    console.log("Pasa por registrar usuario", nombre, email, password, rol);
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                rol,
            },
        });
        res.json(nuevoUsuario);
    }
    catch (error) {
        res.status(400).json({ error: 'No se pudo registrar el usuario' });
    }
};
// Login de usuario
export const loginUsuario = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario });
    }
    catch (error) {
        res.status(400).json({ error: 'Error en el login' });
    }
};
