import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  // guardar las rutas en una pantalla
  const navigation = useNavigation();

  // Ruta para enviar a pantalla Registrarse
  const rutaLogin = () => {
    navigation.navigate('Login'); // Navegar a la pantalla de creación de cuenta
  };
  // Ruta para enviar a pantalla Registrarse
  const rutaRegistrarse = () => {
    navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
  };

  return (
    <ImageBackground source={require('../../assets/fondo.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>RassLight</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#16c1c8', }]} onPress={rutaLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'transparent' }]} onPress={rutaRegistrarse}>
          <Text style={[styles.buttonText, { color: 'black', fontSize: 16, marginTop:10 }]}>Crear una cuenta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 140,
    color: 'black',
  
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 28,
    // fontWeight: 'bold',
    color: 'black', 
    textAlign: 'center',
    
  },
});

export default Inicio;