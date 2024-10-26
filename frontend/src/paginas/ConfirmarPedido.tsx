import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const ConfirmarPedido = () => {
  console.log('Confirmar pedido bbbbb');
  const [descripcion, setDescripcion] = useState('');
  const [total, setTotal] = useState(0);
  const [direccionEnvio, setDireccionEnvio] = useState('');

  const manejarConfirmarPedido = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Confirmar pedido - - - ');
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("token");
      await axios.post(
        'http://localhost:3000/pedido',
        { descripcion, total, direccionEnvio },
        { headers }
      );
      alert('Pedido confirmado y tarea creada!');
    } catch (error) {
      alert('Error al confirmar el pedido--');
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Confirmar el Pedido</h2>
      <Form onSubmit={manejarConfirmarPedido} className="mt-4">
        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción del Pedido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTotal" className="mt-3">
          <Form.Label>Total</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el total"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="formDireccionEnvio" className="mt-3">
          <Form.Label>Dirección de Envío</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la dirección de envío"
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Confirmar Pedido
        </Button>
      </Form>
    </Container>
  );
};

export default ConfirmarPedido;
