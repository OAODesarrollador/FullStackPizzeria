import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../componentes/Carrito'; // Importamos el hook de carrito

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useCarrito(); // Usamos vaciarCarrito del contexto

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const direccionEnvio = (document.getElementById('direccionEnvio') as HTMLInputElement).value;
      const descripcion = carrito.map((producto) => `${producto.nombre} - $${producto.precio}`).join(', ');

      await axios.post('http://localhost:3000/pedido/crearPedido', {
        descripcion,
        total: carrito.reduce((total, producto) => total + producto.precio, 0),
        repartidorId: 1,
        direccionEnvio,
        usuarioId: 1,
        estado: 'NUEVO',
      });

      alert('¡Compra realizada con éxito!');
      vaciarCarrito(); // Vacía el carrito después de confirmar el pedido
      navigate('/');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Ocurrió un error al realizar el pedido. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Formulario de Envío</h2>
      <Form onSubmit={manejarEnvio} className="mt-4">
        <h4>Detalles de la Compra:</h4>
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>{producto.nombre} - ${producto.precio}</li>
          ))}
        </ul>

        <Form.Group controlId="direccionEnvio" className="mt-3">
          <Form.Label>Dirección de Envío</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu dirección" required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Confirmar Pedido
        </Button>
        <Button variant="warning" className="mt-4 ml-2" onClick={vaciarCarrito}>
          Vaciar Carrito
        </Button>
      </Form>
      <Button variant="secondary" className="ml-2" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Container>
  );
};

export default Checkout;


