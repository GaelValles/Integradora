const express = require("express");
const controlador = require('../controller/controllerUser.js')
const router =express.Router();

// Rutas pora modificaciones
router.post('/registrarse',controlador.registrar); //Registrar un nuevo usuario
router.get('/registrarse',controlador.Mostrarusuario); //Ruta para mostrar los registros de usuarios



module.exports = router;