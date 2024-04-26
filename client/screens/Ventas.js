
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState, useEffect } from "react";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import TopBar from "../components/TopBar";
import { useNavigation } from '@react-navigation/native';
import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {agregarVenta}  from "../api/auth";
// Link para los iconos
// https://pictogrammers.com/library/mdi/ y https://reactnativeelements.com/docs/1.2.0/icon#containerstyle

export default function Ventas() {
  const [VentaActiva, setVentaActiva] = useState(false);
  const [total, setTotal] = useState(0);
  const [GarrafonPurificada, setGarrafonPurificada] = useState(0);
  const [MedioGarrafonPurificada, setMedioGarrafonPurificada] = useState(0);
  const [garrafonPequeñoPurificada, setgarrafonPequeñoPurificada] = useState(0);
  const [GarrafonAlcalina, setGarrafonAlcalina] = useState(0);
  const [MedioGarrafonAlcalina, setMedioGarrafonAlcalina] = useState(0);
  const [garrafonPequeñoAlcalina, setgarrafonPequeñoAlcalina] = useState(0);


  const aumentarGarrafonPurificada = () => {
    setGarrafonPurificada(GarrafonPurificada + 1);
    setTotal(total + 25)
  };
  const aumentarMedioGarrafonPurificada = () => {
    setMedioGarrafonPurificada(MedioGarrafonPurificada + 1);
    setTotal(total + 20)
  };
  const aumentargarrafonPequeñoPurificada = () => {
    setgarrafonPequeñoPurificada(garrafonPequeñoPurificada + 1);
    setTotal(total + 16)
  };
  const aumentarGarrafonAlcalina = () => {
    setGarrafonAlcalina(GarrafonAlcalina + 1);
    setTotal(total + 28)
  };
  const aumentarMedioGarrafonAlcalina = () => {
    setMedioGarrafonAlcalina(MedioGarrafonAlcalina + 1);
    setTotal(total + 24)
  };
  const aumentargarrafonPequeñoAlcalina = () => {
    setgarrafonPequeñoAlcalina(garrafonPequeñoAlcalina + 1);
    setTotal(total + 20)
  };
  useEffect(() => {
    const checkVentaActiva = async () => {
      const fechaUltimaApertura = await AsyncStorage.getItem('fechaApertura');
      const fechaHoy = new Date().toDateString();
      if (fechaHoy === fechaUltimaApertura) {
        setVentaActiva(true);
      }
    };
    checkVentaActiva();
  }, []);

  const ActivarCaja = async () => {
    console.log("Intentando activar la caja");
    const fechaHoy = new Date().toDateString();
    const fechaUltimaApertura = await AsyncStorage.getItem('fechaApertura');

    if (fechaHoy !== fechaUltimaApertura) {
      await AsyncStorage.setItem('fechaApertura', fechaHoy);
      console.log('Fecha se abrió:', fechaHoy);
      setVentaActiva(true);
    } else {
      console.log('La caja ya fue abierta hoy.');
      alert('La caja ya fue abierta hoy.');
    }
  };


  const CerrarCaja = async () => {
    const fechaHoy = new Date().toDateString();
    await AsyncStorage.setItem('fechaApertura', fechaHoy); 
    const totalGalones = calcularTotalGalones();

    const ventaData = {
      nombre: "prueba",
      fechaApertura: new Date(),
      fechaCerrar:  new Date(),
      totalGalones: totalGalones,
      total : total
    };
    console.log('Venta',ventaData)
    try{
      agregarV(ventaData);
    }catch(error){
      console.log('ERROR AL MANDAR LOS DATOS',error)
    }

    setTotal(0);
    resetCounts();
  };
  // Mandar datos de ventqa
  const agregarV = async (user) => {
    try {
        const res = await agregarVenta(user);
        console.log('Venta',res);
    } catch (error) {
      console.log('Error al registrar la venta axios',error)
    }
};
  // Calcular el totol de galones seleccionados
  function calcularTotalGalones() {
    return GarrafonAlcalina + MedioGarrafonAlcalina + garrafonPequeñoAlcalina + GarrafonPurificada + MedioGarrafonPurificada + garrafonPequeñoPurificada;
  }
  const resetCounts = () => {
    setGarrafonPurificada(0);
    setMedioGarrafonPurificada(0);
    setgarrafonPequeñoPurificada(0);
    setGarrafonAlcalina(0);
    setMedioGarrafonAlcalina(0);
    setgarrafonPequeñoAlcalina(0);
  };

  const navigation = useNavigation();
  // Navegar a interfaz de editar
  const rutaNuevoProducto = () => {
    navigation.navigate('editarPrecios'); // Navegar a la pantalla de creación de cuenta
  };
  // const rutaNuevaAgua = () => {
  //   navigation.navigate('Productos'); // Navegar a la pantalla de creación de cuenta
  // };
  return (
    // View para agregar el AppBar
    <View style={styles.mainContainer}>
      <TopBar />

      {VentaActiva == true ?
        <ImageBackground source={require('../../assets/VentaDesactivada.jpg')} style={styles.background} blurRadius={9}>
          <View style={styles.containerCajaCerrada}>
            <Text style={[styles.text, { marginBottom: 20 }]}>La caja esta desactivada el dia de Hoy..</Text>
            <TouchableOpacity style={[styles.ActivarCaja, { backgroundColor: '#16c1c8', }]} onPress={ActivarCaja}>
              <Text style={styles.buttonText}>Activar Caja</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        :
        <View style={styles.container}>

          <ScrollView style={styles.scroll}>

            {/* Titulo inicial */}
            <Text style={styles.title}>Venta del Dia</Text>
            {/* Botones para editar o Cerrar Caja */}
            {/* <TouchableOpacity activeOpacity={.8} onPress={rutaNuevoProducto}>
              <View style={styles.buttonBox}> */}
                {/* Icono de editar */}
                {/* <Material name="file-edit" size={40} color="#000" />
              </View>

            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={.8} onPress={CerrarCaja}>
              <View style={styles.buttonBox2}>
                <Text>Cierre de Caja</Text>
              </View>
            </TouchableOpacity>
            {/* Boton Desabilitado para agrgar nuevas  */}
            {/* <TouchableOpacity activeOpacity={.8} onPress={rutaNuevaAgua}>
            <View style={styles.buttonBox3}>
              <Text>Agregar</Text>
            </View>
          </TouchableOpacity> */}

            {/* Vista para mostrar el total acumulado */}
            <View style={styles.boxMoney}>
              <Text style={{ fontSize: 30, marginRight: 20, color: '#fff', fontWeight: "600" }}>TOTAL:</Text>
              <View style={styles.boxMoneyContent}>

                <Text style={{ fontSize: 40 }}>${total}</Text>
              </View>
            </View>
            {/* Texto sobre el agua */}
            <View style={styles.textView}>
              <Text style={styles.text}>Cantidad</Text>
              <Text style={styles.textSub}>Purificada</Text>
            </View>
            {/* Cajas para los tipos de recipientes */}
            <View style={styles.flexBox}>
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentarGarrafonPurificada()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>

                {/* Caja que contiene el total de lo agregado GARRAFON*/}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{GarrafonPurificada}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente */}
                <View style={styles.textLabel}>
                  <Text>Garrafon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$25</Text>
                </View>
              </View>
              {/* Segunda Caja */}
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentarMedioGarrafonPurificada()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>
                {/* Caja que contiene el total de lo agregado MEDIO GARRAFON*/}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{MedioGarrafonPurificada}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente */}
                <View style={styles.textLabel}>
                  <Text>Medio Garrafon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$20</Text>
                </View>
              </View>
              {/* Tercera Caja */}
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentargarrafonPequeñoPurificada()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>
                {/* Caja que contiene el total de lo agregado */}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{garrafonPequeñoPurificada}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente GARRAFON PEQUEÑO*/}
                <View style={styles.textLabel}>
                  <Text>Galon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$16</Text>
                </View>
              </View>
            </View>

            {/* Estilo para nombre del agua */}
            <View style={styles.textView}>
              <Text style={styles.textSub}>Alcalina</Text>
            </View>
            {/* Seccion para el segundo tipo de agua */}
            <View style={styles.flexBox}>
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentarGarrafonAlcalina()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>
                {/* Caja que contiene el total de lo agregado */}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{GarrafonAlcalina}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente */}
                <View style={styles.textLabel}>
                  <Text>Garrafon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$28</Text>
                </View>
              </View>
              {/* Segunda Caja */}
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentarMedioGarrafonAlcalina()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>
                {/* Caja que contiene el total de lo agregado */}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{MedioGarrafonAlcalina}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente */}
                <View style={styles.textLabel}>
                  <Text>Medio Garrafon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$24</Text>
                </View>
              </View>
              {/* Tercera Caja */}
              <View style={styles.box}>
                {/* Boton para agregar una nueva venta */}
                <TouchableOpacity onPress={() => aumentargarrafonPequeñoAlcalina()} activeOpacity={.3} style={styles.touchableOpacity}>
                  <Text style={styles.arrow}> ↑ </Text>
                </TouchableOpacity>
                {/* Caja que contiene el total de lo agregado */}
                <View style={styles.boxCount}>
                  <Text style={styles.textCount}>{garrafonPequeñoAlcalina}</Text>
                </View>
                {/* Texto sobre el tipo de recipiente */}
                <View style={styles.textLabel}>
                  <Text>Galon</Text>
                </View>
                {/* Parte para mostrar el precio */}
                <View style={styles.check}>
                  <Text style={styles.precio}>$20</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      }

    </View>

  )
}


