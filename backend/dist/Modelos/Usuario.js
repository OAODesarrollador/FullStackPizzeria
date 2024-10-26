import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const crearUsuario = async (nombre, email, password, rol) => {
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
export const obtenerUsuarioPorEmail = async (email) => {
    return await prisma.usuario.findUnique({
        where: { email },
    });
};
export const obtenerUsuarios = async () => {
    return await prisma.usuario.findMany();
};
