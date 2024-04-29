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
            res.status(201).json({ message: 'Flujo guardada correctamente', flujo });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al guardar los datos del Flujo' });
    }
}






exports.MostrarFlujo = async(req, res) => {
    try{
        const flujo= await Flujo.find().sort({ $natural: -1 })
        res.json(flujo);
    }catch(error){
        console.error('Error al obtener registros de flujo de la base de datos', error);
        res.status(500).json({ message: 'Error al obtener registros de la base de datos en MostrarFlujo' });
    }
   
}



exports.MostrarUltimoFlujo = async (req, res) => {
    try {
        const ultimoFlujo = await Flujo.findOne().sort({ $natural: -1 }).select('mlSalidos').limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
        if (!ultimoFlujo) {
            return res.status(404).json({ message: "No se encontraron datos del Flujo" });
        }
        res.json(ultimoFlujo.mlSalidos); // Devuelve solo el valor de 'ml Salidos' del último documento
    } catch (error) {
        console.error("Error al obtener el último valor del Flujo:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
