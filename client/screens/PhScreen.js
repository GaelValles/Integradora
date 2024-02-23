import * as React from 'react';
import { TextInput, StyleSheet, Image, Button, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
const logo = require('../../assets/logo.png')
const flecha = require('../../assets/atras.png')
const user = require('../../assets/user.png')
const home = require('../../assets/home.png')
const ventas = require('../../assets/ventas.png')
const dureza = require('../../assets/dureza.png')
const ph = require('../../assets/ph.png')
const flujo = require('../../assets/flujo.png')
import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
  
  header:{
    height:80
  },
  atras:{
    width:50,
    height:50,
    marginTop:25,
    marginLeft:10
  },
  logo:{
    width:50,
    height:40,
    marginLeft:155,
    marginTop:-45
  },
  user:{
    width:40,
    height:40,
    marginLeft:290,
    marginTop:-45
  },
  titulo:{
    fontSize:30,
    marginLeft:'25%',
    marginTop:'5%'
  },
  total:{
    width:200,
    height:120,
    marginLeft:75,
    marginTop:20,
    borderTopRightRadius:100,
    borderTopLeftRadius:100,
    borderTopColor: 'yellow',
    borderLeftColor: 'green',
    borderRightColor: 'red',
    borderBottomColor: 'white',
    borderWidth: 20 
  },
  flecha:{
    width:70,
    height:60,
    marginLeft:20,
    marginTop:45
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    height:200
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    height:100
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    height:100
  },
  bottomTab:{
    height:70,
    width:'100%',
    backgroundColor:'#7CD7CF',
    marginTop:460
  },
  bottomIcon1:{
    height:35,
    width:35,
    marginTop:15,
    marginLeft:40
  },
  bottomIcon2:{
    height:35,
    width:35,
    marginTop:-35,
    marginLeft:100
  },
  bottomIcon3:{
    height:35,
    width:35,
    marginTop:-35,
    marginLeft:160
  },
  bottomIcon4:{
    height:35,
    width:36,
    marginTop:-35,
    marginLeft:220
  },
  bottomIcon5:{
    height:35,
    width:36,
    marginTop:-35,
    marginLeft:280
  },
});

const PhScreen = () => {

  // guardar las rutas en una pantalla
  // const navigation = useNavigation();

  // // Ruta para enviar a pantalla Registrarse
  // const rutaRegistrarse = () => {
  //   navigation.navigate('Registrar'); // Navegar a la pantalla de creación de cuenta
  // };
  return (
    <View>
      
      <Text style={styles.titulo}>Nivel de PH</Text>
      <View style={styles.total}>
          <Image source={flecha} style={styles.flecha} />
      </View>
          <View style={styles.container}>
      <Text style={styles.title}>Historial de revisiones</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.columnHeader}>Hora</Text>
          <Text style={styles.columnHeader}>Fecha</Text>
          <Text style={styles.columnHeader}>Nivel de pH</Text>
          <Text style={styles.columnHeader}>Estado</Text>
        </View>
        {/* Aquí puedes colocar las filas de datos */}
        <View style={styles.tableRow}>
          <Text style={styles.cell}>10:00</Text>
          <Text style={styles.cell}>2024-02-10</Text>
          <Text style={styles.cell}>7.0</Text>
          <Text style={styles.cell}>Normal</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>12:30</Text>
          <Text style={styles.cell}>2024-02-11</Text>
          <Text style={styles.cell}>6.5</Text>
          <Text style={styles.cell}>Anormal</Text>
        </View>
      </View>
    </View>
    
    </View>
  );
};

export default PhScreen;
