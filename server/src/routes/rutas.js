const express = require("express");
const controladorUser = require('../controller/controllerUser.js')
const controladorPh = require('../controller/controllerPh.js')
const controladorCalidad = require('../controller/controllerCalidad.js')
const controladorFlujo = require('../controller/controllerFlujo.js')
const controladorVentas= require('../controller/controllerVentas.js')
const controladorAgua = require('../controller/controllerAgua.js')
const router =express.Router();
const { authRequired } = require('../middleware/validarToken.js');

// Rutas de login y registro
router.post('/registrarse',controladorUser.registrar); //Registrar un nuevo usuario
router.get('/registrarse',controladorUser.Mostrarusuario); //Ruta para mostrar los registros de usuarios
router.post('/logout',controladorUser.logout);

router.post('/login',controladorUser.login)
router.get('/verify', controladorUser.verifyToken);
router.get('/perfil', authRequired, controladorUser.perfil);

// Rutas de sensores
router.post('/agregarPh',controladorPh.AgregarPh); //Registrar nivel de pH
router.get('/MostrarPh',controladorPh.MostrarPh); //Mostrar Registros de nivel de pH
router.get('/UltimoPh',controladorPh.MostrarUltimoPH); //Mostrar Registros de nivel de pH


// Funcion para los datos de calidad/Turbidez
router.post('/agregarCalidad',controladorCalidad.AgregarCalidad) //Registrar datos de Calidad de agua
router.get('/MostrarCalidad',controladorCalidad.MostrarCalidad) //Mostrar datos de calidad de agua
router.get('/UltimaTurbidez',controladorCalidad.MostrarUltimaTurbidez) //Mostrar ultimo dato de flujo en la base de datos

router.post('/agregarFlujo',controladorFlujo.AgregarFlujo) //Registrar datos a de Flujo
router.get('/MostrarFlujo',controladorFlujo.MostrarFlujo) //Mostar datos de flujo
router.get('/UltimoFlujo',controladorFlujo.MostrarUltimoFlujo) //Mostrar ultimo dato de flujo en la base de datos


// VENTAS Y AGUA
router.post('/AgregarVenta',controladorVentas.agregarVenta)
router.post('/agregarAgua',controladorAgua.agregarAgua)

module.exports = router;
