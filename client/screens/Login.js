  import React, { useState, useEffect } from 'react';
  import { TextInput, StyleSheet, Image, View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native'; // Agregamos Alert
  import { useNavigation } from '@react-navigation/native';
  import { useAuth } from "../context/broker.context";

  const fondo = require('../../assets/fondo.jpg');
  const efecto = require('../../assets/efecto.png');
  const logo = require('../../assets/logo.png');

  const Login = () => {
    const { signin, isAuth } = useAuth();
    const navigation = useNavigation();
    const [loginData, setLoginData] = useState({ correo: '', password: '' });
    const [formCompleted, setFormCompleted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({ correo: false, password: false });

    const handleChange = (name, value) => {
      const updatedLoginData = { ...loginData, [name]: value };
      const isFormCompleted = updatedLoginData.correo.trim() !== '' && updatedLoginData.password.trim() !== '';
      setLoginData(updatedLoginData);
      setFormCompleted(isFormCompleted);
      setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };
    
    useEffect(() => {
      // Verificar si el usuario está autenticado después de montar el componente
      if (isAuth) {
        console.log('AUTH',isAuth)
        navigation.navigate('TabNavigator'); // Si está autenticado, navegar a la siguiente pantalla
      }
    }, [isAuth]); // Volver a ejecutar cuando el estado de autenticación cambie

    const handleSubmit = async () => {
      try {
        if (!formCompleted) {
          console.log('Alguno de los campos está vacío.');
          if (loginData.correo.trim() === '') {
            setFieldErrors({ ...fieldErrors, correo: true });
          }
          if (loginData.password.trim() === '') {
            setFieldErrors({ ...fieldErrors, password: true });
          }
          return;
        }
        await signin(loginData);
        Alert.alert('Éxito', '¡Inicio de sesión exitoso!'); // Agregamos la alerta de éxito
      } catch (error) {
        console.error('Credenciales inválidas', error);
      }
    };

    // const rutaRegistrar = () => {
    //   navigation.navigate('Registrar');
    // };

    const isButtonEnabled = () => {
      if (formCompleted) {
        return styles.button;
      } else {
        return [styles.button, styles.disabledButton];
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
            style={[styles.input, fieldErrors.correo && styles.errorInput]}
            placeholder='Correo'
            onChangeText={(text) => handleChange('correo', text)}
          />
          <TextInput
            style={[styles.input, fieldErrors.password && styles.errorInput]}
            secureTextEntry={true}
            placeholder='Contraseña'
            onChangeText={(text) => handleChange('password', text)}
          />
          {/* <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}></View>
            <Text>Recuérdame</Text>
          </View> */}
          <TouchableOpacity
            style={isButtonEnabled()}
            onPress={handleSubmit}
            disabled={!formCompleted}
          >
            <Text style={{ color: '#fff' }}>Iniciar</Text>
          </TouchableOpacity>
          {/* <View style={{ top: 10 }}>
            <Text>No tienes cuenta aún? <TouchableOpacity onPress={rutaRegistrar}>
              <Text style={{ color: '#000', fontWeight: '800', top: 3 }}>Regístrate</Text>
            </TouchableOpacity></Text>
          </View> */}
        </View>
      </View>
    );
  }

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
    errorInput: {
      borderColor: 'red',
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

  export default Login;
