import React from 'react';

interface CarritoProps {
  productos: { descripcion: string, precio: number }[];
  total: number;
  onConfirmar: () => void;
}

const Carrito: React.FC<CarritoProps> = ({ productos, total, onConfirmar }) => {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto.descripcion} - ${producto.precio}
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={onConfirmar}>Confirmar Pedido</button>
    </div>
  );
};

export default Carrito;
