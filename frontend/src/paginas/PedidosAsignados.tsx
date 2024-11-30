import React, { useEffect, useState } from 'react';
import {  Button, Row, Col, Container, Modal } from 'react-bootstrap';
//import axios from 'axios';
import axios from '../servicio/api';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../paginas/Estilos/ListaPedidos.css';

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
  rol: string;
}

const PedidosAsignados: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();
  const [avisoModal, setavisoModal] = useState(false);
  const [avisoError, setavisoError] = useState(false);

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
        //const response = await axios.get(`http://localhost:3000/pedido/asignados/${usuarioData.id}`, {
        const response = await axios.get(`/pedido/asignados/${usuarioData.id}`, {
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
          //`http://localhost:3000/pedido/${pedido.id}`,
          `/pedido/${pedido.id}`,
          { estado: pedido.estado },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setavisoModal(true);
        setTimeout(() => {
          setavisoModal(false);
        },2500)
    } catch (error) {
      setavisoError(true);
        setTimeout(() => {
          setavisoError(false);
        },2500)
      console.error('Error al actualizar estados de pedidos:', error);
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
  const handleClose = () => setavisoModal(false);
  return (
    <div className="fondo">
      <Row > 
        <h1 className="text-center mt-5 ">Lista de Pedidos</h1>
      </Row>
      <Container className="mt-1 tabla-container">
      
      <Row className='encabezado mb-3 mt-3'>
        <Col>
          <h2 className='d-flex'>Usuario:<p className='ms-4 nbreusuario'> {usuario?.nombre}{' - '}{usuario?.rol} </p> </h2>
        </Col>
        <Col className='text-end'>
          <Button variant="primary" onClick={confirmarCambios} className='me-4'>Confirmar Asignación</Button>
          <Button variant="secondary"  onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Col>
      </Row>
      <div className='tabla-scroll'>
      <table className="tabla">
      <thead className="encabezadotabla">
          <tr>
            
            <th>Descripción</th>
            <th>Total</th>
            <th>Dirección de Envío</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="cuerpo">
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              
              <td>{pedido.descripcion}</td>
              <td>${pedido.total}</td>
              <td>{pedido.direccionEnvio}</td>
              <td style={{ color: 'white', backgroundColor: getEstadoColor(pedido.estado) }}>{pedido.estado}</td>
              <td>
                <Button variant="danger" onClick={() => cambiarEstadoPedido(pedido.id, 'EN_PROCESO')}>
                  En Proceso
                </Button>
                <Button variant="success" onClick={() => cambiarEstadoPedido(pedido.id, 'TERMINADO')}>
                  Terminado
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </Container>
      <Modal show={avisoModal} onHide={handleClose}  centered>
        <Modal.Header style={{ backgroundColor: "green", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title><FaCheck /></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:"center"}}> Todos los pedidos actualizados correctamente </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={avisoError} onHide={handleClose}  centered>
        <Modal.Header style={{ backgroundColor: "Red", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title><FaExclamationCircle /></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:"center"}}> Error al confirmar la asignación de los repartidores </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PedidosAsignados;
