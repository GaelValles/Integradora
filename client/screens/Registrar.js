import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de enviar los datos a tu servidor o hacer lo que sea necesario con los datos del formulario.
    console.log('Formulario enviado:', { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, contraseña, aceptarTerminos });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <View style={styles.rightAlign}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Registrarte</Text>
        </TouchableOpacity>
      </View>

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
        <Text style={[styles.buttonText, styles.buttonTextRight]}>Registrarse</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 31,
    marginBottom: 10,
    color:"#16c1c8",
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Alinea el título a la izquierda
  },
  input: {
    width: '100%',
    height: 40,
    color:"#4F5A5A",
    borderBottomWidth: 2,
    borderBottomColor: '#16C1C8',
    paddingHorizontal: 10,
    marginBottom: 10,
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
  },
  secondaryButtonText: {
    color: '#16C1C8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
});

export default Registrar;
