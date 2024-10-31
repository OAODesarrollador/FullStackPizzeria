import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  usuario?: {
    id: number;
    rol?: string; // <-- ahora `rol` es opcional
  };
}

export const autenticarUsuario = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token recibido:', token); // Verificar si el token está presente

  if (!token) {
    res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_super_secreto') as { id: number; rol: string };
    console.log('Token decodificado:', decoded); // Verificar el contenido decodificado del token
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};
