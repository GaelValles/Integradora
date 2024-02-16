// Importa las dependencias necesarias
import React from 'react';
// Importar librerias de navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar las pantallas de las interfaces
import Inicio from '../screens/Inicio';

// Crea el stack para la navegacion
const Stack = createStackNavigator();

// Función para crear las rutas 
function Router() {
  return (
    <NavigationContainer>
        {/* definir la ruta inicial*/}
      <Stack.Navigator initialRouteName='Inicio'> 
        <Stack.Screen name="Inicio" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Exportar el componente con las rutas
export default Router;
