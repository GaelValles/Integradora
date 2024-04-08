const mongoose = require('mongoose');
const { DateTime } = require('luxon');


const VentasSchema = new mongoose.Schema({
    nombre:{
        Type:String,
    },
    totalGalones:{
        Type:Number
    },
    total:{
        Type:Number
    },
    fechaCerrar:{
        Type:Date,
    },
    fechaApertura:{
        Type:Date,
    }
})

const Ventas = mongoose.model('Ventas',VentasSchema);

module.exports= {Ventas};