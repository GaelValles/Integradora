import React, { useState, useEffect } from 'react';
import { Client } from "paho-mqtt";
import { TextInput, StyleSheet, Image, Button, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
const logo = require('../../assets/logo.png')
const flecha = require('../../assets/atras.png')
const user = require('../../assets/user.png')
const home = require('../../assets/home.png')
const ventas = require('../../assets/ventas.png')
const dureza = require('../../assets/dureza.png')
const ph = require('../../assets/ph.png')
const flujo = require('../../assets/flujo.png')
import TopBar from '../components/TopBar';
import { useNavigation } from '@react-navigation/native';
// Conexion al broker
const client = new Client(
  "broker.hivemq.com",
  Number(8000),
  `sensoresintegradora ${parseInt(Math.random() * 100)}`
);

// Funcion del componente de la aplicacion
const PhScreen = () => {
  const [Ph, setPh] = useState(0);

  // Funcion para leer los datos desde el topic
  function onMessage(message) {
    if (message.destinationName === "/Integradora/ph") {
      // Guardar en variable el dato de caracter numerico en una variable
      const receivedValue = parseInt(message.payloadString);
      // Actualizar el valor del Ph del estado 
      setPh(receivedValue);
      console.log(`Valor Ph del Agua: ${receivedValue}`);

      agregarPhaDB(receivedValue); //llamar funcion y enviar el valor del Ph
    }
  }
  // UseEffect para comprobar conexion al broker y subcripcion al topic
  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Conectado al broker!");
        client.subscribe("/Integradora/ph");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Fallo la conexion!");
      }
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  // funcion para mandar los datos a la api
  async function agregarPhaDB(nuevoPh) {
    try {

      let estado;
      // condicion para determinar el estado del ph segun el valor recibido
      if (nuevoPh<0){
        estado='No';
      } else if (nuevoPh>0 && nuevoPh < 5) {
        estado = 'Ácido';
      } else if (nuevoPh >= 5 && nuevoPh <= 7) {
        estado = 'Neutro';
      } else {
        estado = 'Alcalina';
      }
      // Enviar los datos a la api
      const response = await fetch('http://localhost:3000/api/agregarPh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nivel_ph: nuevoPh,
          estado: estado,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('PH guardado correctamente en la base de datos', data.ph);
      } else {
        console.error('Error al guardar el PH en la base de datos', data.message);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al servidor', error);
    }
  }



  // guardar las rutas en una pantalla
  // const navigation = useNavigation();

  // // Ruta para enviar a pantalla Registrarse
  // const rutaRegistrarse = () => {
  //   navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
  // };

  return (
    // View para mostrar el AppBar
    <View style={styles.mainContainer}>
      <TopBar />
      <View>

        <Text style={styles.titulo}>Nivel de PH</Text>
        <View style={styles.total}>
          <Image source={flecha} style={styles.flecha} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Historial de revisiones</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Hora</Text>
              <Text style={styles.columnHeader}>Fecha</Text>
              <Text style={styles.columnHeader}>Nivel de pH</Text>
              <Text style={styles.columnHeader}>Estado</Text>
            </View>
            {/* Aquí puedes colocar las filas de datos */}
            <View style={styles.tableRow}>
              <Text style={styles.cell}>10:00</Text>
              <Text style={styles.cell}>2024-02-10</Text>
              <Text style={styles.cell}>{Ph}</Text>
              <Text style={styles.cell}>Normal</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.cell}>12:30</Text>
              <Text style={styles.cell}>2024-02-11</Text>
              <Text style={styles.cell}>{Ph}</Text>
              <Text style={styles.cell}>Anormal</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

// Estilos de la pagina
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 80
  },
  atras: {
    width: 50,
    height: 50,
    marginTop: 25,
    marginLeft: 10
  },
  logo: {
    width: 50,
    height: 40,
    marginLeft: 155,
    marginTop: -45
  },
  user: {
    width: 40,
    height: 40,
    marginLeft: 290,
    marginTop: -45
  },
  titulo: {
    fontSize: 30,
    marginLeft: '25%',
    marginTop: '5%'
  },
  total: {
    width: 200,
    height: 120,
    marginLeft: 75,
    marginTop: 20,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopColor: 'yellow',
    borderLeftColor: 'green',
    borderRightColor: 'red',
    borderBottomColor: 'white',
    borderWidth: 20
  },
  flecha: {
    width: 70,
    height: 60,
    marginLeft: 20,
    marginTop: 45
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 200
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    height: 100
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    height: 100
  },
  bottomTab: {
    height: 70,
    width: '100%',
    backgroundColor: '#7CD7CF',
    marginTop: 460
  },
  bottomIcon1: {
    height: 35,
    width: 35,
    marginTop: 15,
    marginLeft: 40
  },
  bottomIcon2: {
    height: 35,
    width: 35,
    marginTop: -35,
    marginLeft: 100
  },
  bottomIcon3: {
    height: 35,
    width: 35,
    marginTop: -35,
    marginLeft: 160
  },
  bottomIcon4: {
    height: 35,
    width: 36,
    marginTop: -35,
    marginLeft: 220
  },
  bottomIcon5: {
    height: 35,
    width: 36,
    marginTop: -35,
    marginLeft: 280
  },
});

export default PhScreen;
