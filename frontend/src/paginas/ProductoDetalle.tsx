import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { useCarrito } from '../componentes/Carrito';
import { Barra } from '../componentes/BarraNav';
import '../paginas/Estilos/ProductoDetalle.css';
import videoFondo from '../imagenes/VideoPizzaDos.mp4';
const ProductoDetalle: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito, carrito } = useCarrito();
  const [showAlert, setShowAlert] = useState(false);
  const producto = state?.producto;

  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    setShowAlert(true); // Mostrar el Alert
    setTimeout(() => {
      setShowAlert(false); // Ocultar el Alert después de 3 segundos
    }, 3000);
  };

  return (
    <div className="contenedorDetalle">
      <video autoPlay loop muted className="video-fondo">
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
    </video>
      <Barra />
      
      <Button variant="link" onClick={() => navigate('/checkout', { state: { carrito } })}>
        🛒 Ver Carrito ({carrito.length})
      </Button>
      <Card className="mt-5 cardDetalle">
        <Card.Body>
          
          <Row>
          
            <Col md={6}>
              <Card.Img src={producto.imagen} />
            </Col>
            <Col md={6}>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>Precio: ${producto.precio}</Card.Text>
              <Card.Text>{producto.detalle}</Card.Text>
            </Col>
            <Row className="mt-5">
                <Col>
                  <Button variant="primary" onClick={handleAgregarAlCarrito}>
                    Agregar al Carrito
                  </Button>
                  <Button variant="secondary" className="ml-2" onClick={() => navigate(-1)}>
                    Volver
                  </Button>
                </Col> 
              </Row>
              <Modal  variant="success" show={showAlert} onHide={() => setShowAlert(false)}>
                <Modal.Header className="modalDetalle" closeButton>Producto agregado al carrito</Modal.Header>
                <Modal.Body>{producto.nombre}</Modal.Body>  
              </Modal>
          </Row>
        </Card.Body>
        
      </Card>
      
    </div>
  );
};

export default ProductoDetalle;