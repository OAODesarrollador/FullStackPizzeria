import { PrismaClient, Estado } from '@prisma/client';
const prisma = new PrismaClient();

export const crearPedido = async (descripcion: string, total: number, direccionEnvio: string, usuarioId: number) => {
  console.log("Pasa por crear pedido - Backend - Pedido");
  console.log("descripcion:", descripcion);
  console.log("total:", total);
  console.log("direccionEnvio:", direccionEnvio);
  console.log("usuarioId:", usuarioId);
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
