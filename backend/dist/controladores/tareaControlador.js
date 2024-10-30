import { crearTarea as crearTareaModel, obtenerTareasPorRepartidor, obtenerTodasLasTareas, actualizarEstadoTarea } from '../Modelos/Tarea.js';
export const obtenerTareas = async (req, res, next) => {
    try {
        if (!req.usuario) {
            res.status(403).json({ mensaje: 'Acceso no autorizado' });
            return;
        }
        const { rol, id } = req.usuario;
        const tareas = rol === 'SUPERVISOR' ? await obtenerTodasLasTareas() : await obtenerTareasPorRepartidor(id);
        res.status(200).json(tareas);
    }
    catch (error) {
        next(error);
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
