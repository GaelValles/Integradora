// server.js
const express = require("express");
const connectDB = require('./config/conexiondb')
const rutas = require('./routes/rutas.js')
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

// middleware
app.use(cors({
    credentials: true,
})); //middleware para permitir entrada desde Frontend
app.use(express.json());
app.use(cookieParser());
app.use('/api', rutas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` conectado en el puerto ${PORT}`);
});
// Comporbar Conexion
console.log('Servidor Up');
