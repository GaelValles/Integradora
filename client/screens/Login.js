import React, { useState } from 'react';
import { TextInput, StyleSheet, Image, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../api/auth';

const fondo = require('../../assets/fondo.jpg');
const efecto = require('../../assets/efecto.png');
const logo = require('../../assets/logo.png');

const styles = StyleSheet.create({
  efecto: {
    width: '100%',
    aspectRatio: 1,
    marginTop: '35%',
  },
  div: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#000000',
    alignItems: 'center',
    marginTop: '75%',
    height: '70%',
    width: '100%',
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    marginTop: 20,
    color: '#474747',
  },
  input: {
    width: '75%',
    height: 50,
    padding: 5,
    marginBottom: 10,
    marginTop: 20,
    borderColor: '#DBF2EE',
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#DBF2EE',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DBF2EE',
    border: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'black',
  },
  button: {
    width: '75%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#49CCCC',
    padding: 5,
    borderRadius: 20,
    marginTop: 20,
    color: 'white',
    borderColor: '#0000',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: 70,
    zIndex: 2,
    width: '100%',
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

const Login = () => {
  const [loginData, setLoginData] = useState({ correo: '', password: '' });
  const [formCompleted, setFormCompleted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ correo: false, password: false });

  const handleChange = (name, value) => {
    if (name === 'password' && value.length < 6) {
      return;
    }
    setLoginData({ ...loginData, [name]: value });
    // Verificar si los campos de correo y contraseña están llenos
    setFormCompleted(loginData.correo.trim() !== '' && loginData.password.trim() !== '');
    // Verificar si hay errores en los campos y resaltarlos
    setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
  };

  const handleSubmit = async () => {
    try {
      if (!formCompleted) {
        console.log('\x1b[31m', 'Alguno de los campos está vacío.');
        if (loginData.correo.trim() === '') console.log('\x1b[31m', 'Correo está vacío.');
        if (loginData.password.trim() === '') console.log('\x1b[31m', 'Contraseña está vacía.');
        return;
      }
      console.log(loginData);
      const res = await login(loginData);
      console.log(res);
      navigation.navigate('TabNavigator');
      console.log('Inicio de Sesión Exitoso');
    } catch (error) {
      console.error('Credenciales inválidas', error);
    }
  };

  const navigation = useNavigation();

  const rutaRegistrar = () => {
    navigation.navigate('Registrar');
  };

  // Función para determinar si el botón de iniciar sesión está habilitado
  const isButtonEnabled = () => {
    if (formCompleted) {
      return styles.button; // Habilitar el botón de iniciar sesión
    } else {
      return [styles.button, styles.disabledButton]; // Inhabilitar el botón de iniciar sesión y colocarlo de color gris
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={fondo} resizeMode="cover">
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Image source={efecto} style={styles.efecto} />
        <View style={styles.container}></View>
      </ImageBackground>
      <View style={styles.div}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Inicia sesión</Text>
        <TextInput
          style={[styles.input, fieldErrors.correo && { borderColor: 'red' }]} // Cambia el borde a rojo si hay un error en el campo de correo
          placeholder='Correo'
          onChangeText={(text) => handleChange('correo', text)}
        />
        <TextInput
          style={[styles.input, fieldErrors.password && { borderColor: 'red' }]} // Cambia el borde a rojo si hay un error en el campo de contraseña
          secureTextEntry={true}
          placeholder='Contraseña'
          onChangeText={(text) => handleChange('password', text)}
        />
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}></View>
          <Text>Recuérdame</Text>
        </View>
        <TouchableOpacity
          style={isButtonEnabled()}
          onPress={handleSubmit}
          disabled={!formCompleted}
        >
          <Text style={{ color: '#fff' }}>Iniciar</Text>
        </TouchableOpacity>
        <View style={{ top: 10 }}>
          <Text>No tienes cuenta aún? <TouchableOpacity onPress={rutaRegistrar}>
            <Text style={{ color: '#000', fontWeight: '800', top: 3 }}>Regístrate</Text>
          </TouchableOpacity></Text>
        </View>
      </View>
    </View>
  );
}

export default Login;
