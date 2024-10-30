import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador';


const router = Router();

router.post('/crearPedido', crearPedido as any); // Opción alternativa
router.get('/verPedidos', obtenerPedidos as any);

export default router;
