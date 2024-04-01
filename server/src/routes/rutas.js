const express = require("express");
const controladorUser = require('../controller/controllerUser.js')
const controladorPh = require('../controller/controllerPh.js')
const controladorCalidad = require('../controller/controllerCalidad.js')
const controladorFlujo = require('../controller/controllerFlujo.js')
const router =express.Router();

// Rutas de login y registro
router.post('/registrarse',controladorUser.registrar); //Registrar un nuevo usuario
router.get('/registrarse',controladorUser.Mostrarusuario); //Ruta para mostrar los registros de usuarios

router.post('/login',controladorUser.login)

// Rutas de sensores
router.post('/agregarPh',controladorPh.AgregarPh); //Registrar nivel de pH
router.get('/agregarPh',controladorPh.MostrarPh); //Mostrar Registros de nivel de pH
router.get('/UltimoPh',controladorPh.MostrarUltimoPH); //Mostrar Registros de nivel de pH


// Funcion para los datos de calidad/Turbidez
router.post('/agregarCalidad',controladorCalidad.AgregarCalidad) //Registrar datos de Calidad de agua
router.get('/agregarCalidad',controladorCalidad.MostrarCalidad) //Mostrar datos de calidad de agua
router.get('/UltimaTurbidez',controladorCalidad.MostrarUltimaTurbidez) //Mostrar ultimo dato de flujo en la base de datos

router.post('/agregarFlujo',controladorFlujo.AgregarFlujo) //Registrar datos a de Flujo
router.get('/agregarFlujo',controladorFlujo.MostrarFlujo) //Mostar datos de flujo
router.get('/UltimoFlujo',controladorFlujo.MostrarUltimoFlujo) //Mostrar ultimo dato de flujo en la base de datos

module.exports = router;
