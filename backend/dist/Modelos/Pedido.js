import { PrismaClient, Estado } from '@prisma/client';
const prisma = new PrismaClient();
export const crearPedido = async (descripcion, total, direccionEnvio, usuarioId) => {
    const nuevoPedido = await prisma.pedido.create({
        data: {
            descripcion, // Cambiado a 'descripcion'
            total: total,
            direccionEnvio: direccionEnvio,
            usuarioId: usuarioId,
            estado: Estado.NUEVO,
        },
    });
    return nuevoPedido;
};
export const obtenerPedidosPorUsuario = async (usuarioId) => {
    return await prisma.pedido.findMany({
        where: { usuarioId },
    });
};
export const obtenerTodosLosPedidos = async () => {
    return await prisma.pedido.findMany();
};
