import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controladores/usuarioControlador';


const router = Router();

// Registro de nuevo usuario

//router.post('/registro', registrarUsuario);
router.post('/registro',  (req, res, next) =>  registrarUsuario (req, res).then(() => next()));
// Login de usuario

router.post('/login', (req, res, next) => loginUsuario(req, res, next).then(() => next()));
export default router;
