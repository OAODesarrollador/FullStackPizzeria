import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import api from '../servicio/api';
import '../paginas/Estilos/ListaPedidos.css';
import { Button, Modal, Col, Row, Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'

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
  rol: string;
}


const ListaPedidos: React.FC = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
  const [usuario, setUsuario] = useState<{ nombre: string; id: number, rol: string } | null>(null);
  const [avisoModal, setavisoModal] = useState(false);
  const [avisoError, setavisoError] = useState(false);
  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado.');
        return;
      }

      try {
        //const response = await axios.get('http://localhost:3000/pedido/verPedidos', {
          const response = await api.get('/pedido/verPedidos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    const fetchRepartidores = async () => {
      try {
        //const response = await axios.get('http://localhost:3000/usuario/repartidores');
        const response = await api.get('/usuario/repartidores');
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
          //await axios.put(
          await api.put(
            `/pedido/asignarRepartidor`,
            { idPedido: pedido.id, usuarioId: pedido.usuarioId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      console.log('Todos los pedidos actualizados correctamente.');
      setavisoModal(true);
        setTimeout(() => {
          setavisoModal(false);
        },2500)
    } catch (error) {
      setavisoError(true);
        setTimeout(() => {
          setavisoError(false);
        },2500)
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

  const handleClose = () => setavisoModal(false);
  return (
    <div className='fondo '>
      <Row > 
        <h1 className="text-center mt-5 ">Lista de Pedidos</h1>
      </Row>
      <Container className="mt-1 tabla-container">
        <Row className='encabezado mb-3 mt-3'>
          <Col>
            <h2 className='d-flex'>Usuario:<p className='ms-4 nbreusuario'> {usuario?.nombre}{' - '} {usuario?.rol} </p> </h2>
          </Col>
          <Col className='text-end'>
            <Button variant="primary" onClick={confirmarCambios} className='me-4'>Confirmar Asignación</Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Col>
        </Row>      
        <div className="tabla-scroll">
          <table className="tabla">
            <thead className="encabezadotabla">
              <tr>
                <th>Descripción</th>
                <th>Total</th>
                <th>Dirección de Envío</th>
                <th>Estado</th>
                <th>Repartidor</th>
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

export default ListaPedidos;
