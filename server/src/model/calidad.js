const mongoose = require("mongoose");


const turbidez= new mongoose.Schema({
    fecha:{
        type:Date,
    },
    nivel_turbidez:{
        type:Number ,
        require:true,
    },
    status:{
        type:Boolean,
    }
},
);

const Turbidez = mongoose.model('Turbidez',turbidez);


module.exports={Turbidez};

