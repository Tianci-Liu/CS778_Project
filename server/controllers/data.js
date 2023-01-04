const data = require('../models/dataPro3')
const controller ={

    // generate complete data
    
addNewData: async(req,res,next)=>{
    const {input,output,comment} = req.body;


    let newData = new Article({
        input,
        output,
        comment
    })
    
    let resData = await newData.save();  
    res.json(resData )
},
}

module.exports = controller;