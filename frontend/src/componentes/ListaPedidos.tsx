import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:3000/pedido');
      console.log('Pasa por pedidos');
      setPedidos(response.data);
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            {pedido.descripcion} - ${pedido.total} - {pedido.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPedidos;
