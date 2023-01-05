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
      type:String
    },
    comment:{
      type:String
    }
})




module.exports = mongoose.model('Data',Data);