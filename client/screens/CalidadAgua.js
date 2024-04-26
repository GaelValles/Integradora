import React, { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'; // Importa Dimensions
import TopBar from '../components/TopBar';
import { BarChart } from 'react-native-chart-kit';
import BrokerContext from '../context/broker.context';

export default function CalidadAgua() {
  const { historialCalidad } = useContext(BrokerContext);
  const ultimaCalidad = historialCalidad.slice(0, 1).reverse();
  const ultimos10Registros = historialCalidad.slice(0, 10);
  const screenWidth = useWindowDimensions().width;

  // Preparar los datos para la gráfica de barras
  const prepareChartData = () => {
    const data = {
      labels: ultimos10Registros.map(item => new Date(item.fecha).toLocaleDateString()),
      datasets: [
        {
          data: ultimos10Registros.map(item => item.nivel_turbidez),
        },
      ],
    };
    return data;
  };
  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={styles.subtitleContainer}>
        <Text style={[styles.subtitleText, {fontWeight:'700', fontSize: 28, textAlign:'center' }]}>Datos de Calidad de Agua</Text>

        <Text style={[styles.subtitleText, {fontWeight:'500', fontSize: 20, textAlign:'left' }]}>Ultima Revision:</Text>
          {ultimaCalidad.map((item) => (
            
            <View style={styles.subtitleBackground}>
              
              <Text style={[styles.subtitleText, { fontSize: 23 }]}> Calidad: {item.status ? 'Buena' : 'Mala'}</Text>
              <Text style={styles.subtitleText}> Nivel: {item.nivel_turbidez}</Text>

              <Text style={styles.subtitleText}>Fecha de Revisión: {new Date(item.fecha).toLocaleString()}</Text>
            </View>
          ))}
        </View>



        <View style={styles.chartContainer}>
          {/* <BarChart
            data={prepareChartData()}
            width={screenWidth * 0.9}
            height={225}
            yAxisSuffix=""
            fromZero={true}
            chartConfig={{
              backgroundColor: '#49CCCC',
              backgroundGradientFrom: '#49CCCC',
              backgroundGradientTo: '#AEE1D3',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              alignSelf: 'center',
            }}
          /> */}
        </View>
        <Text style={[styles.subtitleText, {fontWeight:'400',marginTop:10, fontSize: 20, textAlign:'left' }]}>Ultimos Registros:</Text>

        <View horizontal={true} style={styles.tableContainer}>

          <View style={[styles.dataItem, styles.header]}>
            <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
            <Text style={[styles.dataText, styles.headerText]}>Nivel NTU</Text>
            <Text style={[styles.dataText, styles.headerText]}>Calidad del Agua</Text>
          </View>
          {ultimos10Registros.map((item) => (
            <View style={styles.dataItem} key={item.id}>
              <Text style={styles.dataText}>{new Date(item.fecha).toLocaleString()}</Text>
              <Text style={styles.dataText}>{item.nivel_turbidez}</Text>
              <Text style={styles.dataText}>{item.status ? 'Buena' : 'Mala'}</Text>
            </View>
          ))}
          <Text>Los datos completos se mostraran en la aplicacion Web</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginBottom:300

  },
  scrollStyle:{
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  subtitleBackground: {
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  currentTimeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  currentTimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  currentTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleTable: {
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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
    marginBottom:100
  },
  chartContainer: {
    marginTop: 20,
  },
});
