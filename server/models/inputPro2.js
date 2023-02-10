const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Input = new Schema({
    content:{
        type:String,
        required:true
    },
})


module.exports = mongoose.model('Input2',Input);
