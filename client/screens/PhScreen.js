import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import { useWindowDimensions } from 'react-native';
import BrokerContext from '../context/broker.context';
import { PieChart } from 'react-native-chart-kit';

const PhScreen = () => {
  const { nivelPh } = useContext(BrokerContext);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Obtener el ancho de la pantalla
  const screenWidth = useWindowDimensions().width;

  // Simular la obtención de datos de una base de datos
  const fetchDataFromDatabase = () => {
    const exampleData = [
      { date: '2024-02-26', Ph: 3, state: 'Base' },
      { date: '2024-02-25', Ph: 6, state: 'Base' },
      { date: '2024-02-24', Ph: 9, state: 'Base' },
    ];
    setData(exampleData);
  };

  // Simular el efecto de montaje para obtener datos
  useEffect(() => {
    fetchDataFromDatabase();
    const chartData = [
      { name: 'Base1', value: 3 },
      { name: 'Base2', value: 6 },
      { name: 'Base3', value: 9 },
    ];
    setChartData(chartData);
  }, []);

  const chartColors = ['#FF5733', '#33FF57', '#3366FF']; // Colores para las secciones del pastel

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => chartColors.map((color, index) => `rgba(${hexToRgb(color)}, ${opacity})`),
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

  // Función para convertir un color hexadecimal a RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Sección de la gráfica */}
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={screenWidth - 40} // Ajusta el ancho de la gráfica según el ancho de la pantalla y el padding horizontal
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent" // Fondo transparente para la gráfica
            paddingLeft="15" // Espacio a la izquierda del gráfico
            absolute // Posición absoluta del gráfico
          />
        </View>

        {/* Tabla para mostrar historial de PH */}
        <View style={styles.tableContainer}>
          <View style={[styles.dataItem, styles.header]}>
            <Text style={[styles.dataText, styles.headerText]}>Fecha</Text>
            <Text style={[styles.dataText, styles.headerText]}>PH De Agua</Text>
            <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.dataItem} key={index}>
              <Text style={styles.dataText}>{item.date}</Text>
              <Text style={styles.dataText}>{item.Ph}</Text>
              <Text style={styles.dataText}>{item.state}</Text>
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
    marginTop: 20, // Reducido el marginTop para ajustar la tabla debajo de la gráfica
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
