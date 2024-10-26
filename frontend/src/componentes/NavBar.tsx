import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/registro">Registro</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
