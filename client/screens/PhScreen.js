import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text, useWindowDimensions } from 'react-native'; 
import TopBar from '../components/TopBar'; 
import { BarChart } from 'react-native-chart-kit'; 
import BrokerContext from '../context/broker.context'
const PhScreen = () => {
  const {historialPh}=useContext(BrokerContext)
  const ultimos10Registros=historialPh.slice(0,10);
  const screenWidth = useWindowDimensions().width;

  // Preparar los datos para la gráfica de barras
  const prepareChartData = () => {
    const data = {
      labels: ultimos10Registros.map(item => item.fecha), 
      datasets: [
        {
          data: ultimos10Registros.map(item => item.nivel_ph),
        },
      ],
    };
    return data;
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.chartContainer}>
          {/* Renderizar la gráfica de barras con los datos preparados */}
          <Text style={[styles.subtitleText, {fontWeight:'700', textAlign:'center', marginBottom:20, fontSize: 28 }]}>Datos de PH</Text>

          <BarChart
            data={prepareChartData()}
            width={screenWidth * 0.9} // Ancho un poco más pequeño que el de la pantalla
            height={225} // Altura ajustada
            yAxisSuffix=""
            fromZero={true}
            chartConfig={{
              backgroundColor: '#7CD7CF', // Color de fondo
              backgroundGradientFrom: '#AEE1D3', // Gradiente de fondo (inicio)
              backgroundGradientTo: '#49CCCC', // Gradiente de fondo (fin)
              decimalPlaces: 2, // Opcional, por defecto es 2dp
              color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`, // Color de las líneas
              labelColor: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`, // Color de las etiquetas
              style: {
                borderRadius: 100, // Borde redondo
              },
            }}
            style={{
              alignSelf: 'center', // Centrar horizontalmente
            }}
          />
        </View>
        <Text style={[styles.subtitleText, {fontWeight:'400',marginTop:10, fontSize: 20 }]}>Ultimos Registros:</Text>

        <View style={styles.tableContainer}>
          <View style={[styles.dataItem, styles.header]}>
            <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
            <Text style={[styles.dataText, styles.headerText]}>PH De Agua</Text>
            <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
          </View>
          {ultimos10Registros.map((item) => (
            <View style={styles.dataItem} key={item.id}>
              <Text style={styles.dataText}>{new Date(item.fecha).toLocaleString()}</Text>
              <Text style={styles.dataText}>{item.nivel_ph}</Text>
              <Text style={styles.dataText}>{item.estado}</Text>
            </View>
          ))}
           <Text>Los datos completos se muestran en la pagina Web</Text>
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
  chartContainer: {
    marginTop: 0,
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
});

export default PhScreen;
