import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Obtener la dirección de envío del formulario
      const direccionEnvio = (document.getElementById('direccionEnvio') as HTMLInputElement).value;

      // Crear un nuevo pedido en el backend
      await axios.post('/pedido', {
        descripcion: state.carrito.map((producto: any) => `${producto.nombre} - $${producto.precio}`).join(', '),
        total: state.carrito.reduce((total: number, producto: any) => total + producto.precio, 0),
        direccionEnvio,
        usuarioId: 1, // Aquí debes usar el ID del usuario autenticado
        estado: 'NUEVO',
      });

      // Crear una nueva tarea en el backend
      console.log("Pasa por crear tarea");
      await axios.post('/tarea', {
        descripcion: `Entregar pedido a ${direccionEnvio}`,
        repartidorId: 1, // Aquí debes usar el ID del repartidor asignado
        total: state.carrito.reduce((total: number, producto: any) => total + producto.precio, 0),
        estado: 'NUEVO',
      });

      alert('¡Compra realizada con éxito!');
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
          {state.carrito.map((producto: any, index: number) => (
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
      </Form>
    </Container>
  );
};

export default Checkout;