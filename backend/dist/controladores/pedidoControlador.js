import { crearPedido as crearPedidoModel, obtenerPedidosPorUsuario, obtenerTodosLosPedidos } from '../Modelos/Pedido.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const obtenerPedidos = async (req, res, next) => {
    try {
        const { rol, id } = req.usuario;
        let tareas;
        if (rol === 'REPARTIDOR') {
            tareas = await obtenerPedidosPorUsuario(id);
        }
        else if (rol === 'SUPERVISOR') {
            tareas = await obtenerTodosLosPedidos();
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
        const { descripcion, total, direccionEnvio, usuarioId } = req.body;
        const nuevoPedido = await crearPedidoModel(descripcion, total, direccionEnvio, usuarioId);
        res.status(201).json(nuevoPedido);
    }
    catch (error) {
        next(error);
    }
};
export const asignarRepartidor = async (req, res, next) => {
    try {
        const { idPedido, usuarioId } = req.body; // UsuarioId para el repartidor
        const pedidoActualizado = await prisma.pedido.update({
            where: { id: idPedido },
            data: { usuarioId },
        });
        res.status(200).json(pedidoActualizado);
    }
    catch (error) {
        next(error);
    }
};
export const obtenerPedidosAsignados = async (req, res, next) => {
    const idRepartidor = parseInt(req.params.idRepartidor);
    try {
        const pedidos = await prisma.pedido.findMany({
            where: { usuarioId: idRepartidor },
        });
        res.json(pedidos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos asignados' });
    }
};
export const actualizarEstadoPedido = async (req, res) => {
    const idPedido = parseInt(req.params.id);
    const { estado } = req.body;
    try {
        const pedidoActualizado = await prisma.pedido.update({
            where: { id: idPedido },
            data: { estado },
        });
        res.json(pedidoActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
};
