import jwt from 'jsonwebtoken';
export const autenticarUsuario = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token); // Verificar si el token está presente
    if (!token) {
        res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_super_secreto');
        console.log('Token decodificado:', decoded); // Verificar el contenido decodificado del token
        req.usuario = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
};
