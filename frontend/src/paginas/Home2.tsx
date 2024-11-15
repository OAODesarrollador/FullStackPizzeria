import { Container, Row, Col, Button, Card, Carousel, Form, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCarrito } from '../componentes/Carrito';
import { Piepagina } from '../componentes/Piepagina';
import imagenCombo1 from '../imagenes/Pizza2.jpg';
import imagenCombo2 from '../imagenes/Pizza3.jpg';
import imagenCombo3 from '../imagenes/Pizza4.jpg';
import imagenCombo4 from '../imagenes/pizza7.jpg';
import imagenCombo5 from '../imagenes/pizza8.jpg';
import videoFondo from '../imagenes/VideoPizzaDos.mp4';
import { Barra } from '../componentes/BarraNav';

import '../paginas/Estilos/Home2.css';

const Home2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {  agregarAlCarrito } = useCarrito();

    // Estado para el producto seleccionado y visibilidad del modal
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    // Producto interface para definir el tipo de producto
    interface Producto {
        id: number;
        nombre: string;
        precio: number;
        imagen: any;
        detalle: string;
    }

    const productos: Producto[] = [
        { id: 1, nombre: 'Combo 1 - Pizza y Bebida', precio: 15, imagen: imagenCombo1, detalle:"Disfruta de una deliciosa pizza calabresa, elaborada con una masa crujiente y una salsa de tomate casera, cubierta con una generosa porción de queso y rodajas de picante salami calabresa. Acompañada de una refrescante bebida, este combo te ofrece una comida rápida y satisfactoria por solo $15. ¡Una oferta irresistible que no puedes dejar pasar!"  },
        { id: 2, nombre: 'Combo 2 - Pizza Familiar', precio: 18, imagen: imagenCombo2, detalle:'¡Disfruta de una exquisita pizza familiar a un precio inmejorable!, podrás llevar a casa una generosa pizza de tamaño familiar, hecha con los mejores ingredientes. La masa crujiente y la salsa casera de tomate forman la base de esta delicia, mientras que una abundante capa de queso y tus toppings favoritos la convierten en una deliciosa comida para compartir con la familia o amigos. ¡No dejes pasar esta oferta y disfruta de una auténtica pizza familiar a un precio increíble!' },
        { id: 3, nombre: 'Combo 3 - Dos Pizzas', precio: 25, imagen: imagenCombo3, detalle:'¡Dos pizzas en un solo combo! Disfruta de esta increíble oferta que te permite llevar a casa dos deliciosas pizzas, cada una con una masa crujiente, una salsa casera de tomate y una generosa cantidad de queso. Elige tus toppings favoritos y sorprende a tus seres queridos con esta irresistible promoción. ¡No lo dudes, aprovecha el Combo 3 y llévate a casa el doble de placer!' },
        { id: 4, nombre: 'Combo 4 - Pizza y Postre', precio: 20, imagen: imagenCombo4, detalle:'¡Termina tu comida con una dulce sorpresa! Con este increíble combo, disfruta de una deliciosa pizza y un delicioso postre. La pizza, con su masa crujiente y salsa casera, será el plato principal. Y para coronar la experiencia, te deleitarás con un postre irresistible que endulzará tu paladar. ¡No te pierdas esta oferta que te brinda lo mejor de lo salado y lo dulce a un precio inigualable' },
        { id: 5, nombre: 'Combo 5 - Pizza Suprema', precio: 30, imagen: imagenCombo5, detalle:'¡Disfruta de una pizza suprema llena de sabor! Sobre una base de masa crujiente y salsa de tomate casera, se encuentran una generosa cantidad de queso, pepperoni, salchicha, champiñones, pimientos y cebollas. ¡Un verdadero manjar que no puedes perderte!' },
    ];

    useEffect(() => {
        if (location.state?.scrollToNosotros) {
            const nosotrosSection = document.getElementById('nosotros');
            if (nosotrosSection) {
                nosotrosSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const verDetalles = (producto: Producto) => {
        navigate(`/producto/${producto.id}`, { state: { producto } });
    };

    

    // Función para manejar la acción de agregar al carrito y mostrar el modal
    const handleAgregarAlCarrito = (producto: Producto) => {
        agregarAlCarrito(producto); // Agregar al carrito
        setProductoSeleccionado(producto); // Establece el producto seleccionado
        setShowAlert(true); // Mostrar el modal
        setTimeout(() => setShowAlert(false), 2000); // Ocultar el modal después de 2 segundos
    };

    return (
        <div className="home">
            <video autoPlay loop muted className="video-fondo">
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
            </video>
            <Barra />
            
            <Container className="contenido" id="inicio">
                <h1 className="text-center mt-1 neon titulo-script">Pizzería Argento</h1>    
                <Row className="justify-content-center mt-5">
                    <Carousel className="carousel mx-auto" style={{ maxWidth: '600px' }}>
                        {productos.map((producto) => (
                            <Carousel.Item className="carousel-item" key={producto.id}>
                                <Col xs={12} className="mb-4">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Img className="producto-imagen" variant="top" src={producto.imagen} />
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>Precio: ${producto.precio}</Card.Text>
                                            <Button 
                                                variant="primary" 
                                                className="ml-2" 
                                                onClick={() => handleAgregarAlCarrito(producto)}
                                            >
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

            <Row className="justify-content-center mt-5 nosotros" id="nosotros">
                <Col className="d-flex  ">
                    <h2 className="neon titulo-script">Nosotros</h2>
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center texto-nosotros">
                    <p >
                        Nuestra Pizzería: Tradición y Sabor en Cada Mordisco

                        En nuestra pizzería, la tradición y la calidad son los pilares fundamentales. Somos una empresa dedicada a la elaboración artesanal de pizzas, donde utilizamos recetas y técnicas que han sido transmitidas de generación en generación.

                        Cada una de nuestras pizzas es una obra de arte, con una masa crujiente, una salsa de tomate casera y una generosa cantidad de queso y toppings frescos. Nuestra pasión por la pizza se refleja en cada detalle, brindando a nuestros clientes una experiencia culinaria excepcional.

                        Además de nuestras deliciosas pizzas, ofrecemos un ambiente acogedor y un servicio esmerado, para que cada visita sea una oportunidad de disfrutar de la auténtica pizza artesanal. ¡Únete a nosotros y descubre el verdadero sabor de la tradición!
                    </p>
                </Col>
            </Row>

            <Row id='contacto'>
              <Col className="d-flex justify-content-start contacto">
                  <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Correo Electrónico</Form.Label>
                          <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
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

            {/* Modal para mostrar la confirmación de agregar al carrito */}
            <Modal  variant="success" show={showAlert} onHide={() => setShowAlert(false)} centered>
                <Modal.Header className="modalDetalle" closeButton>Producto agregado al carrito</Modal.Header>
                <Modal.Body >{productoSeleccionado?.nombre}</Modal.Body>  
            </Modal>
        </div>
    );
};

export default Home2;
