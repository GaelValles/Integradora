const { Turbidez } = require("../model/calidad")

// Enviar datos de calidad de agua a la Base de datos
exports.AgregarCalidad = async (req, res) => {
    try{
        const{nivel_turbidez}= req.body;


        if (nivel_turbidez == '') {
            res.status(500).json({ message: 'Se requieren parametros' });
        } else {
            const calidad=new Turbidez({
                fecha:new Date(),
                nivel_turbidez:nivel_turbidez,
                status:true
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
        const calidad= await Turbidez.find()
        res.json(calidad);
    }catch(error){
        console.error('Error al obtener registros de la base de datos', error);
        res.status(500).json({ message: 'Error al obtener registros de la base de datos' });
    }
   
}