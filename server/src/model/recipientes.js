const mongoose = require("mongoose");

const recipiente= new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
    },
    precio:{
        type:Number,
        require:true,
    },
    capacidad:{
        type:Number,
    },
    tipoAgua:{
        type:String,
    }
})

const Recipiente = mongoose.model('Recipiente',recipiente);

module.exports={Recipiente};