import jwt from 'jsonwebtoken';
export const autenticarUsuario = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_super_secreto');
        req.usuario = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
};
