const Comment = require('../models/comment')
const controller = {

    addComment: async(req,res)=>{
        const {inputID,content} = req.body;
        let newComment = new Comment({
            inputID,
            content
        })
        await newComment.save();
        res.json('success')
    
    },
    /*
    getAllComment: async (req,res)=>{
            const {inputID} = req.body;
            console.log(inputID)
            let resComment =await  Comment.find({inputID:inputID})
              
            res.json(resComment)

    }*/
}

module.exports = controller;