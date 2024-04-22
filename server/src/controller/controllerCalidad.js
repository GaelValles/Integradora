const { Turbidez } = require("../model/calidad")

// Enviar datos de calidad de agua a la Base de datos
exports.AgregarCalidad = async (req, res) => {
    try{
        const{nivel_turbidez,status}= req.body;


        if (nivel_turbidez == '') {
            res.status(500).json({ message: 'Se requieren parametros' });
        } else {
            const calidad=new Turbidez({
                fecha:new Date(),
                nivel_turbidez:nivel_turbidez,
                status
            });    
            console.log(calidad);
            await calidad.save();
            res.status(201).json({ message: 'Turbidez guardada correctamente', calidad });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al guardar los datos de la calidad' });
    }
}


// Mostrar los registros de la base de datos

exports.MostrarCalidad=async(req,res)=>{
    try{
        const calidad= await Turbidez.find().sort({ $natural: -1 });
        res.json(calidad);
    }catch(error){
        console.error('Error al obtener registros de Calidad de la base de datos', error);
        res.status(500).json({ message: 'Error al obtener registros de la base de datos MostrarCalidad' });
    }
   
}

exports.MostrarUltimaTurbidez = async (req, res) => {
    try {
        const ultimaTurbidez = await Turbidez.findOne().sort({ $natural: -1 }).select('nivel_turbidez').limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
        if (!ultimaTurbidez) {
            return res.status(404).json({ message: "No se encontraron datos de la Turbidez" });
        }
        res.json(ultimaTurbidez.nivel_turbidez); // Devuelve solo el valor de 'nivel_turbidez' del último documento
    } catch (error) {
        console.error("Error al obtener el último valor de la Turbidez:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};