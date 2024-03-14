const express = require("express");
const login = require('../controller/login.js')
const controladorUser = require('../controller/controllerUser.js')
const controladorPh = require('../controller/controllerPh.js')
const controladorCalidad = require('../controller/controllerCalidad.js')
const controladorFlujo = require('../controller/controllerFlujo.js')
const router =express.Router();

// Rutas pora modificaciones
router.post('/registrarse',controladorUser.registrar); //Registrar un nuevo usuario
router.get('/registrarse',controladorUser.Mostrarusuario); //Ruta para mostrar los registros de usuarios

router.post('/agregarPh',controladorPh.AgregarPh); //Registrar nivel de pH
router.get('/agregarPh',controladorPh.MostrarPh); //Mostrar Registros de nivel de pH


router.post('/agregarCalidad',controladorCalidad.AgregarCalidad) //Registrar datos de Calidad de agua
router.get('/agregarCalidad',controladorCalidad.MostrarCalidad) //Mostrar datos de calidad de agua

router.post('/agregarFlujo',controladorFlujo.AgregarFlujo) //Registrar datos a de Flujo
router.get('/agregarFlujo',controladorFlujo.MostrarFlujo) //Mostar datos de flujo


module.exports = router;
