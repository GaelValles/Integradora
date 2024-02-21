import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';

export default function Principal() {

  const handleBoxClick = (boxNumber) => {
    console.log(`caja ${boxNumber} presionada`);
    // Aquí puedes agregar lógica adicional según el recuadro que se haya clickeado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del dia</Text>
      <TouchableOpacity style={styles.press} activeOpacity={.9} onPress={() => handleBoxClick(1)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>7</Text>
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
      <TouchableOpacity style={styles.press} activeOpacity={.9} onPress={() => handleBoxClick(2)}>
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
      <TouchableOpacity style={styles.press} activeOpacity={.9} onPress={() => handleBoxClick(3)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>2.300</Text>
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
      <TouchableOpacity style={styles.press} activeOpacity={.9} onPress={() => handleBoxClick(4)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>5</Text>
          </View>
          <View style={styles.boxOut}>
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/iconos/durezaAgua.png')}
            />
          </View>
          <Text style={styles.boxText}>Dureza del agua</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 120
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 140
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6BEAEA',
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
  touchableOpacity: {
    borderRadius: 10,
    overflow: 'scroll',
  }
});