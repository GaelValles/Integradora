// Modificado por Adrian

import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState } from "react";

export default function RegistroProductos() {

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
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Editar precios</Text>
        <View style={styles.viewInput}>
          <Text style={styles.textIn}>Nombre:</Text>
          <TextInput placeholder="Ingresa el nombre del agua" style={styles.textInput} />
        </View>
        <View>
          <Text>Aqui va la grafica</Text>
        </View>
        <View style={styles.viewInputPh}>
          <Text style={styles.textPh}>Ph del agua:</Text>
          <TextInput placeholder="9.0" style={styles.textInputPh} />
        </View>
        <View style={styles.flexBox}>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            <View style={styles.textLabel}>
              <Text>Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(1)}
                isChecked={isChecked1}
              />
            </View>
          </View>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            <View style={styles.textLabel}>
              <Text>Medio Garrafon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(2)}
                isChecked={isChecked2}
              />
            </View>
          </View>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={.3} style={styles.touchableOpacity}>
              <Text style={styles.arrow}> ↑ </Text>
            </TouchableOpacity>
            <View style={styles.boxCount}>
              <Text style={styles.textCount}>23</Text>
            </View>
            <View style={styles.textLabel}>
              <Text>Galon</Text>
            </View>
            <View style={styles.check}>
              <CheckBox
                style={styles.checkBox}
                onClick={() => handleCheckBoxClick(3)}
                isChecked={isChecked3}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 110,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center'
  },
  viewInput: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#16C1C8',
    marginTop: 30,
    left: 35,
    alignItems: 'center',
    padding: 6,
    justifyContent: 'center',
    width: 300,
    height: 40,
    borderRadius: 30,
    paddingTop: 7
  },
  textInput: {
    backgroundColor: '#fff',
    height: 25,
    borderRadius: 10,
    width: 200,
    marginLeft: 10,
    padding: 5
  },
  textIn: {
    fontWeight: '600'
  },
  viewInputPh: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#16C1C8',
    marginTop: 30,
    left: 85,
    alignItems: 'center',
    padding: 6,
    justifyContent: 'center',
    width: 200,
    height: 40,
    borderRadius: 30,
    paddingTop: 7
  },
  textInputPh: {
    backgroundColor: '#fff',
    height: 25,
    borderRadius: 10,
    width: 100,
    marginLeft: 10,
    padding: 5
  },
  textPh: {
    fontWeight: '600'
  },
  flexBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    marginBottom: 30
  },
  box: {
    backgroundColor: '#16C1C8',
    height: '50%',
    width: 60,
    flex: 1,
    margin: 3,
    borderRadius: 20
  },
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
  check: {
    backgroundColor: '#D9D9D9',
    top: 32,
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