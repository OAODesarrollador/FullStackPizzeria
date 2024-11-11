
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { useCarrito } from '../componentes/Carrito';
import { Barra } from '../componentes/BarraNav';
import { Piepagina } from '../componentes/Piepagina';
import './ProductoDetalle.css';

const ProductoDetalle: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito, carrito } = useCarrito();

  const producto = state?.producto;

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    navigate('/');
  };

  return (
    <Container className="contenedor">
        <Barra/>
        <Button variant="link" onClick={() => navigate('/checkout', { state: { carrito } })}>
            🛒 Ver Carrito ({carrito.length})
        </Button>
      <Card className=" mt-5">
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Precio: ${producto.precio}</Card.Text>
          <Button variant="primary" onClick={handleAgregarAlCarrito}>
            Agregar al Carrito
          </Button>
          <Button variant="secondary" className="ml-2" onClick={() => navigate(-1)}>
            Volver
          </Button>
          
        </Card.Body>
      </Card>
      <Piepagina/>
    </Container>
    
  );
};

export default ProductoDetalle;
