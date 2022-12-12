const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Input = new Schema({
    factsRule: {
        type:String,
        required:true
    },
    judgeStatement:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('Input',Input);