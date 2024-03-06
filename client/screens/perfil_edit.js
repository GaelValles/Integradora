import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Perfil = () => {
  const navigation = useNavigation();


  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Matituno');

  const handleGuardar = () => {
    // Lógica para guardar los datos
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
    <View style={styles.halfCircle}></View>
      <View style={styles.wheelContainer}>
        <View style={styles.wheel}>
          <View style={styles.profileImage}></View>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>Nombre(s):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={styles.label}>Apellido(s):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo electrónico"
          value={correo}
          onChangeText={setCorreo}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Horario:</Text>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="HH"
            value={horaInicio}
            onChangeText={setHoraInicio}
            keyboardType="numeric"
          />
          <Text style={styles.label}>:</Text>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="MM"
            value={horaFin}
            onChangeText={setHoraFin}
            keyboardType="numeric"
         
          />
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text>{selectedOption}</Text>
          </TouchableOpacity>
          {showOptions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOptionSelect('Matituno')}
              >
                <Text>Matituno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOptionSelect('Despertino')}
              >
                <Text>Despertino</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            placeholder=" edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={ styles.smallInput_1}
            placeholder="teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleGuardar}>
          <Text style={styles.editButtonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Productos')}
        >
          <Text style={styles.editButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  halfCircle: {
    width: 500,
    height: 2,
    borderRadius: 100,
    backgroundColor: '#00BCC5',
    borderBottomLeftRadius: 10000,
    borderBottomRightRadius: 10000,
    paddingTop: 200,
    marginBottom: -120, // Mover hacia arriba para que se solape con el contenido
  },
  wheelContainer: {
    position: 'absolute', // Colocar encima de la media luna
    top: 200, // Ajustar según sea necesario
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
    marginTop: 200,
    padding: 20,
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
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#00BCC5',
    paddingVertical: 5,
    marginBottom: 9,

  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  smallInput: {
    width: '20%',
  },
  smallInput_1: {
    width: '40%',
    borderBottomWidth: 1,
    borderBottomColor: '#00BCC5',
    paddingVertical: 5,
    marginBottom: 9,
  },
  editButton: {
    backgroundColor: '#00BCC5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  optionButton: {
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
 optionsContainer: {
  position: 'absolute',
  top: 40,
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: 'lightgray',
  borderRadius: 5,
  padding: 2,
  zIndex: 1,
  left: 0, // Alinea las opciones a la izquierda
  width: '100%', // Ancho completo
  marginTop: 2, // Espacio adicional debajo del botón
},


  option: {
    padding: 0,
  },
});

export default Perfil;

