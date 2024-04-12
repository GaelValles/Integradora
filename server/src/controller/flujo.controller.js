const { Flujo } = require("../model/flujo");

// Funcion para agregar datos del flujo a la base de datos recibiendo los datos desde el broker
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

// exports.MostrarUltimoFlujo = async (req, res) => {
//     try {
//         const ultimoFlujo = await Flujo.findOne().sort({ $natural: -1 }).limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
//         if (!ultimoFlujo) {
//             return res.status(404).json({ message: "No se encontraron datos del Flujo" });
//         }
//         res.json(ultimoFlujo); 
//     } catch (error) {
//         console.error("Error al obtener el último valor del Flujo:", error);
//         res.status(500).json({ message: "Error del servidor" });
//     }
// };


exports.MostrarUltimoFlujo = async (req, res) => {
    try {
        const ultimoFlujo = await Flujo.findOne().sort({ $natural: -1 }).select('mlSalidos').limit(1); // Busca el último dato y selecciona solo el campo 'nivel_ph'
        if (!ultimoFlujo) {
            return res.status(404).json({ message: "No se encontraron datos del Flujo" });
        }
        res.json(ultimoFlujo.mlSalidos); // Devuelve solo el valor de 'ml Salidos' del último dato
    } catch (error) {
        console.error("Error al obtener el último valor del Flujo:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};


exports.MostrarFlujo = async (req, res) => {
    try {
        const mostrarFlujo = await Flujo.find();
        if (mostrarFlujo.length === 0) {
            return res.status(404).json({ message: "No se encontraron datos de pH" });
        }
        res.json(mostrarFlujo); // Devuelve los últimos registros de pH
    } catch (error) {
        console.error("Error al obtener los últimos valores de pH:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
