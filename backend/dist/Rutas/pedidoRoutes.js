import { Router } from 'express';
import { obtenerPedidos, crearPedido } from '../controladores/pedidoControlador.js';
import { autenticarUsuario } from '../middlewares/authMiddlewares.js';
const router = Router();
router.post('/crearPedido', crearPedido); // Opción alternativa
router.get('/verPedidos', autenticarUsuario, obtenerPedidos);
export default router;
