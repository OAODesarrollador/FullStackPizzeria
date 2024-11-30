import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
//import axios from 'axios';
import axios from '../servicio/api';
import '../paginas/Estilos/login.css';
import Registro from './Registro'; // Importa el componente Registro

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [modalRegistro, setmodalRegistro] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [verpassword, setVerpassword] = useState(false);
  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarDatos()) {
      
      return; // Si la validación falla, no continuar
  }
    try {
      //const { data } = await axios.post('http://localhost:3000/usuario/login', { email, password });
      const { data } = await axios.post('/usuario/login', { email, password });
      // Guarda el token y el usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      console.log(data);
      // Redirige según el rol del usuario
      if (data.usuario.rol === 'SUPERVISOR') {
        navigate('/ListaPedidos');
      } else if (data.usuario.rol === 'REPARTIDOR') {
        navigate(`/PedidosRepartidor/${data.usuario.id}`);
      } else {
        alert('Rol de usuario desconocido.');
      }
    } catch (error) {
      console.log('Error en el login', error);
      alert('Error en el login, revisa tus credenciales');
    }
  };

  const validarDatos = () => {
    let errors = { email: '', password: '' };
    let isValid = true;
    const passwordValido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,20}$/;
    
    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(email))) {
        errors.email = 'Correo no válido o vacio';
        isValid = false;
    }
    if (!passwordValido.test(password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres y menor a 20, una mayúscula, una minúscula, un número y un carácter especial @$!%*?&_- ';
      isValid = false;
  }

    setFormErrors(errors); // Actualizar los errores en el estado
    return isValid;
};

  return (
    <>
    <Container className="containerLogin d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center h2">Inicio de Sesión</h1>
      <Form onSubmit={manejarLogin} className="formulario mt-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          {formErrors.email?.trim() && <p className="msjError">{formErrors.email}</p>} {/* Mensaje de error */}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type={verpassword ? 'text' : 'password'}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <Button 
                variant="outline-secondary" 
                onClick={() => setVerpassword(!verpassword)} // Cambia el estado al hacer clic
              >
                {verpassword ? 'Ocultar' : 'Mostrar'} {/* Cambia el texto del botón */}
              </Button>
          {formErrors.password?.trim() && <p className="msjError">{formErrors.password}</p>} {/* Mensaje de error */}
        </Form.Group>

        <Row className="mt-4 ">
          <Col className="text-center">
            <Button variant="primary" type="submit" className='w-100' onClick={validarDatos}>
              Iniciar Sesión
            </Button>
          </Col>
          <Col className="text-center w-100">
          <Button variant="secondary" onClick={() => setmodalRegistro(true)} className="w-100">Registrarse</Button> 
            
            
          </Col>
        </Row>
      </Form>
    </Container>
    <Modal show={modalRegistro} onHide={() => setmodalRegistro(false)} size="lg" centered> 
      <Registro onClose={() => setmodalRegistro(false)} /> {/* Pasa la función para cerrar el modal */}
    </Modal>
    </>
  );
};

export default Login;
