// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/register">Registrar Cita</Link>
          </li>
          <li>
            <Link to="/search">Buscar Citas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
