import { Router } from 'express';
import { obtenerPedidos, crearPedido, asignarRepartidor, obtenerPedidosAsignados, actualizarEstadoPedido } from '../controladores/pedidoControlador.js';
import { autenticarUsuario } from '../middlewares/authMiddlewares.js';

const router = Router();

router.post('/crearPedido',  crearPedido as any); 
router.get('/verPedidos', autenticarUsuario, obtenerPedidos as any);
router.put('/asignarRepartidor', autenticarUsuario, asignarRepartidor);
router.get('/asignados/:idRepartidor', autenticarUsuario, obtenerPedidosAsignados);
router.put('/:id', autenticarUsuario, actualizarEstadoPedido);

export default router;
