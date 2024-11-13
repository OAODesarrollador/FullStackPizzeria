import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../paginas/Estilos/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/usuario/login', { email, password });

      // Guarda el token y el usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirige según el rol del usuario
      if (data.usuario.rol === 'SUPERVISOR') {
        navigate('/ListaPedidos');
      } else if (data.usuario.rol === 'REPARTIDOR') {
        navigate(`/PedidosRepartidor/${data.usuario.id}`);
      } else {
        alert('Rol de usuario desconocido.');
      }
    } catch (error) {
      alert('Error en el login, revisa tus credenciales');
    }
  };

  const registrarUsuario = () => {
    navigate('/registro', { state: { email } });
  };

  return (
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
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Col>
          <Col className="text-center">
            <Button variant="secondary" onClick={registrarUsuario}>
              Registrarse
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
