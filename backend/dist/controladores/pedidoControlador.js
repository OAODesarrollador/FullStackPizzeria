import { crearTarea as crearPedidoModel, obtenerTareasPorRepartidor, obtenerTodasLasTareas } from '../Modelos/Tarea';
export const obtenerPedidos = async (req, res, next) => {
    try {
        const { rol, id } = req.usuario;
        let tareas;
        if (rol === 'REPARTIDOR') {
            tareas = await obtenerTareasPorRepartidor(id);
        }
        else if (rol === 'SUPERVISOR') {
            tareas = await obtenerTodasLasTareas();
        }
        else {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver estas tareas.' });
        }
        res.status(200).json(tareas);
    }
    catch (error) {
        next(error);
    }
};
export const crearPedido = async (req, res, next) => {
    try {
        const { descripcion, repartidorId } = req.body;
        const nuevoPedido = await crearPedidoModel(descripcion, repartidorId);
        res.status(201).json(nuevoPedido);
    }
    catch (error) {
        next(error);
    }
};
