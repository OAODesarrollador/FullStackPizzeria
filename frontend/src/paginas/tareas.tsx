import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
//import axios from 'axios';
import axios from '../servicio/api';

const Tareas = () => {
  const [tareas, setTareas] = useState<Array<any>>([]);

  useEffect(() => {
    const obtenerTareas = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      const { data } = await axios.get('http://localhost:3000/tarea', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas(data);
    };

    obtenerTareas();
  }, []);

  const actualizarEstado = async (id: number, estado: string) => {
    
    const token = localStorage.getItem('token');
    console.log(estado, id);
    await axios.put(
      //`http://localhost:3000/tarea/${id}`,
      `/tarea/${id}`,
      { estado },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Refrescar la lista de tareas
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estado } : tarea
      )
    );
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Lista de las Tareas</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.estado}</td>
              <td>
                {tarea.estado !== 'TERMINADO' && (
                  <Button
                    variant="warning"
                    onClick={() => actualizarEstado(tarea.id, 'EN_PROCESO')}
                    className="me-2"
                  >
                    En Proceso
                  </Button>
                )}
                {tarea.estado !== 'TERMINADO' && (
                  <Button
                    variant="success"
                    onClick={() => actualizarEstado(tarea.id, 'TERMINADO')}
                  >
                    Terminar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tareas;
