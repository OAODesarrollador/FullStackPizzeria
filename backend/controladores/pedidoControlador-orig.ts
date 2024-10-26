import { Response, NextFunction } from 'express';
import { crearTarea as crearTareaModel, obtenerTareasPorRepartidor, obtenerTodasLasTareas, actualizarEstadoTarea } from '../Modelos/Tarea';
import { CustomRequest } from '../middlewares/authMiddlewares';

// Controlador para obtener tareas
export const obtenerTareas = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { rol, id } = req.usuario!; // Usuario autenticado ya debe estar en req.usuario gracias al middleware
    let tareas;

    if (rol === 'REPARTIDOR') {
      tareas = await obtenerTareasPorRepartidor(id);
    } else if (rol === 'SUPERVISOR') {
      tareas = await obtenerTodasLasTareas();
    } else {
      return res.status(403).json({ mensaje: 'No tienes permiso para ver estas tareas.' });
    }

    res.status(200).json(tareas);
  } catch (error) {
    next(error);
  }
};

// Controlador para crear tarea
export const crearTarea = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { descripcion, repartidorId } = req.body;
    const nuevaTarea = await crearTareaModel(descripcion, repartidorId);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar estado de tarea
export const actualizarTarea = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const tareaActualizada = await actualizarEstadoTarea(parseInt(id), estado);
    res.status(200).json(tareaActualizada);
  } catch (error) {
    next(error);
  }
};