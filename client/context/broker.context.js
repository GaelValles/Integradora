import React, { createContext, useContext, useState, useEffect } from 'react';
import { regis, login, verifyTokenRequest, getUserRequest } from "../api/auth";
import { Client } from "paho-mqtt";
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

var api = "http://192.168.1.22:3000/api"; // Corregir la dirección del servidor API

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
    const [historialFlujo, setHistorialFlujo]=useState([]);
    const [historialCalidad,setHistorialCalidad]=useState([]);
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
                    // TRAER EL HISTORIAL DE FLUJO
                    try {
                        const responseHistorialCalidad = await axios.get(`${api}/MostrarCalidad`);
                        setHistorialCalidad(responseHistorialCalidad.data);
                    } catch (error) {
                        console.error("Error Mostrar Historial del Flujo:", error);
                    }
                    // Establecer los estados con los datos más recientes

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
            
            signup,
            signin,
            logout,
            User,
            isAuth,
            historialPh,
            historialFlujo,
            historialCalidad,
            loading, nivelPh, nivelFlujo, nivelTurbidez
        }}>
            {children}
        </BrokerContext.Provider>
    );
};

export default BrokerContext;

