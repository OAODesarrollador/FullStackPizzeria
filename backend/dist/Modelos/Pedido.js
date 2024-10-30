import { PrismaClient, Estado } from '@prisma/client';
const prisma = new PrismaClient();
export const crearPedido = async (descripcion, total, direccionEnvio, usuarioId) => {
    console.log("-- Pasa por crear pedido --- Pedido");
    console.log(direccionEnvio);
    console.log(total);
    console.log(descripcion);
    console.log(usuarioId);
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
    console.log("-- Pasa por obtener todos los pedidos --- Pedido");
    return await prisma.pedido.findMany();
};
