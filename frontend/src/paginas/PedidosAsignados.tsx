import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './ListaPedidos.css';

interface Pedido {
  id: number;
  descripcion: string;
  total: number;
  direccionEnvio: string;
  estado: string;
}

interface Usuario {
  id: number;
  nombre: string;
}

const PedidosAsignados: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Obtenemos los datos del usuario almacenados en el localStorage
    const usuarioData = JSON.parse(localStorage.getItem('usuario')!);
    setUsuario(usuarioData);

    // Cargamos los pedidos asignados solo al usuario logueado
    const fetchPedidosAsignados = async () => {
      const token = localStorage.getItem('token');
      if (!token || !usuarioData) {
        console.error('Token o usuario no encontrados.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/pedido/asignados/${usuarioData.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos asignados:', error);
      }
    };

    fetchPedidosAsignados();
  }, []);

  // Función para cambiar el estado de un pedido localmente
  const cambiarEstadoPedido = (id: number, nuevoEstado: string) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
  };

  // Función para confirmar los cambios y enviar al backend
  const confirmarCambios = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }

    try {
      // Envía solo los pedidos que hayan cambiado de estado
      const pedidosCambiados = pedidos.filter((pedido) => pedido.estado !== 'Pendiente');
      for (const pedido of pedidosCambiados) {
        await axios.put(
          `http://localhost:3000/pedido/${pedido.id}`,
          { estado: pedido.estado },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      alert('Estados de pedidos actualizados exitosamente.');
    } catch (error) {
      console.error('Error al actualizar estados de pedidos:', error);
    }
  };

  return (
    <div>
      <h2>Pedidos Asignados - Repartidor: {usuario?.nombre}</h2>
      <table>
        <thead>
          <tr>
            
            <th>Descripción</th>
            <th>Total</th>
            <th>Dirección de Envío</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              
              <td>{pedido.descripcion}</td>
              <td>${pedido.total}</td>
              <td>{pedido.direccionEnvio}</td>
              <td>{pedido.estado}</td>
              <td>
                <Button variant="danger" onClick={() => cambiarEstadoPedido(pedido.id, 'EN_PROCESO')}>
                  En Proceso
                </Button>
                <Button variant="success" onClick={() => cambiarEstadoPedido(pedido.id, 'TERMINADO')}>
                  Terminado
                </Button>
                <Button variant="warning" onClick={() => cambiarEstadoPedido(pedido.id, 'NUEVO')}>
                  Nuevo
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={confirmarCambios}>Confirmar</Button>
    </div>
  );
};

export default PedidosAsignados;
