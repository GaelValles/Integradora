import axios from 'axios';

// Cambiar la ip segun la red local que utilices
const api = "http://192.168.1.14:3000/api";

export const regis = async (User) => axios.post(`${api}/registrarse`, User);
