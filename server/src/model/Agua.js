const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const { number } = require('prop-types');


const AguasSchema = new mongoose.Schema({
    nombre:{
        Type:String,
    },
    galon:{
        Type:String,
    },
    ph:{
        Type:Number
    },
    // Precio del garrafon Grande
    precioG:{
        Type:Number
    },     
    // Precio del medio Garrafon
    precioMG:{
        Type:Number
    },
    // Precio del Garrafon Pequeño
    precioP:{
        Type:Number
    }

})

const Aguas = mongoose.model('Aguas',AguasSchema);

module.exports= {Aguas};