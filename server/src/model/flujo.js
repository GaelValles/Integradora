const mongoose = require('mongoose');


const FlujoSchema = new mongoose.Schema({
    fecha:{
        type:Date,
    },
    mlSalidos:{
        type:Number,
    },
    estado:{
        type:String
    }
});

const Flujo = mongoose.model('Flujo', FlujoSchema);

module.exports = {Flujo};