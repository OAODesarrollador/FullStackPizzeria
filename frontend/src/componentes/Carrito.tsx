import React, { createContext, useContext, useState, ReactNode } from 'react';

type Producto = { id: number; nombre: string; precio: number };
type CarritoContextType = {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  vaciarCarrito: () => void;
};

export const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

type CarritoProviderProps = {
  children: ReactNode;
};

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const vaciarCarrito = () => {
    setCarrito([]); // Vacía el carrito
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe utilizarse dentro de un CarritoProvider');
  }
  return context;
};

// Componente para mostrar el contenido del carrito y el botón para vaciarlo
const Carrito: React.FC = () => {
  const { carrito, vaciarCarrito } = useCarrito();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length > 0 ? (
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

export default Carrito;

