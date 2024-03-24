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
      agregarTBaDB(receivedValue)
    }
  }
  // UseEffect para comprobar conexion al broker y subcripcion al topic
  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Conectado al broker!");
        client.subscribe("/Integradora/Calidad");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Fallo la conexion al broker!");
      }
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  // funcion para mandar los datos a la api
  async function agregarTBaDB(nuevaCalidad) {
    try {
     console.log("dato en la funcion",nuevaCalidad)
      // Enviar los datos a la api
      const response = await fetch('http://localhost:3000/api/agregarCalidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nivel_turbidez: nuevaCalidad,
          status: true,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Calidad guardado correctamente en la base de datos', data.Calidad);
      } else {
        console.error('Error al guardar en la base de datos', data.message);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al servidor', error);
    }
  }


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
  return (
    <View style={styles.mainContainer}>
    <TopBar />
    <SafeAreaView style={styles.container}>
      <View style={styles.subtitleContainer}>
        <View style={styles.subtitleBackground}>
          <Text style={[styles.subtitleText, { color: 'teal' }]}>Calidad: {Calidad}</Text>
          <Text style={styles.subtitleText}>Última Revisión: </Text>
        </View>
      </View>
      <View style={styles.currentTimeContainer}>
        <Text style={styles.currentTimeTitle}>Hora de Introducción de Datos:</Text>
        <Text style={styles.currentTime}></Text>
      </View>
      <View style={styles.container}>
        {/* Tabla para mostrar historial de Calidad de agua */}
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
                <Text style={[styles.dataText, styles.headerText]}>PH De Agua</Text>
                <Text style={[styles.dataText, styles.headerText]}>Estado</Text>
              </View>
            }
          />
        </View>

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
    marginTop:20
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
  container: {
    flex: 1,
    padding: 20,
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
});
