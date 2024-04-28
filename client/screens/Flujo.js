import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
// Funcion para el componente de la pagina
import BrokerContext from '../context/broker.context';
const Flujo = () => {
  const { nivelFlujo, historialFlujo } = useContext(BrokerContext)

  const ultimos10Registros = historialFlujo.slice(0, 10)

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={styles.container}>
          <Text style={[styles.subtitleText, { fontWeight: '500', fontSize: 20, textAlign: 'left' }]}>Ultima Revision:</Text>
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
              <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
              <Text style={[styles.dataText, styles.headerText]}>Ml Salidos</Text>
              <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
            </View>
            {ultimos10Registros.map((item) => (
              <View style={styles.dataItem} key={item.id}>
                <Text style={styles.dataText}>{new Date(item.fecha).toLocaleString()}</Text>
                <Text style={styles.dataText}>{item.mlSalidos}ml</Text>
                <Text style={styles.dataText}>{item.estado}</Text>
              </View>
            ))}
            <Text>Los datos completos se muestran en la pagina Web</Text>

          </View>
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
    marginBottom: 100
  },
});

export default Flujo;