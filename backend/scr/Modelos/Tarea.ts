import { Estado, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const crearTarea = async (descripcion: string, repartidorId: number) => {
  const nuevaTarea = await prisma.tarea.create({
    data: {
      descripcion,
      estado: 'NUEVO',
      repartidorId,
    },
  });
  return nuevaTarea;
};

export const obtenerTareasPorRepartidor = async (repartidorId: number) => {
  return await prisma.tarea.findMany({
    where: { repartidorId },
  });
};

export const obtenerTodasLasTareas = async () => {
  return await prisma.tarea.findMany();
};

export const actualizarEstadoTarea = async (tareaId: number, estado: string) => {
  console.log("PAsa por actualizar estado", estado);
  return await prisma.tarea.update({
    where: { id: tareaId },
    data:   {
      estado: "NUEVO",
    },
  });
};
