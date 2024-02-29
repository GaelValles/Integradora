
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState } from "react";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import TopBar from "../components/TopBar";
import { useNavigation } from '@react-navigation/native';

// Link para los iconos
// https://pictogrammers.com/library/mdi/ y https://reactnativeelements.com/docs/1.2.0/icon#containerstyle

export default function Ventas() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);

  const handleCheckBoxClick = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setIsChecked1(!isChecked1);
        break;
      case 2:
        setIsChecked2(!isChecked2);
        break;
      case 3:
        setIsChecked3(!isChecked3);
        break;
      case 4:
        setIsChecked4(!isChecked4);
        break;
      case 5:
        setIsChecked5(!isChecked5);
        break;
      case 6:
        setIsChecked6(!isChecked6);
        break;
      default:
        break;
    }
  };

  // funcion para cerrar Caja

  // Nageacion entre paginas
  const navigation = useNavigation();
  // Navegar a interfaz de editar
  const rutaNuevoProducto = () => {
    navigation.navigate('NuevosProductos'); // Navegar a la pantalla de creación de cuenta
  };
  const rutaNuevaAgua = () => {
    navigation.navigate('Productos'); // Navegar a la pantalla de creación de cuenta
  };
  return (
    // View para agregar el AppBar
    <View style={styles.mainContainer}>
    <TopBar />
    <View style={styles.container}>
     
      <ScrollView style={styles.scroll}>
      
        {/* Titulo inicial */}
        <Text style={styles.title}>Venta del Dia</Text>
        {/* Botones para editar o Cerrar Caja */}
        <TouchableOpacity activeOpacity={.8} onPress={rutaNuevoProducto}>
          <View style={styles.buttonBox}>
            {/* Icono de editar */}
            <Material name="file-edit" size={40} color="#000"/>
          </View>
          
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.8}>
          <View style={styles.buttonBox2}>
            <Text>Cierre de Caja</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.8} onPress={rutaNuevaAgua}>
          <View style={styles.buttonBox3}>
            <Text>Agregar</Text>
          </View>
        </TouchableOpacity>

        {/* Vista para mostrar el total acumulado */}
        <View style={styles.boxMoney}>
          <Text style={{fontSize:30,marginRight:20, color:'#fff', fontWeight:"600"}}>TOTAL:</Text>
          <View style={styles.boxMoneyContent}>
          
            <Text style={{fontSize:40}}>$4000.00</Text>
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
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
            </View>
          </View>
          {/* Segunda Caja */}
          <View style={styles.box}>
            {/* Boton para agregar una nueva venta */}
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
            </View>
          </View>
          {/* Tercera Caja */}
          <View style={styles.box}>
            {/* Boton para agregar una nueva venta */}
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
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
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
            </View>
          </View>
          {/* Segunda Caja */}
          <View style={styles.box}>
            {/* Boton para agregar una nueva venta */}
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
            </View>
          </View>
          {/* Tercera Caja */}
          <View style={styles.box}>
            {/* Boton para agregar una nueva venta */}
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            {/* Caja que contiene el total de lo agregado */}
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            {/* Texto sobre el tipo de recipiente */}
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            {/* Parte para mostrar el precio */}
            <View style={styles.check}>
                <Text style={styles.precio}>$18</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    </View>

  )
}


const styles = StyleSheet.create({
//   Estilos para el contenido general de la interfaz
  mainContainer:{
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
    marginBottom:60

    },
//   Estilo para el titulo de la pagina
  title: {
    marginTop:30,
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
  boxMoney:{
    backgroundColor: '#16C1C8',
    marginTop:20,
    height:150,
    width:'100%',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    flex:2
  },
  boxMoneyContent:{
    backgroundColor: '#fff',
    marginTop:50,
    height:100,
    width:'50%',
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
    fontSize:18,
    marginTop:10
  }
})  