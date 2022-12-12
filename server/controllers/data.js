const data = require('../models/data')
const controller ={

    // generate complete data
    
addNewData: async(req,res,next)=>{
    const {input,output,comment} = req.body;


    let newData = new Article({
        input,
        output,
        comment
    })
    
    let resData = await newArticle.save();  
    res.json(resData )
},
}

module.exports = controller;