// Importa las dependencias necesarias
import React from 'react';
// Importar librerias de navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar las pantallas de las interfaces
import Inicio from '../screens/Inicio';
import Registrar from '../screens/Registrar';
import Login from '../screens/Login';
import Principal from '../screens/Principal';
import editarPrecios from '../screens/editarPrecios';
import Productos from '../screens/productos';
import TabNav from './tab-navigator';
import Ventas from '../screens/Ventas';
import TopBar from '../components/TopBar';
import BrokerContext, { BrokerProvider } from '../context/broker.context'; // Importa el proveedor del contexto

// Crea el stack para la navegacion
const Stack = createStackNavigator();

// Función para crear las rutas 
function Router() {
  return (
    <BrokerProvider>
      <NavigationContainer>
        {/* definir la ruta inicial*/}
        <Stack.Navigator initialRouteName='Inicio'>
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
          <Stack.Screen name="Registrar" component={Registrar} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="editarPrecios" component={editarPrecios} options={{ headerShown: false }} />
          <Stack.Screen name="TabNavigator" component={TabNav} options={{ headerShown: false }} />
          <Stack.Screen name="Ventas" component={Ventas} options={{ headerShown: false }} />
          <Stack.Screen name="TopBar" component={TopBar} options={{ headerShown: false }} />
          <Stack.Screen name="Productos" component={Productos} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BrokerProvider>
  );
}

// Exportar el componente con las rutas
export default Router;