const styles = StyleSheet.create({
  //   Estilos para el contenido general de la interfaz
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 60

  },
  //   Estilo para el titulo de la pagina
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center'
  },
  //   Estilo para la caja de editar
  buttonBox: {
    width: 40,
    height: 40,
    marginTop: 30,
    left: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Estilo para Caja Cerrada
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCajaCerrada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActivarCaja: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',

  },
  // Estilo para boton cierre de caja
  buttonBox2: {
    backgroundColor: '#16C1C8',
    width: 120,
    height: 40,
    marginTop: -40,
    left: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBox3: {
    backgroundColor: '#16C1C8',
    width: 120,
    height: 40,
    marginTop: -40,
    left: 210,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Estilo para la caja del dinero acumulado
  boxMoney: {
    backgroundColor: '#16C1C8',
    marginTop: 20,
    height: 150,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 2
  },
  boxMoneyContent: {
    backgroundColor: '#fff',
    marginTop: 50,
    height: 100,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Estilo para el conetenido de los textos sobre el agua
  textView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //   Estilo para texto "Cantidad"
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  //   Estilo para los nombres del agua
  textSub: {
    marginTop: 15,
    color: '#16C1C8',
    fontWeight: '900'
  },

  flexBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    marginBottom: 30
  },
  box: {
    backgroundColor: '#16C1C8',
    height: 170,
    width: '60%',
    flex: 1,
    margin: 3,
    borderRadius: 20
  },
  //Estilo para la flecha de aumentar de la caja
  touchableOpacity: {
    backgroundColor: '#49CCCC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
  },
  boxCount: {
    backgroundColor: '#fff',
    marginRight: 15,
    marginLeft: 15,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textCount: {
    fontSize: 30,
  },
  textLabel: {
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationColor: '#FF0000'
  },
  // Caja del precio
  check: {
    backgroundColor: '#D9D9D9',
    top: 32,
    left: 40,
    height: 40,
    width: 45,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    alignItems: 'center'
  },
  // Estilo para el texto del precio
  precio: {
    fontSize: 18,
    marginTop: 10
  }
})  