import React, { useState, useEffect,useContext } from 'react';
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
import BrokerContext from '../context/calidad.context';

// Funcion del componente de la aplicacion
const PhScreen = () => {
  const { Ph } = useContext(BrokerContext);



  // guardar las rutas en una pantalla
  // const navigation = useNavigation();

  // // Ruta para enviar a pantalla Registrarse
  // const rutaRegistrarse = () => {
  //   navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
  // };

  const [data, setData] = useState([]);

  const fetchDataFromDatabase = () => {
    const exampleData = [
      { date: '2024-02-26', Ph: 1, state: 'Base' },
      { date: '2024-02-25', Ph:  1, state: 'Base' },
      { date: '2024-02-24', Ph:  1, state: 'Base' },
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
            <Text>{Ph}</Text>
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
