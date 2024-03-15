import axios from 'axios';

const api = "http://localhost:3000/api";

export const regis = async (User) => axios.post(`${api}/registrarse`, User);
