const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Comment = new Schema({
    inputID:{
        type:ObjectId,
        required:true
    },
    rank:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        reqired:true,
    },
    datetime: {
        type: Date,
        default: Date.now()
        
    }
})

Comment.pre('save', async function(next){

    }
)
   
module.exports= mongoose.model('Comment',Comment)