import { Router } from 'express';
import { obtenerPedidos, crearPedido, asignarRepartidor, obtenerPedidosAsignados, actualizarEstadoPedido } from '../controladores/pedidoControlador';
import { autenticarUsuario } from '../middlewares/authMiddlewares';

const router = Router();

router.post('/crearPedido',  crearPedido as any); 
router.get('/verPedidos', autenticarUsuario, obtenerPedidos as any);
router.put('/asignarRepartidor', autenticarUsuario, asignarRepartidor);
router.get('/asignados/:idRepartidor', autenticarUsuario, obtenerPedidosAsignados);
router.put('/:id', autenticarUsuario, actualizarEstadoPedido);

export default router;
