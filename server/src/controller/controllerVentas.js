const {Ventas} = require('../model/ventas');

exports.agregarVenta = async (req, res) => {
    try {
        const { nombre, totalGalones, total } = req.body;
        if (!nombre || !totalGalones || !total) {
            return res.status(400).json({ message: 'Faltan parámetros en la solicitud' });
        }

        const venta = new Ventas({
            nombre,
            totalGalones,
            total,
            fechaCerrar: new Date(),
            fechaApertura: new Date(),
        });

        await venta.save();
        res.status(201).json({ message: 'Venta guardada correctamente', venta });
    } catch (error) {
        console.error('Error al guardar los datos de la venta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
