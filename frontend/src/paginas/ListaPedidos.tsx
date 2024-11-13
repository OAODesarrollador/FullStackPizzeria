import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../paginas/Estilos/ListaPedidos.css';
import { Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      console.log('Usuario:', usuarioData);
      setUsuario(usuarioData);
    };

    fetchPedidos();
    fetchRepartidores();
    fetchUsuario();
  }, []);

  const asignarRepartidor = (pedidoId: number, usuarioId: number) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === pedidoId ? { ...pedido, usuarioId } : pedido
      )
    );
  };

  const confirmarCambios = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }

    try {
      for (const pedido of pedidos) {
        // Solo actualizar pedidos que tengan un repartidor asignado
        if (pedido.usuarioId) {
          await axios.put(
            `http://localhost:3000/pedido/asignarRepartidor`,
            { idPedido: pedido.id, usuarioId: pedido.usuarioId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      console.log('Todos los pedidos actualizados correctamente.');
    } catch (error) {
      console.error('Error al confirmar cambios en los pedidos:', error);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'NUEVO':
        return 'orange';
      case 'EN_PROCESO':
        return 'red';
      case 'TERMINADO':
        return 'green';
      default:
        return 'gray';
    }
    
  };

  return (
    <div>
      <h1>Lista de Pedidos - Usuario: {usuario?.nombre}</h1>
      <table>
        <thead>
          <tr>
            
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
              
              <td>{pedido.descripcion}</td>
              <td>${pedido.total}</td>
              <td>{pedido.direccionEnvio}</td>
              <td style={{ color: 'white', backgroundColor: getEstadoColor(pedido.estado) }}>{pedido.estado}</td>
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
      <Button variant="primary" onClick={confirmarCambios}>Confirmar</Button>
      <Button variant="secondary" className="ml-2" onClick={() => navigate(-1)}>
            Volver
      </Button>
    </div>
  );
};

export default ListaPedidos;
