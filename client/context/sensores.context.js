import React, { createContext, useContext, useState, useEffect } from 'react';

import { Client } from "paho-mqtt";
import axios from 'axios';
const SensorContext = createContext();


var api = "http://192.168.1.22:3000/api"; // Corregir la dirección del servidor API

export const SensorProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [calidad, setCalidad] = useState(0);
    const [flujo, setFlujo] = useState(0);
    const [Ph, setPh] = useState(0);
// Funcion para leer los datos desde el topic segun lleguen los datos
function onMessage(message) {
    const topic = message.destinationName;
    const payload = parseInt(message.payloadString);

    if (topic === "/Integradora/Calidad") {
        setCalidad(payload);
        console.log(`Valor Calidad del Agua: ${payload}`);
        agregarTBaDB(payload);
    } else if (topic === "/Integradora/Flujo") {
        setFlujo(payload);
        console.log(`Valor Flujo: ${payload}`);
        enviarFlujoaDB(payload);
    } else if (topic === "/Integradora/Ph") {
        setPh(payload);
        console.log(`Valor Ph del Agua: ${payload}`);
        agregarPhaDB(payload);
    } else {
        console.log("Mensaje recibido en un topic no reconocido:", topic);
    }
}
// UseEffect para comprobar conexion al broker y subcripcion al topic
useEffect(() => {
    const mqttClient = new Client(
        "broker.hivemq.com",
        Number(8000),
        `sensoresintegradora ${parseInt(Math.random() * 100)}`
    );

    mqttClient.connect({
        onSuccess: () => {
            console.log("Conectado al broker!");
            mqttClient.subscribe("/Integradora/Calidad");
            mqttClient.subscribe("/Integradora/Flujo");
            mqttClient.subscribe("/Integradora/Ph");
            mqttClient.onMessageArrived = onMessage;
            setClient(mqttClient); // Establecer el cliente MQTT una vez conectado
        },
        onFailure: () => {
            console.log("Fallo la conexión al broker!");
        }
    });

    return () => {
        if (mqttClient.isConnected()) {
            mqttClient.disconnect();
        }
    };
}, []);

// funcion para mandar los datos de la calidad a DB
async function agregarTBaDB(nuevaCalidad) {
    try {
        console.log("dato en la funcion", nuevaCalidad)
        nuevaCalidad<=0 ? nuevaCalidad=1: nuevaCalidad=nuevaCalidad
        nuevaCalidad > 2 ? estado = false : estado = true;
        // Enviar los datos a la api
        const response = await fetch(`${api}/agregarCalidad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nivel_turbidez: nuevaCalidad,
                status: estado,
            }),
        });

        const data = await response.json();

        if (response.status === 201) {
            console.log('Calidad guardado correctamente en la base de datos', data.Calidad);
        } else {
            console.error('Error al Enviar los datos Calidad en la base de datos', data.message);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud al servidor dela Calidad', error);
    }
}
// Funcion par enviar dato del flujo a la base de datos
let ultimoEnvio = 0;

async function enviarFlujoaDB(nuevoFlujo) {
try {
    const tiempoActual = Date.now();

    // Verificar si ha pasado menos de 10 segundos desde el último envío
    if (tiempoActual - ultimoEnvio < 10000) {
        console.log("Debe esperar al menos 10 segundos entre cada envío.");
        return;
    }

    // Enviar los datos a la API
    let estado = 'Activo';
    const response = await fetch(`${api}/agregarFlujo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mlSalidos: nuevoFlujo,
            estado: estado,
            FlujoAcumulado: 1200,
        }),
    });

    const data = await response.json();

    if (response.status === 201) {
        console.log('Flujo guardado correctamente en la base de datos', data.Flujo);
        // Actualizar el tiempo del último envío
        ultimoEnvio = tiempoActual;
    } else {
        console.error('Error al guardar Flujo en la base de datos', data.message);
    }
} catch (error) {
    console.error('Error al enviar la solicitud al servidor Flujo', error);
}
}


async function agregarPhaDB(nuevoPh) {
    try {

        let estado;
        // condicion para determinar el estado del ph segun el valor recibido
        if (nuevoPh < 5) {
            estado = 'Niveles Muy bajos';
        } else if (nuevoPh >= 5 && nuevoPh <6.5) {
            estado = 'Nivel Bajo';
        } else if (nuevoPh >= 6.5 && nuevoPh <= 7.5) {
            estado = 'Purificada';
        } else if (nuevoPh >7.5 && nuevoPh <= 9) {
            estado = 'Alcalina';
        } else {
            estado = 'Niveles altos';
        }
        // Enviar los datos a la api
        const response = await fetch(`${api}/agregarPh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nivel_ph: nuevoPh,
                estado: estado,
            }),
        });

        const data = await response.json();

        if (response.status === 201) {
            console.log('PH guardado correctamente en la base de datos', data.ph);
        } else {
            console.error('Error al guardar el PH en la base de datos', data.message);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud al servidor PH', error);
    }
}

return (
    <SensorContext.Provider value={{
       calidad, flujo, Ph, client
    }}>
        {children}
    </SensorContext.Provider>
);
};

export default SensorContext;
