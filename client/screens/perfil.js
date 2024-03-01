import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {perfil_edit} from './perfil_edit';

const Profile = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('matutino'); // Estado para almacenar la opción seleccionada

  return (
    <View style={styles.container1}>
      {/* Figura como medio círculo */}
      <View style={styles.upperContainer}>
        <View style={styles.halfCircle}></View>
        <View style={styles.wheelContainer}>
          {/* Rueda */}
          <View style={styles.wheel}>
            {/* Foto circular */}
            <View style={styles.profileImage}></View>
          </View>
        </View>
      </View>
      {/* Imágenes */}
      <Image source={require('./assets/rueda_sup.jpg')} style={styles.imageSup} />
      <Image source={require('./assets/rueda_inf.jpg')} style={styles.imageInf} />
      <Image source={require('./assets/rueda_med.jpg')} style={styles.imageMed} />
      <View style={styles.container}>
        {/* Caja con campos */}
        <View style={styles.box}>
          <Text style={styles.label}>Nombre(s):</Text>
          <TextInput style={styles.input} placeholder="" />
          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput style={styles.input} placeholder="" />
          <Text style={styles.label}>correo electronico:</Text>
          <TextInput style={styles.input} placeholder="" />
          <View style={styles.rowContainer}>
            <Text style={styles.label_1}>Horario:</Text>
            <TextInput style={[styles.input_1, styles.smallInput_1]} placeholder="" keyboardType="numeric" />
            <Text style={styles.label_1}>:</Text>
            <TextInput style={[styles.input_1, styles.smallInput_1]} placeholder="" keyboardType="numeric" />
            <Picker
              selectedValue={selectedOption}
              style={[styles.input_2, styles.smallInput_2]}
              onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
            >
              <Picker.Item label="Matutino" value="matutino" />
              <Picker.Item label="Despertino" value="despertino" />
            </Picker>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label_1}>Edad:</Text>
            <TextInput style={[styles.input_1, styles.smallInput_1]} placeholder="" keyboardType="numeric" />
            <Text style={styles.label_1}>años</Text>
            <Text style={styles.label_1}>Telefono:</Text>
            <TextInput style={[styles.input_1, styles.smallInput]} placeholder="" keyboardType="numeric" />
          </View>
          {/* Botón de editar */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('perfil_edit')} // Navegación a la interfaz "perfil_edit"
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Profile />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  container1: {
    justifyContent: 'center',
  },
  upperContainer: {
    alignItems: 'center',
  },
  halfCircle: {
    width: 400,
    height: 2,
    borderRadius: 100,
    backgroundColor: '#00BCC5',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    paddingTop: 100
  },
  wheelContainer: {
    position: 'absolute',
    top: 50,
  },
  wheel: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  box: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: 'gray'
  },
  label_1: {
    fontSize: 10,
    marginBottom: 5,
    color: 'gray'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#00BCC5',
    padding: 1,
    marginBottom: 10,
  },
  input_1: {
    borderBottomWidth: 1,
    borderBottomColor: '#00BCC5',
    padding: 1,
    marginBottom: 10,
  },
  input_2: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    shadowColor: '#000', // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 2,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    alignSelf: 'center', // Para centrar el botón
    marginTop: 15,
    backgroundColor: '#00BCC5',
    paddingVertical: 5,
    paddingHorizontal: 15, // Tamaño más pequeño
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  smallInput: {
    width: 85, // Ajusta el ancho según tu preferencia
  },
  smallInput_1: {
    width: 25, // Ajusta el ancho según tu preferencia
  },
  imageSup: {
    position: 'absolute',
    top: 110,
    left: 0,
    width: 100, // Ajusta el tamaño según tu preferencia
    height: 100, // Ajusta el tamaño según tu preferencia
  },
  imageInf: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100, // Ajusta el tamaño según tu preferencia
    height: 100, // Ajusta el tamaño según tu preferencia
  },
  imageMed: {
    position: 'absolute',
    top: '50%',
    right: 15,
    transform: [{ translateY: -25 }], // Para centrar verticalmente
    width: 50, // Ajusta el tamaño según tu preferencia
    height: 50, // Ajusta el tamaño según tu preferencia
  },
});

export default App;

