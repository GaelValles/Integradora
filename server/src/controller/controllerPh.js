const {Ph} = require('../model/ph.js')


 exports.AgregarPh =async(req,res)=>{
    try {
        // Requerir los datos de PH
        const { nivel,estado} = req.body;
        // Crear el modelo de datos para el PH

        if(nivel==''||estado==''){
            res.status(500).json({ message: 'Se requieren parametros' });
        }else{
            const ph = new Ph({
                fecha : new Date(),
                nivel,
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
 exports.MostrarPh= async(req,res)=>{
    const ph= await Ph.find()
    res.json(ph)
}