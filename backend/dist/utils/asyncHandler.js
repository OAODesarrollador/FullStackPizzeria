// Esta función toma un controlador asincrónico y devuelve uno que manejará errores
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
export default asyncHandler;
