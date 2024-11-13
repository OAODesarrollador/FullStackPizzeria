import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../componentes/Carrito';
import imagenCombo1 from '../imagenes/Pizza2.jpg';
import imagenCombo2 from '../imagenes/Pizza3.jpg';
import imagenCombo3 from '../imagenes/Pizza4.jpg';
import imagenCombo4 from '../imagenes/pizza7.jpg';
import imagenCombo5 from '../imagenes/pizza8.jpg';
import videoFondo from '../imagenes/VideoPizzaDos.mp4'; // Importa el video
import '../paginas/Estilos/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { carrito, agregarAlCarrito } = useCarrito();

  const productos = [
    { id: 1, nombre: 'Combo 1 - Pizza y Bebida', precio: 15, imagen: imagenCombo1 },
    { id: 2, nombre: 'Combo 2 - Pizza Familiar', precio: 18, imagen: imagenCombo2 },
    { id: 3, nombre: 'Combo 3 - Dos Pizzas', precio: 25, imagen: imagenCombo3 },
    { id: 4, nombre: 'Combo 4 - Pizza y Postre', precio: 20, imagen: imagenCombo4 },
    { id: 5, nombre: 'Combo 5 - Pizza Suprema', precio: 30, imagen: imagenCombo5 },
  ];

  interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: any;
  }

  const verDetalles = (producto: Producto) => {
    navigate(`/producto/${producto.id}`, { state: { producto } });
  };

  const manejarFinalizarCompra = () => {
    navigate('/checkout', { state: { carrito } });
  };

  return (
    <div className="home">
      {/* Video de fondo */}
      <video autoPlay loop muted className="video-fondo">
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Contenido principal */}
      <Container className="contenido">
        
        <div className="cajaCarrito d-flex justify-content-end position-fixed top-0 end-0 p-3">
          
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
        <div>
        <Row className="mt-4">
          
          {productos.map((producto) => (
            <Col key={producto.id} md={6}>
              
              <Card className="mb-4">
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
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
      </div>
        <div className="text-center">
          <Button className="mt-4" variant="success" onClick={manejarFinalizarCompra} disabled={carrito.length === 0}>
            Finalizar Compra
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
