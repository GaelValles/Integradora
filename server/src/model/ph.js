const mongoose = require('mongoose');
const { DateTime } = require('luxon');


const PhSchema = new mongoose.Schema({
    fecha:{
        type:Date,
    },
    nivel_ph:{
        type:Number,
        require:true
    },
    estado:{
        type:String,
        require:true
    }
})

// PhSchema.virtual('formattedFecha').get(function () {
//     const fechaActual = DateTime.now().setZone('America/Mexico_City');
//     const formatoFecha = fechaActual.toFormat('dd-MM-yyyy HH:mm:ss');
    
//     return formatoFecha;
// });

const Ph = mongoose.model('Ph',PhSchema);

module.exports= {Ph};