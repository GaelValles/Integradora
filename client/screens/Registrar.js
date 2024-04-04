import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
import { regis } from '../api/auth';

const Registrar = () => {
  const [formData, setFormData] = useState({});
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false); // Nuevo estado para verificar si los campos obligatorios están completos
  const navigation = useNavigation();

  const rutaIniciarSesion = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.passwordConfirmada) {
        console.error('Las contraseñas no coinciden');
        return;
      }
      console.log(formData);
      const res = await regis(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (name, value) => {
    if (name === 'password' && value.length < 6) {
      return;
    }
    setFormData({ ...formData, [name]: value });
    // Verificar si los campos obligatorios están completos
    const mandatoryFields = ['nombres', 'apellidos', 'correo', 'telefono', 'password', 'passwordConfirmada'];
    const isFormComplete = mandatoryFields.every(field => formData[field]?.trim() !== ''); // Verifica si todos los campos obligatorios tienen valor
    setFormCompleted(isFormComplete);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image
        style={styles.headerImage}
        source={{ uri: 'https://media.istockphoto.com/id/1076819942/es/foto/agua-splash-burbuja-l%C3%ADquida-gota-azul.webp?b=1&s=170667a&w=0&k=20&c=gOmyAgPHTn3VL2a7lF7HjQzmt8gZ5_-PSLqDkfmZuao=' }}
      />

      <TouchableOpacity style={[styles.secondaryButton, styles.rightAlign]} onPress={rutaIniciarSesion}>
        <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={[styles.input, !formData.nombres && styles.errorText]} // Resaltar el campo si está vacío
        placeholder="Nombre(s)"
        onChangeText={(text) => handleChange('nombres', text)}
      />
      <TextInput
        style={[styles.input, !formData.apellidos && styles.errorText]} // Resaltar el campo si está vacío
        placeholder="Apellido(s)"
        onChangeText={(text) => handleChange('apellidos', text)}
      />
      <TextInput
        style={[styles.input, !formData.correo && styles.errorText]} // Resaltar el campo si está vacío
        placeholder="Correo electrónico"
        onChangeText={(text) => handleChange('correo', text)}
      />
      <TextInput
        style={[styles.input, !formData.telefono && styles.errorText]} // Resaltar el campo si está vacío
        placeholder="Telefono"
        maxLength={10}
        onChangeText={(text) => handleChange('telefono', text)}
      />
      <TextInput
        style={[styles.input, !formData.password && styles.errorText]} // Resaltar el campo si está vacío
        secureTextEntry={true}
        placeholder="Contraseña"
        onChangeText={(text) => handleChange('password', text)}
      />
      {/* input para confirmar password */}
      <TextInput
        style={[styles.input, !formData.passwordConfirmada && styles.errorText]} // Resaltar el campo si está vacío
        secureTextEntry={true}
        placeholder="Confirmar Contraseña"
        onChangeText={(text) => handleChange('passwordConfirmada', text)}
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
      style={[styles.button, (!formCompleted || !aceptarTerminos) && styles.disabledButton]} // Estilo del botón    habilitado/deshabilitado
      onPress={handleSubmit}
      disabled={!aceptarTerminos || !formCompleted} // Habilitar el botón si se aceptan términos y condiciones y todos    los campos obligatorios están completos
    >
      <Text style={[styles.buttonText, styles.buttonTextRight]}>Registrarse</Text>
    </TouchableOpacity>



      {/* Footer */}
      <View style={styles.footer}>
        <Image
          style={[styles.footerImage, { transform: [{ scaleY: -1 }] }]}
          source={{ uri: 'https://media.istockphoto.com/id/1076819942/es/foto/agua-splash-burbuja-l%C3%ADquida-gota-azul.webp?b=1&s=170667a&w=0&k=20&c=gOmyAgPHTn3VL2a7lF7HjQzmt8gZ5_-PSLqDkfmZuao=' }}
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
    height: 100, // Altura fija
    resizeMode: 'cover', // Ajustar la imagen para cubrir todo el espacio sin distorsión
  },
  title: {
    fontSize: 31,
    marginBottom: 10,
    color: "#16c1c8",
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    color: "#4F5A5A",
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
    zIndex: 4
  },
  rightAlign: {
    width: '100%',
    alignItems: 'flex-end',
  },
  secondaryButton: {
    marginTop: 10,
    marginRight: 30,
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
    marginBottom: 20
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
    color: "#16C1C8",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footerImage: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '10%', // Altura fija
    resizeMode: 'cover', // Ajustar la imagen para cubrir todo el espacio sin distorsión
  },
  errorText:{
    borderBottomColor: '#FF0000', // Cambiar el color del borde a rojo
    borderBottomWidth: 2, // Aumentar el ancho del borde para resaltar el campo
  },
  disabledButton: {
    backgroundColor: 'gray', // Cambiar el color del botón a gris
  },
});

export default Registrar;
