import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaPedidos.css';  // Importa el CSS

interface Pedido {
  id: number;
  descripcion: string;
  total: number;
  direccionEnvio: string;
  estado: string;
}

const ListaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado.');
          return;
        }
        const response = await axios.get('http://localhost:3000/pedido/verPedidos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Total</th>
            <th>Dirección de Envío</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.descripcion}</td>
              <td>${pedido.total}</td>
              <td>{pedido.direccionEnvio}</td>
              <td>{pedido.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPedidos;