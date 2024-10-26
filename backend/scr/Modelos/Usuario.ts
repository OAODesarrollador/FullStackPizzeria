import { PrismaClient, Rol } from '@prisma/client';
const prisma = new PrismaClient();

export const crearUsuario = async (nombre: string, email: string, password: string, rol: Rol) => {
  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password,
      rol,
    },
  });
  return nuevoUsuario;
};

export const obtenerUsuarioPorEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
  });
};

export const obtenerUsuarios = async () => {
  return await prisma.usuario.findMany();
};
