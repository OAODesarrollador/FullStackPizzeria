import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaPedidos.css';

interface Pedido {
  id: number;
  descripcion: string;
  total: number;
  direccionEnvio: string;
  estado: string;
  usuarioId?: number; // El repartidor asignado
}

interface Repartidor {
  id: number;
  nombre: string;
}

const ListaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
  const [usuario, setUsuario] = useState<{ nombre: string; id: number } | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/pedido/verPedidos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    const fetchRepartidores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuario/repartidores');
        setRepartidores(response.data);
      } catch (error) {
        console.error('Error al obtener repartidores:', error);
      }
    };

    const fetchUsuario = async () => {
      const usuarioData = JSON.parse(localStorage.getItem('usuario')!);
      setUsuario(usuarioData);
    };

    fetchPedidos();
    fetchRepartidores();
    fetchUsuario();
  }, []);

  const asignarRepartidor = async (pedidoId: number, usuarioId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3000/pedido/asignarRepartidor',
        { idPedido: pedidoId, usuarioId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, usuarioId } : pedido
        )
      );
    } catch (error) {
      console.error('Error al asignar repartidor:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Pedidos - Usuario: {usuario?.nombre}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Total</th>
            <th>Dirección de Envío</th>
            <th>Estado</th>
            <th>Repartidor</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.descripcion}</td>
              <td>${pedido.total}</td>
              <td>{pedido.direccionEnvio}</td>
              <td>{pedido.estado}</td>
              <td>
                <select
                  value={pedido.usuarioId || ''}
                  onChange={(e) => asignarRepartidor(pedido.id, parseInt(e.target.value))}
                >
                  <option value="">Seleccionar repartidor</option>
                  {repartidores.map((repartidor) => (
                    <option key={repartidor.id} value={repartidor.id}>
                      {repartidor.nombre}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPedidos;
