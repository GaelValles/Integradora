import React, { useState } from 'react';
import { TextInput, StyleSheet, Image, Button, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../api/auth';

//Rutas para las imagenes
const fondo = require('../../assets/fondo.jpg');
const efecto = require('../../assets/efecto.png');
const facebook = require('../../assets/facebook.png');
const google = require('../../assets/google.png');
const logo = require('../../assets/logo.png');

const styles = StyleSheet.create({
  efecto: {
    width: '100%',
    aspectRatio: 1, // Relación de aspecto 2:1
    marginTop: '35%',
  },
  div: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#000000',
    alignItems: 'center',
    marginTop: '75%',
    height: '70%',
    width: '100%'
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
    backgroundColor: '#DBF2EE'
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
    borderColor: 'black'
  },
  button: {
    width: '75%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#49CCCC',
    padding: 5,
    borderRadius: 20,
    marginTop: 20,
    color: 'white',
    borderColor: '#0000',
  },
  logoContainer: {
    position: 'absolute',

    alignItems: 'center',
    marginTop: 70,
    zIndex: 2,
    width: '100%',
    height: 100
  },
  logo: {
    width: 100,
    height: 100
  }

});

const Login = () => {
  const [loginData, setloginData] = useState({});


  const handleChange = (name, value) => {
    if (name === 'password' && value.length < 6) {
      return;
    }
    setloginData({ ...loginData, [name]: value });
  };


  const handleSubmit = async () => {
    try {
      console.log(loginData);
      const res = await login(loginData);
      console.log(res)
      navigation.navigate('TabNavigator')
      console.log('Inicio de Sesion Exitoso')
    } catch (error) {
      console.error('Credenciales invalidas',error);

    }
  };
  // // guardar las rutas en una pantalla
  const navigation = useNavigation();

  const rutaRegistrar = () => {
    navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
  };


  // Ruta para enviar a Login
  const rutaPrincipal = () => {
    navigation.navigate('TabNavigator'); // Navegar a la pantalla de creación de cuenta
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
          style={styles.input}
          placeholder='Correo'
          onChangeText={(text) => handleChange('correo', text)} />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Contraseña'
          onChangeText={(text) => handleChange('password', text)} />

        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}></View>
          <Text>Recuérdame</Text>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={handleSubmit}>
          <Text style={{ color: '#fff' }} >Iniciar</Text>
        </TouchableOpacity>
        <View style={{ top: 10 }}>
          <Text>No tienes cuenta aun? <TouchableOpacity onPress={rutaRegistrar}>
            <Text style={{ color: '#000', fontWeight: '800', top: 3 }} >Regístrate</Text>
          </TouchableOpacity></Text>

        </View>

      </View>


    </View>
  );
}


export default Login;