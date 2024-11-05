import { Router } from 'express';
import { obtenerPedidos, crearPedido, asignarRepartidor, obtenerPedidosAsignados, actualizarEstadoPedido } from '../controladores/pedidoControlador';
import { autenticarUsuario } from '../middlewares/authMiddlewares';

const router = Router();

router.post('/crearPedido',  crearPedido as any); // Opción alternativa
router.get('/verPedidos', autenticarUsuario, obtenerPedidos as any);
router.put('/asignarRepartidor', autenticarUsuario, asignarRepartidor);
// Ejemplo de ruta para pedidos asignados en pedidoRoutes.ts
router.get('/asignados/:idRepartidor', autenticarUsuario, obtenerPedidosAsignados);
router.put('/:id', autenticarUsuario, actualizarEstadoPedido);

export default router;
