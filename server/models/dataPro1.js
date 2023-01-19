const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Data = new Schema({
    input: {
      type:String
    },
    output:{
      type:String
    },
    rank:{
      type:Number
    },
    comment:{
      type:String
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
})




module.exports = mongoose.model('Data1',Data);
