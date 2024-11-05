import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './paginas/Home';
import Login from './paginas/login';
import Tareas from './paginas/tareas';
import Checkout from './paginas/Checkout';
import ConfirmarPedido from './paginas/ConfirmarPedido'; // Importamos el componente ConfirmarPedido
import Registro from './paginas/Registro';
import ListaPedidos from './paginas/ListaPedidos'
import PedidosAsignados from './paginas/PedidosAsignados';
import ProductoDetalle from './paginas/ProductoDetalle';
import { CarritoProvider } from './componentes/Carrito';


const App = () => {
  return (
    <CarritoProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/tarea" element={<Tareas />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmarpedido" element={<ConfirmarPedido />} /> {/* Nueva ruta para confirmar pedido */}
        <Route path='/PedidosRepartidor/:id' element={<PedidosAsignados/>} />
        <Route path='/ListaPedidos' element={<ListaPedidos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </Router>
    </CarritoProvider>
  );
};

export default App;
