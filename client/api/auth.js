import axios from 'axios';
// 192.168.1.14
// 172.20.98.155
// 192.168.1.71 (rob)
// Cambiar la ip segun la red local que utilices
const api = "http://192.168.1.7:3000/api";

export const regis = async (User) => axios.post(`${api}/registrarse`, User);
export const login= async(User)=> axios.post(`${api}/login`, User)
export const verifyTokenRequest=() => axios.get(`/verify`)

