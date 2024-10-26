import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Crear un pedido
export const crearPedido = async (req, res) => {
    const { descripcion, total, direccionEnvio } = req.body;
    if (!req.usuario || !req.usuario.id) {
        return res.status(400).json({ error: 'Usuario no autenticado' });
    }
    const { id: usuarioId } = req.usuario;
    try {
        const nuevoPedido = await prisma.pedido.create({
            data: {
                descripcion,
                total,
                direccionEnvio,
                estado: 'NUEVO',
                usuarioId,
            },
        });
        res.status(201).json({ pedido: nuevoPedido });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido o la tarea' });
    }
};
// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany();
        res.json(pedidos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};
