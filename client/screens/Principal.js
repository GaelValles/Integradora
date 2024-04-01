import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import axios from 'axios';
export default function Principal() {

  const [nivelPh, setnivelPh] = useState(null);
  const [nivelFlujo, setnivelFlujo] = useState(null);
  const [nivelTurbidez, setnivelTurbidez] = useState(null);

  // Llamar los ultimos datos registrados en la base de datos
  try {
    useEffect(() => {
      // Función para obtener los últimos datos de cada sección
      const api = "http://192.168.1.11:3000/api";
      const obtenerDatos = async () => {
        try {
          // Hacer solicitudes HTTP para obtener los datos más recientes
          const datosPh = await axios.get(`${api}/UltimoPh`);
          const datosFlujo = await axios.get(`${api}/UltimoFlujo`);
          const datoTurbidez = await axios.get(`${api}/UltimaTurbidez`);

          // Establecer los estados con los datos más recientes
          // console.log("Ultimo PH:", datosPh.data);
          setnivelPh(datosPh.data);
          // Datos del flujo
          // console.log("Ultimo dato de Flujo: ", datosFlujo.data)
          setnivelFlujo(datosFlujo.data)
          // Datos del Trubidez
          // console.log("Ultimo dato de Turbidez: ", datoTurbidez.data)
          setnivelTurbidez(datoTurbidez.data)
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };


      obtenerDatos();

      const interval = setInterval(obtenerDatos, 1000);


      return () => clearInterval(interval);
    }, []);
  } catch (error) {
    console.log("Error al llamar los datos", error)
  }




  const navigation = useNavigation();
  const handleBoxClick = (boxNumber) => {
    console.log(`caja ${boxNumber} presionada`);
    // Aquí puedes agregar lógica adicional según el recuadro que se haya clickeado
  };

  const rutaPh = () => {
    navigation.navigate('PH'); // Navegar a la pantalla de PH
  };
  const rutaFlujo = () => {
    navigation.navigate('Flujo'); // Navegar a la pantalla de Flujo
  };
  const rutaVentas = () => {
    navigation.navigate('Ventas'); // Navegar a la pantalla de Ventas
  };
  const rutaDureza = () => {
    navigation.navigate('Calidad'); // Navegar a la pantalla de Dureza
  };


  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <View style={styles.container}>

        <View style={styles.viewTitle}>
          <Text style={styles.title}>Resumen del dia</Text>
        </View>
        <View style={styles.btnPrincipal}>
          <TouchableOpacity style={styles.touchBox} activeOpacity={.9} onPress={rutaPh}>
            <View style={styles.box}>
              <View style={styles.boxEnter}>
                <Text style={styles.boxEnterText}>{nivelPh}</Text>
              </View>
              <View style={styles.boxOut}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/iconos/phIcono.png')}
                />
              </View>
              <Text style={styles.boxText}>Nivel de Ph del agua</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchBox} activeOpacity={.9} onPress={rutaVentas}>
            <View style={styles.box}>
              <View style={styles.boxEnter}>
                <Text style={styles.boxEnterText}>34</Text>
              </View>
              <View style={styles.boxOut}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/iconos/flujoAguaIcono.png')}
                />
              </View>
              <Text style={styles.boxText}>Total de ventas</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btnPrincipal}>
          <TouchableOpacity style={styles.touchBox} activeOpacity={.9} onPress={rutaFlujo}>
            <View style={styles.box}>
              <View style={styles.boxEnter}>
                <Text style={styles.boxEnterText}>{nivelFlujo}</Text>
              </View>
              <View style={styles.boxOut}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/iconos/medidorAguaIcono.png')}
                />
              </View>
              <Text style={styles.boxText}>Flujo del agua</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchBox} activeOpacity={.9} onPress={rutaDureza}>
            <View style={styles.box}>
              <View style={styles.boxEnter}>
                <Text style={styles.boxEnterText}>{nivelTurbidez}</Text>
              </View>
              <View style={styles.boxOut}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/iconos/durezaAgua.png')}
                />
              </View>
              <Text style={styles.boxText}>Turbidez del agua</Text>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  viewTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 100
  },
  btnPrincipal: {
    flexDirection: 'row',
    height: '25%',
    width: '100%',
  },
  touchBox: {
    flex: 1,
    paddingHorizontal: 3,
  },
  box: {
    height: '75%',
    backgroundColor: '#6BEAEA',
    width: '80%',
    margin: 14.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  boxText: {
    marginBottom: -50,
    fontWeight: '500'
  },
  boxEnter: {
    backgroundColor: '#16C1C8',
    width: 60,
    height: 30,
    position: 'absolute',
    top: 50,
    left: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxOut: {
    backgroundColor: '#16C1C8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  boxEnterText: {
    fontSize: 20,
    fontWeight: '700'
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});