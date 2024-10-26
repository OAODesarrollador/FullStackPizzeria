import React, { useState } from 'react';

const FormularioPedido = ({ onConfirmar }) => {
  const [descripcion, setDescripcion] = useState('');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [total, setTotal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmar({ descripcion, direccionEnvio, total: parseFloat(total) });
    setDescripcion('');
    setDireccionEnvio('');
    setTotal('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descripción del Pedido:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Dirección de Envío:</label>
        <input
          type="text"
          value={direccionEnvio}
          onChange={(e) => setDireccionEnvio(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Total:</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />
      </div>
      <button type="submit">Confirmar Pedido</button>
    </form>
  );
};

export default FormularioPedido;
