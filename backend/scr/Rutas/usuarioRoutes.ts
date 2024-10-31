import { Router } from 'express';
import { registrarUsuario, loginUsuario, obtenerRepartidores } from '../controladores/usuarioControlador';


const router = Router();

router.get('/repartidores', obtenerRepartidores); // Nueva ruta para obtener repartidores
router.post('/registro', (req, res, next) => registrarUsuario(req, res).then(() => next()));
router.post('/login', (req, res, next) => loginUsuario(req, res, next).then(() => next()));

export default router;
