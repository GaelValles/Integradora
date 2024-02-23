import * as React from 'react';
import { TextInput, StyleSheet, Image, Button, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Rutas para las imagenes
const fondo = require('../../assets/fondo.jpg');
const efecto = require('../../assets/efecto.png');
const facebook = require('../../assets/facebook.png');
const google = require('../../assets/google.png');
const logo = require('../../assets/logo.png');

const styles = StyleSheet.create({
  efecto: {
    width: '100%',
    height: '35%',
    marginTop: 150,
  },
  container: {
    backgroundColor: '#ffff',
    width: 400,
    height: 500,
    marginTop: -50,
    
  },
  div:{
    position:'absolute',
    width:270,
    height:400,
    borderColor:'#000000',
    marginLeft:'6%',
    marginTop:235,
  },
  titulo:{
    fontSize:40,
    fontWeight:'bold',
    marginLeft:50
  },
  subtitulo:{
    fontSize:20,
    marginLeft:85,
    marginTop:20,
    color:'#474747'
  },
  input: {
    width: '100%',
    height:50,
    padding: 5,
    marginLeft:'7%',
    marginBottom: 10,
    marginTop:20,
    borderColor: '#DBF2EE',
    borderRadius:15,
    borderWidth: 2,
    backgroundColor:'#DBF2EE'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft:'7%',
    alignItems: 'center',
    borderColor: '#DBF2EE',
    border: 3
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderColor:'black'
  },
  button: {
    width:'100%',
    height:40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#49CCCC',
    padding: 5,
    borderRadius: 20,
    marginTop: 20,
    marginLeft:'7%',
    color: '#fff',
    borderColor:'#0000',
    },
  ingresaConText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'gray',

  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    height:100,
    marginLeft:30,
    
  },
 
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 10,
    marginLeft:'10%',
  },
  lineSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  icono1:{
    width:60,
    height:50,
  },
  icono2:{
    width:50,
    height:50,
  },
  logoContainer:{
    position:'absolute',
    marginLeft:'37%',
    marginTop:70,
    zIndex:2,
    width:100,
    height:100
  },
  logo:{
    width:100,
    height:100
  }

});

const Login = () => {

    // // guardar las rutas en una pantalla
    const navigation = useNavigation();

    // // Ruta para enviar a pantalla Registrarse
    // const rutaLogin = () => {
    //   navigation.navigate('Login'); // Navegar a la pantalla de creación de cuenta
    // };

    const rutaRegistrar = () => {
      navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
    };


    // Ruta para enviar a Login
    const rutaPrincipal = () => {
      navigation.navigate('TabNavigator'); // Navegar a la pantalla de creación de cuenta
    };
    
  return (
    <View style={{ flex: 1 }}>

      <ImageBackground source={fondo} resizeMode="cover" style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
        <Image source={efecto} style={styles.efecto} /> 
        <View style={styles.container}></View>
      </ImageBackground>
      <View style={styles.div}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Inicia sesión</Text>
        <TextInput style={styles.input} placeholder='Nombre de usuario' />
        <TextInput style={styles.input}  secureTextEntry={true} placeholder='Contraseña' />
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}></View>
          <Text>Recuérdame</Text>
        </View>
        <TouchableOpacity style={styles.button}  onPress={rutaPrincipal}>
          <Text style={{ color: '#fff' }} >Iniciar</Text>
        </TouchableOpacity>
        <View style={{top:10, marginLeft:'10%',}}>
          <Text>No tienes cuenta aun? <TouchableOpacity onPress={rutaRegistrar}>
          <Text style={{ color: '#000',fontWeight:'800', top:3 }} >Regístrate</Text>
        </TouchableOpacity></Text>
         
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.lineSeparator} />
          <Text style={styles.ingresaConText}>O continua con:</Text>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity>
            <Image source={google} style={styles.icono1} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={facebook} style={styles.icono2} />
          </TouchableOpacity>
        
      </View>

      </View>
    </View>
  );
}

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [recuerdame, setRecuerdame] = useState(false);

  const navigation = useNavigation();

  const rutaIniciarSesion = () => {
    navigation.navigate('Principal');
  };
  
  const handleSubmit = () => {
    console.log('Formulario enviado:', { nombre, contraseña, recuerdame });
  };
}

export default Login;