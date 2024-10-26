import { PrismaClient, Estado } from '@prisma/client';
const prisma = new PrismaClient();

export const crearPedido = async (descripcion: string, total: number, direccionEnvio: string, usuarioId: number) => {
  const nuevoPedido = await prisma.pedido.create({
    data: {
      descripcion,  // Cambiado a 'descripcion'
      total,
      direccionEnvio,
      usuarioId,
      estado: Estado.NUEVO,
    },
  });
  return nuevoPedido;
};

export const obtenerPedidosPorUsuario = async (usuarioId: number) => {
  return await prisma.pedido.findMany({
    where: { usuarioId },
  });
};

export const obtenerTodosLosPedidos = async () => {
  return await prisma.pedido.findMany();
};
