// src/components/SearchAppointments.js

import React, { useState } from 'react';

const SearchAppointments = () => {
  const [date, setDate] = useState('');
  const [appointments, setAppointments] = useState(
    {
      cedula: '',
      nombre: '',
      apellido: '',
      edad: '',
      fecha: '',
      hora: '',
    }
  );

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchAppointments = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/appointments/?date_str=${date}`);
      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={fetchAppointments}>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>
      <button type="submit">Buscar</button>
      {appointments.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.cedula}>
                {appointment.nombre} {appointment.apellido} - {appointment.hora}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchAppointments;
