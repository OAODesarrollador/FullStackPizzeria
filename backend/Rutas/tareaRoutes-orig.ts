import { Router } from 'express';
import { obtenerTareas, crearTarea, actualizarTarea } from '../controladores/tareaControlador-orig';
import { autenticarUsuario } from '../middlewares/authMiddlewares';

const router = Router();

// Ruta para obtener todas las tareas o las del repartidor autenticado
router.get('/', autenticarUsuario, obtenerTareas);

// Ruta para crear una nueva tarea (acceso de supervisor)
router.post('/', autenticarUsuario, crearTarea);

// Ruta para actualizar una tarea (cambiar estado)
router.put('/:id', autenticarUsuario, actualizarTarea);

export default router;
