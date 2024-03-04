// server.js
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/conexiondb')
connectDB();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`El servidor Express está escuchando en el puerto ${port}`);
});
