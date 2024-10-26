import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador';


const router = Router();

router.post('/pedido', crearPedido as any); // Opción alternativa
router.get('/pedido', obtenerPedidos as any);

export default router;
