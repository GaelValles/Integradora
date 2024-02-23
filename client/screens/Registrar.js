import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const navigation = useNavigation();

  const rutaIniciarSesion = () => {
    navigation.navigate('Login');
  };
  
  const handleSubmit = () => {
    console.log('Formulario enviado:', { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, contraseña, aceptarTerminos });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image 
        style={styles.headerImage}
        source={{uri: 'https://media.istockphoto.com/id/1076819942/es/foto/agua-splash-burbuja-l%C3%ADquida-gota-azul.webp?b=1&s=170667a&w=0&k=20&c=gOmyAgPHTn3VL2a7lF7HjQzmt8gZ5_-PSLqDkfmZuao='}}
      />
      
      <TouchableOpacity style={[styles.secondaryButton, styles.rightAlign]} onPress={rutaIniciarSesion}>
  <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
</TouchableOpacity>


      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={text => setApellidoPaterno(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={text => setApellidoMaterno(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={correoElectronico}
        onChangeText={text => setCorreoElectronico(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={text => setContraseña(text)}
      />
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAceptarTerminos(!aceptarTerminos)}>
          {aceptarTerminos && <Text style={styles.checked}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>Acepto términos y condiciones</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!aceptarTerminos}>
        <Text style={[styles.buttonText, styles.buttonTextRight]} onPress={rutaIniciarSesion}>Registrarse</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Image 
          style={[styles.footerImage, { transform: [{ scaleY: -1 }] }]}
          source={{uri: 'https://media.istockphoto.com/id/1076819942/es/foto/agua-splash-burbuja-l%C3%ADquida-gota-azul.webp?b=1&s=170667a&w=0&k=20&c=gOmyAgPHTn3VL2a7lF7HjQzmt8gZ5_-PSLqDkfmZuao='}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinear en la parte superior
    paddingHorizontal: 20,
  },
  headerImage: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: 200, // Altura fija
    resizeMode: 'cover', // Ajustar la imagen para cubrir todo el espacio sin distorsión
  },
  title: {
    fontSize: 31,
    marginBottom: 10,
    color:"#16c1c8",
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom:15,
  },
  input: {
    width: '100%',
    height: 40,
    color:"#4F5A5A",
    borderBottomWidth: 2,
    borderBottomColor: '#16C1C8',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#16C1C8',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightAlign: {
    width: '100%',
    alignItems: 'flex-end',
  },
  secondaryButton: {
    marginTop: 10,
    marginRight:30,
  },
  secondaryButtonText: {
    color: '#16C1C8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom:20
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    color: '#16C1C8',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color:"#16C1C8",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footerImage: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: 130, // Altura fija
    resizeMode: 'cover', // Ajustar la imagen para cubrir todo el espacio sin distorsión
  },
});

export default Registrar;
