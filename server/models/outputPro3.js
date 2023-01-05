const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Output = new Schema({
    content:{
        type:String,
    }
})



module.exports = mongoose.model('Output3',Output);
