import React, { createContext, useState, useEffect } from 'react';
import { Client } from "paho-mqtt";

// Conexion al broker
const client = new Client(
    "broker.hivemq.com",
    Number(8000),
    `sensoresintegradora ${parseInt(Math.random() * 100)}`
  );
  
// Crear el contexto
const BrokerContext = createContext();

// Crear el proveedor del contexto
export const BrokerProvider = ({ children }) => {
  const [calidad, setCalidad] = useState(0);

  // Funcion para leer los datos desde el topic
  function onMessage(message) {
    if (message.destinationName === "/Integradora/Calidad") {
      // Guardar en variable el dato de caracter numerico en una variable
      const receivedValue = parseInt(message.payloadString);
      // Actualizar el valor del Calidad del estado 
      setCalidad(receivedValue);
      console.log(`Valor Calidad del Agua: ${receivedValue}`);
      agregarTBaDB(receivedValue)
    }
  }

  // UseEffect para comprobar conexion al broker y subcripcion al topic
  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Conectado al broker!");
        client.subscribe("/Integradora/Calidad");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Fallo la conexion al broker!");
      }
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  // funcion para mandar los datos a la api
  async function agregarTBaDB(nuevaCalidad) {
    try {
      console.log("dato en la funcion",nuevaCalidad)
      // Enviar los datos a la api
      const response = await fetch('http://192.168.1.7:3000/api/agregarCalidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nivel_turbidez: nuevaCalidad,
          status: true,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Calidad guardado correctamente en la base de datos', data.Calidad);
      } else {
        console.error('Error al guardar en la base de datos', data.message);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al servidor', error);
    }
  }

  // Pasar el estado y las funciones a los hijos a través del contexto
  return (
    <BrokerContext.Provider value={{ calidad }}>
      {children}
    </BrokerContext.Provider>
  );
};

export default BrokerContext;
