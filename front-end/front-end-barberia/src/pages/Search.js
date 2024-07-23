// src/pages/Search.js

import React from 'react';
import SearchAppointments from '../components/SearchAppointments';

const Search = () => {
  return (
    <div className="search">
      <h2>Buscar Citas</h2>
      <SearchAppointments />
    </div>
  );
};

export default Search;
