import axios from 'axios';

// Cambiar la IP según la red local que utilices
const api = "http://192.168.1.22:3000/api";

// Configurar Axios para que siempre incluya cookies
axios.defaults.withCredentials = true;

// Funciones para interactuar con el servidor
export const regis = async (user) => axios.post(`${api}/registrarse`, user);
export const login = async (user) => axios.post(`${api}/login`, user);
export const perfil = async () => axios.get(`${api}/perfil`);
export const verifyTokenRequest = () => axios.get(`${api}/verify`);
export const agregarVenta = (user)=> axios.post(`${api}/AgregarVenta`,user)