import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../componentes/Carrito';

const Home = () => {
  const navigate = useNavigate();
  const { carrito, agregarAlCarrito } = useCarrito();

  const productos = [
    { id: 1, nombre: 'Combo 1 - Pizza y Bebida', precio: 15 },
    { id: 2, nombre: 'Combo 2 - Pizza Familiar', precio: 18 },
    { id: 3, nombre: 'Combo 3 - Dos Pizzas', precio: 25 },
    { id: 4, nombre: 'Combo 4 - Pizza y Postre', precio: 20 },
    { id: 5, nombre: 'Combo 5 - Pizza Suprema', precio: 30 },
  ];

  const verDetalles = (producto: { id: number; nombre: string; precio: number }) => {
    navigate(`/producto/${producto.id}`, { state: { producto } });
  };

  const manejarFinalizarCompra = () => {
    navigate('/checkout', { state: { carrito } });
  };

  return (
    <Container>
      <div className="d-flex justify-content-end mt-3">
      <Button onClick={() => navigate('/login')}>Login</Button>
        <Button variant="link" onClick={() => navigate('/checkout', { state: { carrito } })} className="position-relative">
          🛒 Carrito
          {carrito.length > 0 && (
            <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
              {carrito.length}
            </Badge>
          )}
        </Button>
      </div>

      <h1 className="text-center mt-5">Bienvenido a la Pizzería</h1>
      <Row className="mt-4">
        {productos.map((producto) => (
          <Col key={producto.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                <Button variant="primary" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </Button>
                <Button variant="link" onClick={() => verDetalles(producto)} className="ml-2">
                  Ver Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button className="mt-4" variant="success" onClick={manejarFinalizarCompra} disabled={carrito.length === 0}>
          Finalizar Compra
        </Button>
      </div>
    </Container>
  );
};

export default Home;
