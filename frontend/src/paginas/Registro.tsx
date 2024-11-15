import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa'; 
import '../paginas/Estilos/Registro.css';

interface RegistroProps {
  onClose?: () => void; // Propiedad opcional para cerrar el modal
}
const Registro: React.FC<RegistroProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('REPARTIDOR');
  const location = useLocation();

  // Obtener el email desde la ubicación (state) del componente
  const initialEmail = location.state?.email || '';
  const [emailFromLogin, setEmailFromLogin] = useState(initialEmail);

  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://localhost:3000/usuario/registro', { nombre, email: emailFromLogin, password, rol });
      alert(`Usuario registrado! ${response.data}`);
      if (onClose) {
        onClose(); 
      }
    } catch (error) {
      console.error('Error en el registro', error);
      alert('Error en el registro');
    }
  };
  
  return (
    <div className='fondo'>
    <Container className="d-flex justify-content-center align-items-center min-vh-100 containerLogin ">
      <div className="w-100"  >
        <h1 className="text-center">Registro</h1>
        <Form className='formulario'>
          <Form.Group controlId="nombre">
          <Form.Label><FaUser/> Nombre Usuario</Form.Label>

            <Form.Control 
              type="text" 
              placeholder="Ingresa tu nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
          <Form.Label><FaEnvelope/> Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ingresa tu email" 
              value={emailFromLogin} 
              onChange={(e) => setEmailFromLogin(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
          <Form.Label><FaLock  /> Contraseña</Form.Label>

            <Form.Control 
              type="password" 
              placeholder="Crea una contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="rol" className="mt-3">
            <Form.Label><FaUserTag  /> Rol</Form.Label>
            <Form.Select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="REPARTIDOR">Repartidor</option>
              <option value="SUPERVISOR">Supervisor</option>
            </Form.Select>
          </Form.Group>
          <Row>
          <Col className="d-flex justify-content-center ">
          <Button 
            variant="primary" 
            className="w-100 mt-4 me-4" 
            onClick={handleRegistro}
          >
            Registrarse
          </Button>
          <Button
            variant="secondary"
            className="mt-4 ml-2 btnVolver"
            onClick={() => {
              if (onClose) {
                onClose(); // Cierra el modal
              }
            }}
          >
            Volver
        </Button>
          </Col>
        </Row>
        </Form>

      </div>
    </Container>
    </div>
  );
};

export default Registro;
