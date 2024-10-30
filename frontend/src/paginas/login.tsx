import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/usuario/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/ListaPedidos');
    } catch (error) {
      alert('Error en el login, revisa tus credenciales');
    }
  };
  
  // Registrar usuario
  const registrarUsuario = () => {
    navigate('/registro', { state: { email } });
  };
  return (
    <Container>
      <h2 className="text-center mt-5">Inicio de Sesión</h2>
      <Form onSubmit={manejarLogin} className="mt-4">
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

        <Button variant="primary" type="submit" className="mt-4">
          Iniciar Sesión
        </Button>
        
      </Form>
      <Button variant="primary" type="submit" className="mt-4" onClick={registrarUsuario}>
          Registrarse
      </Button>
    </Container>
    
  );
  
};

export default Login;
