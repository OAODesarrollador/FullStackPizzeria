import { Router, Request, Response, NextFunction } from 'express';
import { obtenerTareas, crearTarea, actualizarTarea } from '../controladores/tareaControlador.js';
import { autenticarUsuario, CustomRequest } from '../middlewares/authMiddlewares.js';

const router = Router();


const wrapAsync = (fn: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req as CustomRequest, res, next).catch(next);
  };
};

// Ruta para obtener todas las tareas o las del repartidor autenticado
router.get('/', autenticarUsuario, wrapAsync(obtenerTareas));

// Ruta para crear una nueva tarea (acceso de supervisor)
router.post('/', autenticarUsuario, wrapAsync(crearTarea));

// Ruta para actualizar una tarea (cambiar estado)
router.put('/:id', autenticarUsuario, wrapAsync(actualizarTarea));

export default router;
