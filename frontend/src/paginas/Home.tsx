import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState<Array<{ id: number; nombre: string; precio: number }>>([]);
  
  const productos = [
    { id: 1, nombre: 'Combo 1 - Pizza y Bebida', precio: 15 },
    { id: 2, nombre: 'Combo 2 - Pizza Familiar', precio: 18 },
    { id: 3, nombre: 'Combo 3 - Dos Pizzas', precio: 25 },
    { id: 4, nombre: 'Combo 4 - Pizza y Postre', precio: 20 },
    { id: 5, nombre: 'Combo 5 - Pizza Suprema', precio: 30 },
  ];

  const agregarAlCarrito = (producto: { id: number; nombre: string; precio: number }) => {
    setCarrito([...carrito, producto]);
    console.log(carrito);
  };

  const finalizarCompra = () => {
    navigate('./checkout', { state: { carrito } });
    setCarrito([]);
  };

  return (
    <Container>
      <Button onClick={() => navigate('/login')}>Login</Button>
     
      <h1 className="text-center mt-5">Bienvenido a la Pizzería </h1>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button className="mt-4" variant="success" onClick={finalizarCompra} disabled={carrito.length === 0}>
        Finalizar Compra
      </Button>
    </Container>
  );
};

export default Home;
