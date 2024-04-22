import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import TopBar from '../components/TopBar';
import { perfil } from '../api/auth';

// Componente de perfil
const Perfil = () => {
  // Estado para el perfil del usuario
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Indica si los datos están cargando
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await perfil(); // Llama a la función para obtener el perfil
        setUserProfile(response.data); // Almacena los datos del perfil
      } catch (error) {
        setError(error.message); // Almacena el mensaje de error
      } finally {
        setIsLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchProfile(); // Llama a la función al montar el componente
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  if (isLoading) {
    return <Text>Cargando...</Text>; // Indicar que está cargando
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Mostrar un mensaje de error
  }

  if (!userProfile) {
    return <Text>No se encontró información del perfil.</Text>; // Si no hay datos
  }

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <View style={styles.boxProfile}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/user-perfil.jpg')} style={styles.imagePerfil} />
          <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
            {userProfile.nombres} {userProfile.apellidos}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
            Rol
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <TextInput
            style={styles.input}
            value={userProfile.correo}
            editable={false}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.input}
            value={userProfile.telefono}
            editable={false}
          />

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
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
  boxProfile: {
    width: '100%',
    height: 110,
    backgroundColor: '#16C1C8',
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
  },
  imagePerfil: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
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
  logoutButton: {
    backgroundColor: '#00BCC5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Perfil;
