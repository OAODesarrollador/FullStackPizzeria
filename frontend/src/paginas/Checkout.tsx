import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../componentes/Carrito';
import '../paginas/Estilos/Checkout.css';

interface CheckoutProps {
  onClose?: () => void; // Propiedad opcional para cerrar el modal
}
const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useCarrito();
  const total = carrito.reduce((total, producto) => total + producto.precio, 0);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const direccionEnvio = (document.getElementById('direccionEnvio') as HTMLInputElement).value;
      const descripcion = carrito.map((producto) => `${producto.nombre} - $${producto.precio}`).join(', ');

      await axios.post('http://localhost:3000/pedido/crearPedido', {
        descripcion,
        total,
        repartidorId: 1,
        direccionEnvio,
        usuarioId: 1,
        estado: 'NUEVO',
      });

      alert('¡Compra realizada con éxito!');
      vaciarCarrito();
      navigate('/');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Ocurrió un error al realizar el pedido. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
    
    <Container className="Carrito">
      <h1>Carrito</h1>
      <Form onSubmit={manejarEnvio} className="mt-4 modalCarrito">
        <h4>Detalles de la Compra:</h4>
        <ul>
          {carrito.map((producto, index) => (
            <p key={index}>{producto.nombre} - ${producto.precio}</p>
          ))}
        </ul>
        {total > 0 && <p>Total: ${total}</p>}
        <Form.Group controlId="direccionEnvio" className="mt-3">
          <Form.Label>Dirección de Envío</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu dirección" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4 btnConfirmar">
          Confirmar Pedido
        </Button>
        <Button variant="warning" className="mt-4 ml-2" onClick={vaciarCarrito}>
          Vaciar Carrito
        </Button>
        <Button
          variant="secondary"
          className="mt-4 ml-2"
          onClick={() => {
            if (onClose) {
              onClose(); // Cierra el modal si `onClose` está definido
            } else {
              navigate(-1); // Regresa a la página anterior si `onClose` no está definido
            }
          }}
        >
          Volver
        </Button>
      </Form>
    </Container>
    </>
  );
  
};

export default Checkout;
