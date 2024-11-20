import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../componentes/Carrito';
import '../paginas/Estilos/Checkout.css';
import { useState } from 'react';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'

interface CheckoutProps {
  onClose?: () => void; // Propiedad opcional para cerrar el modal
}
const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useCarrito();
  const total = carrito.reduce((total, producto) => total + producto.precio, 0);

  const [avisoModal, setavisoModal] = useState(false);
  const [vacioModal, setvacioModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [mensajeTitulo, setmensajeTitulo] = useState('');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (carrito.length === 0) {
        setvacioModal(true);
        setTimeout(() => {
          setvacioModal(false);
        },2500)
        return;
      }
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
      setMensajeModal('¡Tu pedido se ha realizado con éxito!');
      setmensajeTitulo('Pedido realizado');
      setavisoModal(true);
      vaciarCarrito();
      setTimeout(() => {
        setavisoModal(false);
        if (onClose) {
          onClose(); // Cierra el modal si `onClose` está definido
        } else {
          navigate(-1); // Regresa a la página anterior si `onClose` no está definido
        }
      }, 2500);
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Ocurrió un error al realizar el pedido. Inténtalo de nuevo más tarde.');
    }
  };

  const handleVaciarCarrito = () => {
    vaciarCarrito();
    setMensajeModal('El carrito ha sido vaciado.'); // Mensaje al vaciar el carrito
    setmensajeTitulo('Carrito vaciado');
    setavisoModal(true);
    setTimeout(() => {
      setavisoModal(false);
    }, 2500);
  };

  
  const handleClose = () => setavisoModal(false);
  const handleClose2 = () => setvacioModal(false);
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
        <Row>
          <Col className='d-flex'>
          <Button  variant="primary" type="submit" className="mt-4 btnConfirmar w-100 me-2 ">
            Confirmar Pedido 
          </Button>
          <Button variant="warning" className="mt-4 ml-2 w-100 me-2" onClick={handleVaciarCarrito}>
                Vaciar Carrito
          </Button>
          <Button
            variant="secondary"
            className="mt-4 ml-2 w-100"
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
          </Col>
        </Row>
      </Form>
    </Container>
    <Modal show={avisoModal} onHide={handleClose } centered >
        <Modal.Header closeButton style={{backgroundColor:"green"}} >
          <Modal.Title style={{color:"white"}}>{mensajeTitulo} {' '}<FaCheck /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensajeModal}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={vacioModal} onHide={handleClose2}  centered>
      <Modal.Header style={{ backgroundColor: "Red", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title><FaExclamationCircle /></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:"center"}}> El carrito esta vacio </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

export default Checkout;
