const { Flujo } = require('../model/flujo.js')

// Funcion para agregar datos del flujo a la base de datos
exports.AgregarFlujo = async (req, res) => {
    try{
        const{mlSalidos,estado,FlujoAcumulado}= req.body;


        if (mlSalidos == '') {
            res.status(500).json({ message: 'Se requieren parametros' });
        } else {
            const flujo=new Flujo({
                fecha:new Date(),
                mlSalidos:mlSalidos,
                estado:estado,
                FlujoAcumulado:FlujoAcumulado
            });    
            console.log(flujo);
            await flujo.save();
            res.status(201).json({ message: 'Turbidez guardada correctamente', flujo });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al guardar los datos del Flujo' });
    }
}






exports.MostrarFlujo = async(req, res) => {
    try{
        const flujo= await Flujo.find()
        res.json(flujo);
    }catch(error){
        console.error('Error al obtener registros de la base de datos', error);
        res.status(500).json({ message: 'Error al obtener registros de la base de datos' });
    }
   
}