// Modificado por Adrian

import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState } from "react";
import TopBar from "../components/TopBar";
export default function NuevosProductos() {
  const [garrafonPurificada, setgarrafonPurificada] = useState(false);
  const [MedioGarrafonPurificada, setMedioGarrafonPurificada] = useState(false);
  const [pequeñoGarrafonPurificada, setpequeñoGarrafonPurificada] = useState(false);
  const [garrafonAlcalina, setgarrafonAlcalina] = useState(false);
  const [MedioGarrafonAlcalina, setMedioGarrafonAlcalina] = useState(false);
  const [pequeñoGarrafonAlcal, setpequeñoGarrafonAlcal] = useState(false);

  const handleCheckBoxClick = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setgarrafonPurificada(!garrafonPurificada);
        break;
      case 2:
        setMedioGarrafonPurificada(!MedioGarrafonPurificada);
        break;
      case 3:
        setpequeñoGarrafonPurificada(!pequeñoGarrafonPurificada);
        break;
      case 4:
        setgarrafonAlcalina(!garrafonAlcalina);
        break;
      case 5:
        setMedioGarrafonAlcalina(!MedioGarrafonAlcalina);
        break;
      case 6:
        setpequeñoGarrafonAlcal(!pequeñoGarrafonAlcal);
        break;
      default:
        break;
    }
  };
  const guardarCambios = async () => {
    const data = {
      purificada: {
        garrafon: garrafonPurificada ? '$30.00' : null,
        medioGarrafon: MedioGarrafonPurificada ? '$20.00' : null,
        galon: pequeñoGarrafonPurificada ? '$10.00' : null
      },
      alcalina: {
        garrafon: garrafonAlcalina ? '$35.00' : null,
        medioGarrafon: MedioGarrafonAlcalina ? '$25.00' : null,
        galon: pequeñoGarrafonAlcal ? '$15.00' : null
      }
    };
  
    try {
      const response = await fetch('URL_DEL_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
  
      // Aquí puedes manejar la respuesta del servidor si es necesario
      console.log('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
    }
  };
  

  return (
        // View para agregar el AppBar
    <View style={styles.mainContainer}>
    <TopBar />
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Editar precios</Text>
        <TouchableOpacity activeOpacity={.8}>
          <View style={styles.buttonBox}>
            <Text>Guardar</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={styles.text}>Cantidad</Text>
          <Text style={styles.textSub}>Purificada</Text>
        </View>
        <View style={styles.flexBox}>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$30.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(1)}
                isChecked={garrafonPurificada}
              />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$20.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(2)}
                isChecked={MedioGarrafonPurificada}
              />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$10.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Galon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(3)}
                isChecked={pequeñoGarrafonPurificada}
              />
            </View>
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textSub}>Alcalina</Text>
        </View>
        <View style={styles.flexBox}>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$35.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(4)}
                isChecked={garrafonAlcalina}
              />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$25.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(5)}
                isChecked={MedioGarrafonAlcalina}
              />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxCount}>
              <TextInput style={styles.textCount} placeholder="$15.00"></TextInput>
            </View>
            <View style={styles.textLabel}>
              <Text>Galon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(6)}
                isChecked={pequeñoGarrafonAlcal}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    flexDirection: 'column',
    },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center'
  },
  buttonBox: {
    backgroundColor: '#16C1C8',
    width: 120,
    height: 40,
    marginTop: 30,
    left: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  textSub: {
    marginTop: 15,
    marginBottom: 30,
    color: '#16C1C8',
    fontWeight: '900'
  },
  flexBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    marginBottom: 20
  },
  box: {
    backgroundColor: '#16C1C8',
    height: 170,
    flex: 1,
    margin: 3,
    borderRadius: 20
  },
  boxCount: {
    backgroundColor: '#fff',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textCount: {
    fontSize: 25,
  },
  textLabel: {
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationColor: '#FF0000'
  },
  check: {
    backgroundColor: '#D9D9D9',
    marginTop: 50,
    left: 40,
    height: 30,
    width: 30,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    alignItems: 'center'
  },
  checkBox: {
    backgroundColor: '#fff'
  }
})  