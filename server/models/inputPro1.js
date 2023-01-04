const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Input = new Schema({
    x:[{
        text:String,
        key: {type:String}
    }]
})


module.exports = mongoose.model('Input',Input);