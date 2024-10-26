// src/routes/pedidoRoutes.ts
import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador';
const router = Router();
router.post('/pedido', crearPedido); // Opción alternativa
router.get('/pedido', obtenerPedidos);
export default router;
