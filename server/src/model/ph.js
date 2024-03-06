const mongoose = require('mongoose');


const PhSchema = new mongoose.Schema({
    fecha:{
        type:Date,
    },
    nivel:{
        type:Number,
        require:true
    },
    estado:{
        type:String,
        require:true
    }
})

const Ph = mongoose.model('Ph',PhSchema);

module.exports= {Ph};