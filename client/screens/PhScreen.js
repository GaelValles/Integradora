import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import BrokerContext from '../context/broker.context';

const PhScreen = () => {
  const { nivelPh } = useContext(BrokerContext); // Solo se está utilizando nivelPh del contexto

  const [ultimos10Registros, setUltimos10Registros] = useState([]); // Definir estado para ultimos10Registros

  const screenWidth = useWindowDimensions().width;

  const fetchDataFromDatabase = () => {
    // Simulando datos de la base de datos
    const exampleData = [
      { fecha: '2024-02-26', nivel_ph: 3, estado: 'Base' },
      { fecha: '2024-02-25', nivel_ph: 6, estado: 'Base' },
      { fecha: '2024-02-24', nivel_ph: 9, estado: 'Base' },
    ];

    // Simulando los últimos 10 registros de la base de datos
    const lastTenData = exampleData.slice(0, 10);
    setUltimos10Registros(lastTenData);
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Tabla para mostrar historial de PH */}
        <View style={styles.tableContainer}>
          <View style={[styles.dataItem, styles.header]}>
            <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
            <Text style={[styles.dataText, styles.headerText]}>PH De Agua</Text>
            <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
          </View>
          {/* Mapear los ultimos 10 registros para mostrarlos en pantalla */}
          {ultimos10Registros.map((item, index) => (
            <View style={styles.dataItem} key={index}>
              <Text style={styles.dataText}>{new Date(item.fecha).toLocaleString()}</Text>
              <Text style={styles.dataText}>{item.nivel_ph}</Text>
              <Text style={styles.dataText}>{item.estado}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    padding: 20,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.84,
    elevation: 7,
  },
});

export default PhScreen;
