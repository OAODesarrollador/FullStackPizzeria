import { Router } from 'express';
import { obtenerPedidos, crearPedido, asignarRepartidor } from '../controladores/pedidoControlador.js';
import { autenticarUsuario } from '../middlewares/authMiddlewares.js';
const router = Router();
router.post('/crearPedido', crearPedido); // Opción alternativa
router.get('/verPedidos', autenticarUsuario, obtenerPedidos);
router.put('/asignarRepartidor', autenticarUsuario, asignarRepartidor);
export default router;
