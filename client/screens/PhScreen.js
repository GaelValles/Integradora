import React, { useState, useEffect } from 'react';
import { Client } from "paho-mqtt";
import { TextInput, StyleSheet, Image, Button, View, Text, ImageBackground, FlatList } from 'react-native';
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
        console.log("Fallo la conexion al broker!");
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
      if (nuevoPh < 0) {
        estado = 'No';
      } else if (nuevoPh > 0 && nuevoPh < 5) {
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

  const [data, setData] = useState([]);

  const fetchDataFromDatabase = () => {
    const exampleData = [
      { date: '2024-02-26', Flujo: 7.2, state: 'Base' },
      { date: '2024-02-25', Flujo: 6.8, state: 'Base' },
      { date: '2024-02-24', Flujo: 7.5, state: 'Base' },
    ];
    setData(exampleData);
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);
  return (
    // View para mostrar el AppBar
    <View style={styles.mainContainer}>
      <TopBar />
      <View style={styles.container}>
        {/* Tabla para mostrar historial de PH */}
        <View style={styles.tableContainer}>
          <View style={[styles.dataItem, styles.header]}>
            <Text style={[styles.dataText, styles.headerText]}>Historial</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.dataItem}>
                <Text style={styles.dataText}>{item.date}</Text>
                <Text style={styles.dataText}>{item.Flujo}</Text>
                <Text style={styles.dataText}>{item.state}</Text>
              </View>
            )}
            ListHeaderComponent={
              <View style={[styles.dataItem, styles.header]}>
                <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
                <Text style={[styles.dataText, styles.headerText]}>PH De Agua</Text>
                <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
              </View>
            }
          />
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dataText: {
    flex: 1,
    textAlign: 'center',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontWeight: 'bold',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.50,
    shadowRadius: 6.84,
    elevation: 7,
  },
});

export default PhScreen;
