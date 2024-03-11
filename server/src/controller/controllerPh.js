const { Ph } = require('../model/ph.js')
const { DateTime } = require('luxon');


exports.AgregarPh = async (req, res) => {
    try {
        // Requerir los datos de PH
        const { nivel_ph, estado } = req.body;

        //cambiar el formato de fecha
        // const fechaActual = DateTime.now().setZone('America/Mexico_City');
        // const formatoFecha = fechaActual.toFormat('dd-MM-yyyy HH:mm:ss');
        // console.log(formatoFecha)

        if (nivel_ph == '' || estado == '') {
            res.status(500).json({ message: 'Se requieren parametros' });
        } else {
            const ph = new Ph({
                fecha: new Date(),
                nivel_ph,
                estado
            });
            console.log(ph);
            await ph.save();
            res.status(201).json({ message: 'PH guardado correctamente', ph });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el Ph' });
    }
}

// Mostrar Registros
exports.MostrarPh = async (req, res) => {
    try {
        const ph = await Ph.find();
        res.json(ph);
    } catch (error) {
        console.error('Error al obtener registros de la base de datos', error);
        res.status(500).json({ message: 'Error al obtener registros de la base de datos' });
    }
}