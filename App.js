import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importar archivo con las rutas
import Router from './client/controller/rutas';

const App = () => {
  return (
    // importar el componente con las rutas para la pagina prinicpal
      <Router/>
  );
};

export default App;
