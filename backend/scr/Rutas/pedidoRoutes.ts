import { Router } from 'express';
import { obtenerPedidos, crearPedido, asignarRepartidor } from '../controladores/pedidoControlador';
import { autenticarUsuario } from '../middlewares/authMiddlewares';

const router = Router();

router.post('/crearPedido',  crearPedido as any); // Opción alternativa
router.get('/verPedidos', autenticarUsuario, obtenerPedidos as any);
router.put('/asignarRepartidor', autenticarUsuario, asignarRepartidor);

export default router;
