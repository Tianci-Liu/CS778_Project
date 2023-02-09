const Input = require('../models/input')
const controller ={

    // generate input 
    
addNewInput: async(req,res,next)=>{
    const {factsRule,judgeStatement} = req.body;

    let newInput = new Input({
        factsRule,
        judgeStatement
    })

    let resInput = await newInput.save();  
    res.json(resInput)
        
}

}

module.exports = controller;