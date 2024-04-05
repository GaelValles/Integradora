import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import axios from 'axios';
// Funcion para el componente de la pagina
import BrokerContext from '../context/broker.context';

const Flujo = () => {
  const{nivelFlujo}=useContext(BrokerContext)



  const [data, setData] = useState([]);

  const fetchDataFromDatabase = () => {
    const exampleData = [
      { date: '2024-02-26', Flujo: 1.2, state: 'Base' },
      { date: '2024-02-25', Flujo: 22, state: 'Base' },
      { date: '2024-02-24', Flujo: 1, state: 'Base' },
    ];
    setData(exampleData);
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <View style={styles.container}>
        <Text style={[styles.title, { textAlign: 'center' }]}>Datos de Flujo de Agua</Text>
        <View style={styles.container1}>

          <View style={styles.sensorContainer3}></View>
          <View style={styles.sensorContainer}>
            <View style={styles.sensorContainer1}>
              <View style={styles.sensorContainer2}>
                <Text style={styles.sensorValue}>{nivelFlujo}</Text>
                <Text style={styles.sensorLabel}>ml</Text>
              </View>
            </View>
          </View>
          <View style={styles.sensorContainer3}></View>
        </View>
        {/* Tabla para el historial */}
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
                <Text style={[styles.dataText, styles.headerText]}>Flujo De Agua</Text>
                <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  container1: {
    flexDirection: 'row', // Cambia la dirección del contenedor a una fila
    alignItems: 'center', // Alinea los elementos verticalmente
    justifyContent: 'center', // Centra los elementos horizontalmente
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
  sensorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'black',
    width: 190,
    height: 190,
  },
  sensorContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
    width: 170,
    height: 160,
  },
  sensorContainer2: {
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'yellow',
    width: 150,
    height: 100,
  },
  sensorContainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'black',
    width: 25, // Ajusta el ancho según tus necesidades
    height: 100, // Ajusta la altura según tus necesidades
    borderRadius: 2
  },
  sensorValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  sensorLabel: {
    fontSize: 18,
    color: 'black',
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

export default Flujo;