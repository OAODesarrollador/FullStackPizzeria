import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador';
import { autenticarUsuario } from '../middlewares/authMiddlewares';

const router = Router();

router.post('/crearPedido',  crearPedido as any); // Opción alternativa
router.get('/verPedidos', autenticarUsuario, obtenerPedidos as any);

export default router;
