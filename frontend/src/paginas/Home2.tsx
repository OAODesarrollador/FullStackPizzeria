import { Container, Row, Col, Button, Card, Carousel, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCarrito } from '../componentes/Carrito';
import { Piepagina } from '../componentes/Piepagina';
import imagenCombo1 from '../imagenes/Pizza2.jpg';
import imagenCombo2 from '../imagenes/Pizza3.jpg';
import imagenCombo3 from '../imagenes/Pizza4.jpg';
import imagenCombo4 from '../imagenes/pizza7.jpg';
import imagenCombo5 from '../imagenes/pizza8.jpg';
import videoFondo from '../imagenes/VideoPizzaDos.mp4';
import { Barra } from '../componentes/BarraNav';

import './Home2.css';

const Home2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { carrito, agregarAlCarrito } = useCarrito();

    useEffect(() => {
        if (location.state?.scrollToNosotros) {
            const nosotrosSection = document.getElementById('nosotros');
            if (nosotrosSection) {
                nosotrosSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);
    useEffect(() => {
      if (location.state?.scrollToContacto) {
          const contactoSection = document.getElementById('contacto');
          if (contactoSection) {
              contactoSection.scrollIntoView({ behavior: 'smooth' });
          }
      }
  }, [location]);
  useEffect(() => {
    if (location.state?.scrollToInicio) {
        const inicioSection = document.getElementById('inicio');
        if (inicioSection) {
            inicioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}, [location]);
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
            <video autoPlay loop muted className="video-fondo">
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
            </video>
            <Barra/>
            
            <Container className="contenido" id="inicio">
                <h1 className="text-center mt-1 neon">Pizzería Argento</h1>    
                <Row className="justify-content-center mt-5"  >
                    <Carousel className="carousel mx-auto" style={{ maxWidth: '600px' }}>
                        {productos.map((producto) => (
                            <Carousel.Item className="carousel-item" key={producto.id}>
                                <Col xs={12} className="mb-4">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Img className="producto-imagen" variant="top" src={producto.imagen} />
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>Precio: ${producto.precio}</Card.Text>
                                            <Button variant="primary" className="ml-2" onClick={() => agregarAlCarrito(producto)}>
                                                Agregar al Carrito
                                            </Button>
                                            <Button variant='secondary' onClick={() => verDetalles(producto)}>Ver Detalles</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>  
            </Container>
            <Row className="justify-content-center mt-5 " id="nosotros">
                <Col className="d-flex justify-content-center align-items-center">
                    <p className="nosotros">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quam in reiciendis maiores voluptates doloremque temporibus aspernatur, quidem labore ea ut commodi dolor harum assumenda accusamus corporis quae. Voluptatibus, tempora!
                    </p>
                </Col>
            </Row>
            <Row id='contacto'>
              <Col className="d-flex justify-content-start contacto">
                  <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Correo Electrónico</Form.Label>
                          <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Mensaje</Form.Label>
                          <Form.Control as="textarea" placeholder="Ingrese su mensaje" rows={6} cols={50}/>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Enviar
                      </Button>
                  </Form>      
              </Col>
            </Row>
            <Piepagina />
        </div>
    );
};

export default Home2;
