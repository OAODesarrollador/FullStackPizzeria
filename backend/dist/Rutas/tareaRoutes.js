import { Router } from 'express';
import { obtenerTareas, crearTarea, actualizarTarea } from '../controladores/tareaControlador.js';
import { autenticarUsuario } from '../middlewares/authMiddlewares.js';
const router = Router();
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
// Ruta para obtener todas las tareas o las del repartidor autenticado
router.get('/', autenticarUsuario, wrapAsync(obtenerTareas));
// Ruta para crear una nueva tarea (acceso de supervisor)
router.post('/', autenticarUsuario, wrapAsync(crearTarea));
// Ruta para actualizar una tarea (cambiar estado)
router.put('/:id', autenticarUsuario, wrapAsync(actualizarTarea));
export default router;
