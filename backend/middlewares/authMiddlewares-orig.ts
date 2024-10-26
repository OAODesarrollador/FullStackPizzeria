import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  usuario?: {
    id: number;
    rol: string;
  };
}
export const autenticarUsuario = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.usuario = decoded as any; // Asignamos el usuario decodificado a req.usuario
    next(); // Si todo va bien, llamamos a next para pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};
