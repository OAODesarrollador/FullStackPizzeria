import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mi_super_secreto';

// Registro de usuario
export const registrarUsuario = async (req: Request, res: Response) => {
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
    console.log('Nuevo usuario registrado:', {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
    });
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el usuario' });
  }
};

// Login de usuario
export const loginUsuario = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    res.status(400).json({ error: 'Error en el login' });
  }
};
export const obtenerRepartidores = async (req: Request, res: Response) => {
  try {
    const repartidores = await prisma.usuario.findMany({
      where: { rol: 'REPARTIDOR' },
      select: { id: true, nombre: true },
    });
    res.json(repartidores);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo obtener la lista de repartidores' });
  }
};
