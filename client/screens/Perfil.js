import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import { useAuth } from "../context/broker.context";

const Perfil = () => {
  const { isAuth, User } = useAuth();

  console.log(User);
  return (
    <View style={styles.mainContainer}>
        {/* Importar el TopBar */}
        <TopBar />
        {/* Seccion para colocar la imagen, nombre del usuario y rol */}
        <View style={styles.boxProfile}>
          {/*  */}
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/user-perfil.jpg')} style={styles.imagePerfil} ></Image>
            <Text style={{fontSize:25, fontWeight:'bold', padding:10}}>{User ? User.nombres : 'Usuario'}</Text>
            <Text style={{fontSize:15, fontWeight:'bold', color:'grey'}}>Rol</Text>
          </View>
        </View>

        <View style={styles.container}>
          {/* Caja para coloar los datos del usuario */}
          <View style={styles.box}>
            
              <Text style={styles.label}>Correo electrónico:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={User.correo}
              editable={false}
            />
                <Text style={styles.label}>Telefono:</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              value={User.telefono}
              editable={false}
            />
            {/* Boton para cerrar sesion */}
            {isAuth && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          )}
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
  boxProfile: {
    width: '100%',
    height: 110,
    backgroundColor: '#16C1C8',
   borderBottomEndRadius:100,
   borderBottomLeftRadius:100,
  },
  image: {
    width: 30,
    height: 30
  },
  imagePerfil: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth:3,
    borderColor:'#fff',
    marginTop: 40
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#00BCC5',
    paddingVertical: 5,
    marginBottom: 20,
  },

  editButton: {
    backgroundColor: '#00BCC5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Perfil;