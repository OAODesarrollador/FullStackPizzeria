import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador.js';
const router = Router();
router.post('/crearPedido', crearPedido); // Opción alternativa
router.get('/verPedidos', obtenerPedidos);
export default router;
