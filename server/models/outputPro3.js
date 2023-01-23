const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Output = new Schema({
    trueProbability:{
      type:Number
    },
    falseProbability:{
        type:Number
    },
    label:{
        type:String,
    }
})



module.exports = mongoose.model('Output3',Output);
