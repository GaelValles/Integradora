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
       
        const mostrarPh = await Ph.find().sort({ $natural: -1 });
        if (mostrarPh.length === 0) {
            return res.status(404).json({ message: "No se encontraron datos de pH" });
        }
        res.json(mostrarPh); 
    } catch (error) {
        console.error("Error al obtener los últimos valores de pH:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};


exports.MostrarUltimoPH = async (req, res) => {
    try {
        const ultimoPh = await Ph.findOne().sort({ $natural: -1 }).select('nivel_ph').limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
        if (!ultimoPh) {
            return res.status(404).json({ message: "No se encontraron datos de pH" });
        }
        res.json(ultimoPh.nivel_ph); // Devuelve solo el valor de 'nivel_ph' del último documento
    } catch (error) {
        console.error("Error al obtener el último valor de pH:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
