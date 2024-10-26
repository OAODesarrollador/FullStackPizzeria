import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('REPARTIDOR');
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el email desde la ubicación (state) del componente
  const initialEmail = location.state?.email || '';
  const [emailFromLogin, setEmailFromLogin] = useState(initialEmail);

  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://localhost:3000/usuario/registro', { nombre, email: emailFromLogin, password, rol });
      alert(`Usuario registrado! ${response.data}`);
      navigate('/login'); // Redirige al usuario a la página de login después del registro
    } catch (error) {
      console.error('Error en el registro', error);
      alert('Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={emailFromLogin} onChange={(e) => setEmailFromLogin(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Rol:
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="REPARTIDOR">Repartidor</option>
          <option value="USUARIO">Usuario</option>
        </select>
      </label>
      <button onClick={handleRegistro}>Registrarse</button>
    </div>
  );
};

export default Registro;