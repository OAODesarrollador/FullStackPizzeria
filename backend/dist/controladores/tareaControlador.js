import { crearTarea as crearTareaModel, obtenerTareasPorRepartidor, obtenerTodasLasTareas, actualizarEstadoTarea } from '../Modelos/Tarea.js';
// Controlador para obtener tareas
export const obtenerTareas = async (req, res, next) => {
    try {
        const { rol, id } = req.usuario; // Usuario autenticado ya debe estar en req.usuario gracias al middleware
        let tareas;
        if (rol === 'SUPERVISOR') {
            tareas = await obtenerTareasPorRepartidor(id);
        }
        else {
            tareas = await obtenerTodasLasTareas();
        }
        res.status(200).json(tareas);
    }
    catch (error) {
        next(error); // Pasa cualquier error al siguiente middleware
    }
};
// Controlador para crear tarea
export const crearTarea = async (req, res, next) => {
    try {
        const { descripcion, repartidorId } = req.body;
        const nuevaTarea = await crearTareaModel(descripcion, repartidorId);
        res.status(201).json(nuevaTarea);
    }
    catch (error) {
        next(error);
    }
};
// Controlador para actualizar estado de tarea
export const actualizarTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const tareaActualizada = await actualizarEstadoTarea(parseInt(id), estado);
        res.status(200).json(tareaActualizada);
    }
    catch (error) {
        next(error);
    }
};
