import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Principal() {
  const handleBoxClick = (boxNumber) => {
    console.log(`caja ${boxNumber} presionada`);
    // Aquí puedes agregar lógica adicional según el recuadro que se haya clickeado
  };

  // const navigation = useNavigation();

  // // Ruta para enviar a Login
  // const RutaPh = () => {
  //   navigation.navigate('Ph'); // Navegar a la pantalla de creación de cuenta
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del dia</Text>
      <TouchableOpacity onPress={() => handleBoxClick(1)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>7.1</Text>
          </View>
          <View style={styles.boxOut}>
            {/* <Image
              style={styles.tinyLogo}
              source={require('./assets/iconos/phIcono.png')}
            /> */}
          </View>
          <Text style={styles.boxText}>Nivel de Ph del agua</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBoxClick(2)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>$340</Text>
          </View>
          <View style={styles.boxOut}>

          </View>
          <Text style={styles.boxText}>Total de ventas</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBoxClick(3)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>2.300L</Text>
          </View>
          <View style={styles.boxOut}>

          </View>
          <Text style={styles.boxText}>Flujo del agua</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBoxClick(4)}>
        <View style={styles.box}>
          <View style={styles.boxEnter}>
            <Text style={styles.boxEnterText}>5.2</Text>
          </View>
          <View style={styles.boxOut}>

          </View>
          <Text style={styles.boxText}>Dureza del agua</Text>
        </View>
      </TouchableOpacity>
    
    </View>
    
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 260,
    alignContent:'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6BEAEA',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    width: 70,
    height: 50,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 20
  },
  boxEnterText: {
    fontSize: 20,
    fontWeight: '700'
  },
  tinyLogo: {
    width: 70
  }
});