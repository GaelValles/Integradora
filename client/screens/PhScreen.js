import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import { PieChart } from 'react-native-chart-kit';
import { useWindowDimensions } from 'react-native';
import BrokerContext from '../context/broker.context';

const PhScreen = () => {
  const { nivelPh, nivelFlujo, nivelTurbidez,historialPh } = useContext(BrokerContext); //Varibles de consulta del Context
  const ultimos10Registros = historialPh.slice(0, 10); //Guardar los 10 ultimos registros del PH en una variable

 
  const chartData = [
    { name: 'Base', value: 3 },
    { name: 'Base', value: 6 },
    { name: 'Base', value: 9 },
  ];

  const chartColors = ['#FF5733', '#33FF57', '#3366FF']; // Colores para las secciones del pastel

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const screenWidth = useWindowDimensions().width;
  return (
    <View style={styles.mainContainer}>
      <TopBar />
       {/* Sección de la gráfica */}
       <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={screenWidth - 40} // Ajusta el ancho de la gráfica según el ancho de la pantalla y el padding horizontal
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
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
    marginTop: 50,
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
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default PhScreen;
