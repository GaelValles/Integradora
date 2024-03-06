import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import { Client } from "paho-mqtt";

// Conexion al broker
const client = new Client(
  "broker.hivemq.com",
  Number(8000),
  `sensoresintegradora ${parseInt(Math.random() * 100)}`
);


const waterData = {
  title: "Calidad del Agua",
  lastRevision: "26/01/2024 18:00",
  currentTime: new Date().toLocaleTimeString('en-US', { hour12: false }), // Get current time
  dataPoints: [
    {
      ph: 120.8,
      waterType: "Agua Dura",
      hardnessHistory: [
        {
          date: "26/01/2023",
          hardnessLevel: "Blanda",
          poValue: "mg/1",
        },
        {
          date: "26/01/2023",
          hardnessLevel: "Blanda",
          poValue: "mg/1",
        },
        {
          date: "26/01/2023",
          hardnessLevel: "Blanda",
          poValue: "mg/1",
        },
        {
          date: "26/01/2023",
          hardnessLevel: "Blanda",
          poValue: "mg/1",
        },
        {
          date: "26/01/2023",
          hardnessLevel: "Blanda",
          poValue: "mg/1",
        },
      ],
      salesFlow: {
        unit: "Mg/L",
        value: 60,
      },
    },
    // Add more data points here...
  ],
};

export default function CalidadAgua() {
  //Guardar valores de la calidad de agua recibida en un estado
  const [Calidad, setCalidad] = useState(0);

  // Funcion para leer los datos desde el topic
  function onMessage(message) {
    if (message.destinationName === "/Integradora/Calidad") {
      // Guardar en variable el dato de caracter numerico en una variable
      const receivedValue = parseInt(message.payloadString);
      // Actualizar el valor del Calidad del estado 
      setCalidad(receivedValue);
      console.log(`Valor Calidad del Agua: ${receivedValue}`);
    }
  }
  // UseEffect para comprobar conexion al broker y subcripcion al topic
  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("/Integradora/Calidad");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);


  return (
    <View style={styles.mainContainer}>
    <TopBar />
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{waterData.title}</Text>
      <View style={styles.subtitleContainer}>
        <View style={styles.subtitleBackground}>
          <Text style={[styles.subtitleText, { color: 'teal' }]}>Calidad: {Calidad}</Text>
          <Text style={styles.subtitleText}>Última Revisión: {waterData.lastRevision}</Text>
        </View>
      </View>
      <View style={styles.currentTimeContainer}>
        <Text style={styles.currentTimeTitle}>Hora de Introducción de Datos:</Text>
        <Text style={styles.currentTime}>{waterData.currentTime}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.sectionTitle}>Historial de Calidad De Agua:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Hora</Text>
          <Text style={styles.columnHeader}>Fecha</Text>
          <Text style={styles.columnHeader}>Nivel de CalidadAgua</Text> 
          <Text style={styles.columnHeader}>mg/L</Text>
        </View>
        <FlatList
          data={waterData.dataPoints[0].hardnessHistory}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>{item.date}</Text>
              <Text style={styles.tableData}>{item.date}</Text>
              <Text style={styles.tableData}>{item.hardnessLevel}</Text>
              <Text style={styles.tableData}>{item.poValue}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    flexDirection: 'column',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleContainer: {
    alignItems: 'center',
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
  dataContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
});
