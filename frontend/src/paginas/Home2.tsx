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
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'
import emailjs from 'emailjs-com';
import '../paginas/Estilos/Home2.css';


const Home2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {  agregarAlCarrito } = useCarrito();

    // Estado para el producto seleccionado y visibilidad del modal
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' }); // Estado del formulario
    const [loading, setLoading] = useState(false); // Para manejar el estado de envío
    const [alertaCorreo, setAlertaCorreo] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);

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
    const handleClose = () => setShowAlert(false);

    // Enviar correo usando EmailJS

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        emailjs
            .send(
                'service_o6gbsh6', // Reemplaza con tu Service ID
                'template_7vchtk2', // Reemplaza con tu Template ID
                {
                    from_name: formData.nombre,
                    to_email: formData.email,
                    message: formData.mensaje,
                }, // Datos del formulario
                'JyRyZiB_qBCSyq7ob' // Reemplaza con tu Public Key
               
            )
            .then(() => {
                setAlertaCorreo(true); // Mostrar el modal
                setTimeout(() => setAlertaCorreo(false), 2000);
                setFormData({ nombre: '', email: '', mensaje: '' }); // Limpiar formulario
            })
            .catch(() => { 
                setAlertaCorreo(true); // Mostrar el modal
                setTimeout(() => setAlertaCorreo(false), 5000);})
            .finally(() => setLoading(false));
    };

    return (
        <div className="home">
            <video autoPlay loop muted className="video-fondo">
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
            </video>
            <Barra />
            <Container className="contenido" id="inicio">
                <h1 className="text-center mt-4 neon titulo-script">Pizzería Argento</h1>    
                <Row className="justify-content-center mt-5">
                    <Carousel className="carousel" style={{ maxWidth: '600px' }}>
                        {productos.map((producto) => (
                            <Carousel.Item className="carousel-item" key={producto.id}>
                                <Col xs={12} className="mb-4">
                                    <Card >
                                        <Card.Body>
                                            <Card.Img className="producto-imagen" variant="top" src={producto.imagen} />
                                            <Card.Title className='mt-3'>{producto.nombre}</Card.Title>
                                            <Card.Text>Precio: ${producto.precio}</Card.Text>
                                            <Row>
                                                <Col className='d-flex mb-3 mt-2' >
                                                    <Button 
                                                        variant="primary" 
                                                        className="w-100 me-4" 
                                                        onClick={() => handleAgregarAlCarrito(producto)}
                                                    >
                                                        Agregar al Carrito
                                                    </Button>
                                                    <Button variant='secondary' onClick={() => verDetalles(producto)} className=' w-100'>Ver Detalles</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>  
            </Container>

            <Row className="justify-content-center mt-5 nosotros" id="nosotros">
                <Col md={6} className="d-flex">
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

            <Row id="contacto" className="justify-content-center contacto">
                <Col className="justify-content-start correo">
                    <h2 className="neon titulo-script-contacto">Contáctanos</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cómo te llamás"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Tu correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mensaje">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="En qué te podemos ayudar"
                                rows={6}
                                value={formData.mensaje}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Piepagina />

            {/* Modal para mostrar la confirmación de agregar al carrito */}
            <Modal  variant="success" show={showAlert} onHide={() => setShowAlert(false)} centered>
                <Modal.Header closeButton style={{backgroundColor:"green"}} >
                    <Modal.Title style={{color:"white"}}>Producto agregado al carrito {'  '}<FaCheck /></Modal.Title>
                </Modal.Header>
                <Modal.Body >{productoSeleccionado?.nombre}</Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal  variant="success" show={alertaCorreo} onHide={() => setAlertaCorreo(false)} centered>
                <Modal.Header closeButton style={{backgroundColor:"green"}} >
                    <Modal.Title style={{color:"white"}}>Correo enviado correctamente {'  '}<FaCheck /></Modal.Title>
                </Modal.Header>
                <Modal.Body >Gracias por contactarnos</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal  variant="danger" show={errorCorreo} onHide={() => setErrorCorreo(false)} centered>
                <Modal.Header closeButton style={{backgroundColor:"red"}} >
                    <Modal.Title style={{color:"white"}}>Error al enviar el correo {'  '}<FaExclamationCircle /></Modal.Title>
                </Modal.Header>
                <Modal.Body >Hemos tenido un error al tratar de enviar el correo</Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home2;
