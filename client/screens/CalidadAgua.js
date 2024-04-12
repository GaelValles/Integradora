import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, Dimensions } from 'react-native'; // Importa Dimensions
import TopBar from '../components/TopBar';
import { BarChart } from 'react-native-chart-kit';
import BrokerContext from '../context/broker.context';

export default function CalidadAgua() {
  const { nivelTurbidez } = useContext(BrokerContext);

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

  const barChartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.Flujo),
      },
    ],
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.chartContainer}>
          <BarChart
            data={barChartData}
            width={Dimensions.get('window').width * 0.9} // Usa Dimensions
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
          />
        </View>
        <View style={styles.subtitleContainer}>
          <View style={styles.subtitleBackground}>
            <Text style={[styles.subtitleText, { color: 'teal' }]}>Calidad: {nivelTurbidez}</Text>
            <Text style={styles.subtitleText}>Última Revisión: </Text>
          </View>
        </View>
        <View style={styles.currentTimeContainer}>
          <Text style={styles.currentTimeTitle}>Hora de Introducción de Datos:</Text>
          <Text style={styles.currentTime}></Text>
        </View>
        <View style={styles.tableContainer}>
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
      </SafeAreaView>
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
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 20,
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
  },
  chartContainer: {
    marginTop: 20,
  },
});
