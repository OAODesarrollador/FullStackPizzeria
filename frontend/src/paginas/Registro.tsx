import React, { useState } from 'react';
//import axios from 'axios';
import axios from '../servicio/api';
import {  useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col ,Modal} from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaExclamationCircle, FaEyeSlash, FaEye, FaCheck  } from 'react-icons/fa'; 
import '../paginas/Estilos/Registro.css';

interface RegistroProps {
  onClose?: () => void; // Propiedad opcional para cerrar el modal
}
const Registro: React.FC<RegistroProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('REPARTIDOR');
  const location = useLocation();
  const [verPassword, setVerPassword] = useState(false);

  // Obtener el email desde la ubicación (state) del componente
  const initialEmail = location.state?.email || '';
  const [emailFromLogin, setEmailFromLogin] = useState(initialEmail);
  const [formErrors, setFormErrors] = useState({ nombre: '', email: '', password: '', rol: '' });
  const [avisoModal, setavisoModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [mensajeTitulo, setmensajeTitulo] = useState('');
  const [colorFondo, setColorFondo] = useState('');
  const [iconoModal, setIconoModal] = useState<React.ReactNode | null>(null);

  const handleRegistro = async () => {
    validateForm();
        if (!validateForm()) {
            return; // Si la validación falla, no continuar
        }
    try {
      //const response = await axios.post('http://localhost:3000/usuario/registro', { nombre, email: emailFromLogin, password, rol });
      const response = await axios.post('/usuario/registro', { nombre, email: emailFromLogin, password, rol });
      setmensajeTitulo('');
      setMensajeModal(`Registro Exitoso de ${response.data.nombre}`);
      setColorFondo('green');
      setIconoModal(<FaCheck />);
      setavisoModal(true);
      setTimeout(() => {
        setavisoModal(false);
      },2500)
    } catch (error) {
      setmensajeTitulo('ATENCIÓN ');
      setMensajeModal('Error en el registro');
      setColorFondo('red');
      setIconoModal(<FaExclamationCircle />);
      setavisoModal(true);
      
    }
  };
  const validateForm = () => {
    const passwordValido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,20}$/;
    let errors = { nombre: '', email: '', password: '', rol: '' };
    let isValid = true;
   
    if (!nombre || nombre.length < 2 || nombre.length > 40 || !/^[a-zA-Z\s]+$/.test(nombre)) {
        errors.nombre = 'El nombre debe tener solo entre 2 y 40 Letras con espacios.';
        console.log('nombre vacio',errors);
        isValid = false;
    }
    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(emailFromLogin))) {
        errors.email = 'El correo no es valido.';
        isValid = false;
    }
    if (!passwordValido.test(password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres y menor a 20, una mayúscula, una minúscula, un número y un carácter especial @$!%*?&_- ';
        isValid = false;
    }

    setFormErrors(errors); // Actualizar los errores en el estado
    return isValid;
};

const handleClose = () => setavisoModal(false);
  return (
    <div className='fondo'>
    <Container className="d-flex justify-content-center align-items-center min-vh-100 containerLogin ">
      <div className="w-100"  >
        <h1 className="text-center">Registro Nuevo Usuario</h1>
        <Form className='formulario'>
          <Form.Group controlId="nombre">
          <Form.Label><FaUser/> Nombre Usuario</Form.Label>

            <Form.Control 
              type="text" 
              placeholder="Ingresa tu nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
             {formErrors.nombre?.trim() && <p className="msjError">{formErrors.nombre}</p>} {/* Mensaje de error */}
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
          <Form.Label><FaEnvelope/> Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ingresa tu email" 
              value={emailFromLogin} 
              onChange={(e) => setEmailFromLogin(e.target.value)} 
            />
             {formErrors.email?.trim() && <p className="msjError">{formErrors.email}</p>} {/* Mensaje de error */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label><FaLock  /> Contraseña</Form.Label>
          <div className="input-group">
            <Form.Control 
              type={verPassword ? 'text' : 'password'} 
              placeholder="Crea una contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off" 
            />
            <Button 
              className='btnVerPassword'
              variant="outline-secondary" 
              onClick={() => setVerPassword(!verPassword)}
              
              >
              {verPassword ?  <FaEye /> : <FaEyeSlash />}
            </Button>
          </div>
             {formErrors.password?.trim() && <p className="msjError">{formErrors.password}</p>} {/* Mensaje de error */}
          </Form.Group>
          
          <Form.Group controlId="rol" className="mt-3">
            <Form.Label><FaUserTag  /> Rol</Form.Label>
            <Form.Select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="REPARTIDOR">Repartidor</option>
              <option value="SUPERVISOR">Supervisor</option>
            </Form.Select>
          </Form.Group>
          <Row>
          <Col className="d-flex justify-content-center ">
          <Button 
            variant="primary" 
            className="w-100 mt-4 me-4" 
            onClick={handleRegistro}
          >
            Registrarse
          </Button>
          <Button
            variant="secondary"
            className="mt-4 ml-2 btnVolver"
            onClick={() => {
              if (onClose) {
                onClose(); // Cierra el modal
              }
            }}
          >
            Volver
        </Button>
          </Col>
        </Row>
        </Form>

      </div>
    </Container>
    <Modal show={avisoModal} onHide={handleClose } centered >
        <Modal.Header style={{ backgroundColor: colorFondo, color: "white", display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Modal.Title style={{color:"white"}}>{mensajeTitulo} {' '} {iconoModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensajeModal}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Registro;
