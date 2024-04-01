import React, { createContext, useState, useEffect } from 'react';
import { Client } from "paho-mqtt";

const api = "http://192.168.1.11:3000/api";
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
        } else if (topic === "/Integradora/ph") {
            setPh(payload);
            console.log(`Valor Ph del Agua: ${payload}`);
            agregarPhaDB(payload);
        } else {
            console.log("Mensaje recibido en un topic no reconocido:", topic);
        }
    }
    // UseEffect para comprobar conexion al broker y subcripcion al topic
    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log("Conectado al broker!");
                client.subscribe("/Integradora/Calidad");
                client.subscribe("/Integradora/Flujo");
                client.subscribe("/Integradora/ph");
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

    // funcion para mandar los datos de la calidad a DB
    async function agregarTBaDB(nuevaCalidad) {
        try {
            console.log("dato en la funcion", nuevaCalidad)
            // Enviar los datos a la api
            const response = await fetch(`${api}/agregarCalidad`, {
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

    // Funcion par enviar dato del flujo a la base de datos
    async function enviarFlujoaDB(nuevoFlujo) {
        try {
            console.log("dato en la funcion", nuevoFlujo)
            // Enviar los datos a la api
            let estado = 'Activo'
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
            } else {
                console.error('Error al guardar en la base de datos', data.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud al servidor', error);
        }
    }


    async function agregarPhaDB(nuevoPh) {
        try {

            let estado;
            // condicion para determinar el estado del ph segun el valor recibido
            if (nuevoPh < 0) {
                estado = 'No';
            } else if (nuevoPh > 0 && nuevoPh < 5) {
                estado = 'Ácido';
            } else if (nuevoPh >= 5 && nuevoPh <= 7) {
                estado = 'Neutro';
            } else {
                estado = 'Alcalina';
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
            console.error('Error al enviar la solicitud al servidor', error);
        }
    }
    // Pasar el estado y las funciones a los hijos a través del contexto
    return (
        <BrokerContext.Provider value={{ calidad, flujo, Ph }}>
            {children}
        </BrokerContext.Provider>
    );
};

export default BrokerContext;
