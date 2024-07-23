// src/components/ScheduleAppointment.js

import React, { useState } from 'react';

const ScheduleAppointment = () => {
  const [appointment, setAppointment] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    edad: '',
    fecha: '',
    hora: '',
  });

  const handleChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) {
        throw new Error('Error al registrar la cita');
      }
      alert('Cita registrada exitosamente');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cédula:</label>
        <input
          type="text"
          name="cedula"
          value={appointment.cedula}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={appointment.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={appointment.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={appointment.edad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={appointment.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hora:</label>
        <input
          type="time"
          name="hora"
          value={appointment.hora}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default ScheduleAppointment;
