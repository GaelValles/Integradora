import React, { createContext, useContext, useState, useEffect } from 'react';
import { regis, login, verifyTokenRequest, getUserRequest } from "../api/auth";
import { Client } from "paho-mqtt";
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

var api = "http://172.20.102.159:3000/api"; // Corregir la dirección del servidor API

const BrokerContext = createContext();

export const useAuth = () => {
    const context = useContext(BrokerContext)
    if (!context) {
        throw new Error("useAuth deberia estar dentro del provider")
    }
    return context;
}

export const BrokerProvider = ({ children }) => {
    const [historialPh, setHistorialPh] = useState([]);
    const [historialFlujo, setHistorialFlujo]=useState([])
    const [client, setClient] = useState(null);
    const [calidad, setCalidad] = useState(0);
    const [flujo, setFlujo] = useState(0);
    const [Ph, setPh] = useState(0);
    const [nivelPh, setNivelPh] = useState(null);
    const [nivelFlujo, setNivelFlujo] = useState(null);
    const [nivelTurbidez, setNivelTurbidez] = useState(null);
    const [User, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

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
                console.error('Error al Enviar los datos Calidad en la base de datos', data.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud al servidor de la Calidad', error);
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
            console.error('Error al enviar la solicitud al servidor PH', error);
        }
    }

    // Llamar los ultimos datos registrados en la base de datos de cada Dato
    try {
        useEffect(() => {
            // Función para obtener los últimos datos de cada sección

            const obtenerDatos = async () => {
                try {

                    // Hacer solicitudes HTTP para obtener los datos más recientes
                    const datosPh = await axios.get(`${api}/UltimoPh`);
                    const datosFlujo = await axios.get(`${api}/UltimoFlujo`);
                    const datoTurbidez = await axios.get(`${api}/UltimaTurbidez`);
                    // try {
                    //     const response = await axios.get(`${api}/mostrarFlujo`);
                    //     setHistorialFlujo(response.data);
                    // } catch (error) {
                    //     console.error("Error Mostrar Historial del Flujo:", error);
                    // }
                    // Establecer los estados con los datos más recientes
                    // console.log("Ultimo PH:", datosPh.data);

                    // TRAER EL HISTORIAL DEL PH
                    try {
                        const responseHistorialPh = await axios.get(`${api}/MostrarPh`);
                        setHistorialPh(responseHistorialPh.data); //Actualizar UseState con los datos obtenido en la varibale historialPh
                    } catch (error) {
                        console.error("Error Mostrar Historial de Ph:", error);
                    }
                    // TRAER EL HISTORIAL DE FLUJO
                    try {
                        const responseHistorialFlujo = await axios.get(`${api}/MostrarFlujo`);
                        setHistorialFlujo(responseHistorialFlujo.data); //Actualizar UseState con los datos obtenido en la varibale historialPh
                    } catch (error) {
                        console.error("Error Mostrar Historial de Ph:", error);
                    }

                    setNivelPh(datosPh.data);
                    // Datos del flujo
                    // console.log("Ultimo dato de Flujo: ", datosFlujo.data)
                    setNivelFlujo(datosFlujo.data)
                    // Datos del Trubidez
                    // console.log("Ultimo dato de Turbidez: ", datoTurbidez.data)
                    setNivelTurbidez(datoTurbidez.data)
                } catch (error) {
                    console.error("Error al obtener los ultimos datos de la BD:", error);
                }
            };

            obtenerDatos();

            const interval = setInterval(obtenerDatos, 1000);

            return () => clearInterval(interval);
        }, []);
    } catch (error) {
        console.log("Error al llamar los datos de los ultimos Dato", error)
    }   
    // Obtener todos los datos de la base de datos
    const MostrarFlujo = async () => {
       
    };
    const MostrarVentas = async () => {
        try {
            const response = await axios.get(`${api}/Ventas`);
            sethistorialVentas(response.data);
        } catch (error) {
            console.error("Error Mostrar las Ventas:", error);
        }
    };




    const signup = async (user) => {
        try {
            const res = await regis(user);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
            console.log("error al registrar", error.response);
            setErrors(error.response.data)
        }
    };
    const signin = async (user) => {
        try {
            const res = await login(user);
            console.log("datos del logeado", res.data);
            setUser(res.data);
            setIsAuth(true);;
            console.log("set user", User)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    };
    const getUsers = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };
    const logout = () => {
        Cookies.remove("token")
        setIsAuth(false)
        setUser(null)
    }
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])

            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false)
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuth(false)
                    setLoading(false)
                    return;
                }
                setIsAuth(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuth(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    // Pasar el estado y las funciones a los hijos a través del contexto
    return (
        <BrokerContext.Provider value={{
            client,
            signup,
            signin,
            logout,
            User,
            isAuth,
            historialPh,
            historialFlujo,
            loading, calidad, flujo, Ph, nivelPh, nivelFlujo, nivelTurbidez
        }}>
            {children}
        </BrokerContext.Provider>
    );
};

export default BrokerContext;

