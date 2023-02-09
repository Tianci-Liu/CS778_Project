const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Output = new Schema({
    templateContent:{
        type:String,
    },
    t5Content:{
        type:String,
    }
})



module.exports = mongoose.model('Output2',Output);
