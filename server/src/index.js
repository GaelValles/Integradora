// server.js
const express = require("express");
const connectDB = require('./config/conexiondb')
const rutas = require('./routes/rutas.js')
const cors = require("cors");


const app = express();

connectDB();

// middleware
app.use(cors()); //middleware para permitir entrada desde Frontend
app.use(express.json());
app.use('/api', rutas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` conectado en el puerto ${PORT}`);
});
// Comporbar Conexion
console.log('Servidor Up');
