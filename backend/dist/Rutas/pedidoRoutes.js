// src/routes/pedidoRoutes.ts
import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador.js';
const router = Router();
router.post('/pedidos', crearPedido); // Opción alternativa
router.get('/pedido', obtenerPedidos);
export default router;
