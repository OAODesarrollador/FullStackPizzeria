import { Response, NextFunction } from 'express';
import { crearPedido as crearPedidoModel, obtenerPedidosPorUsuario, obtenerTodosLosPedidos} from '../Modelos/Pedido';
import { CustomRequest } from '../middlewares/authMiddlewares';

export const obtenerPedidos = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { rol, id } = req.usuario!;
    let tareas;

    if (rol === 'REPARTIDOR') {
      tareas = await obtenerPedidosPorUsuario(id);
    } else if (rol === 'SUPERVISOR') {
      tareas = await obtenerTodosLosPedidos();
    } else {
      return res.status(403).json({ mensaje: 'No tienes permiso para ver estas tareas.' });
    }

    res.status(200).json(tareas);
  } catch (error) {
    next(error);
  }
};

export const crearPedido = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { descripcion, total, direccionEnvio, usuarioId } = req.body;
    const nuevoPedido = await crearPedidoModel(descripcion, total, direccionEnvio, usuarioId);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    
    next(error);
  }
};
