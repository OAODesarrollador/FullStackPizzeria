import { Router } from 'express';
import { autenticarUsuario } from '../middlewares/authMiddlewares'; // Middleware de autenticación
import { PrismaClient } from '@prisma/client'; // Prisma para manejar la base de datos
const router = Router();
const prisma = new PrismaClient();
// Ruta para crear un nuevo pedido
router.post('/', autenticarUsuario, async (req, res) => {
    try {
        const { descripcion, total, direccionEnvio } = req.body;
        // Validar que se hayan enviado todos los datos necesarios
        if (!descripcion || !total || !direccionEnvio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Verificar que req.usuario esté definido
        if (!req.usuario) {
            res.status(401).json({ message: 'Usuario no autenticado.' });
            return;
        }
        const usuarioId = req.usuario.id;
        // Crear el nuevo pedido en la base de datos
        const nuevoPedido = await prisma.pedido.create({
            data: {
                descripcion,
                total,
                direccionEnvio,
                usuarioId,
                estado: 'NUEVO',
            },
        });
        res.status(201).json(nuevoPedido);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
});
// Ruta para obtener todos los pedidos
router.get('/', autenticarUsuario, async (req, res) => {
    try {
        // Verificar que req.usuario esté definido
        if (!req.usuario) {
            res.status(401).json({ message: 'Usuario no autenticado.' });
            return;
        }
        const pedidos = await prisma.pedido.findMany({
            where: {
                usuarioId: req.usuario.id, // Solo obtener pedidos del usuario autenticado
            },
        });
        res.status(200).json(pedidos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
});
export default router;
