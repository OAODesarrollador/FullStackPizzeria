import { Col, Button, Badge, Navbar, Nav, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../imagenes/PizzaArgento.png';
import { useCarrito } from '../componentes/Carrito';
import '../componentes/Estilos/BarraNav.css';
import { useState } from 'react';
import Checkout from '../paginas/Checkout';
import Login from '../paginas/login';
export const Barra = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { carrito } = useCarrito();
    const [modalCarrito, setmodalCarrito] = useState(false);
    const [modalLogin, setmodalLogin] = useState(false);

    const handleNavigateNosotros = () => {
        if (location.pathname === '/Home2') {
            const nosotrosSection = document.getElementById('nosotros');
            if (nosotrosSection) {
                nosotrosSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/Home2', { state: { scrollToNosotros: true } });
        }
    };

    const handleNavigateContacto = () => {
        if (location.pathname === '/Home2') {
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/Home2', { state: { scrollToContacto: true } });
        }
    };

    const handleNavigateInicio = () => {
        if (location.pathname === '/Home2') {
            const inicioSection = document.getElementById('inicio');
            if (inicioSection) {
                inicioSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/Home2', { state: { scrollToInicio: true } });
        }
    };

    return (
        <>
        <Navbar expand="lg" className="cajaCarrito3 position-fixed  navbar-dark" >
            <Col className="d-flex align-items-center">
                <Navbar.Brand onClick={handleNavigateInicio} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="Logo de la pizzería" className="logo3" />
                </Navbar.Brand>
            </Col>
            <Col className="d-flex justify-content-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav>
                        <Nav.Link onClick={handleNavigateInicio}>Inicio</Nav.Link>
                        <Nav.Link onClick={handleNavigateNosotros}>Nosotros</Nav.Link>
                        <Nav.Link onClick={handleNavigateContacto}>Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
                <Button variant="primary" onClick={() => setmodalLogin(true)} className="me-2 btnlogin">Login</Button>
                <Button variant="link" onClick={() => setmodalCarrito(true)} className="position-relative">
                    🛒 Carrito
                    {carrito.length > 0 && (
                        <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                            {carrito.length}
                        </Badge>
                    )}
                </Button>
            </Col>
        </Navbar>
         <Modal show={modalCarrito} onHide={() => setmodalCarrito(false)} size="lg" centered> 
           
                
            <Checkout onClose={() => setmodalCarrito(false)} />
        </Modal>
        <Modal show={modalLogin} onHide={() => setmodalLogin(false)} size="lg" centered className='modalLogin'> 
            <Login  />
        </Modal>
        </>
    );
};
