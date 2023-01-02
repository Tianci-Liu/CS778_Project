const controller = {
    addData: async(req,res)=>{
        res.json('project1: new data')
    },
    changeData: async(req,res)=>{
        res.json('project1: edit data')
    },
    getList: async(req,res)=>{
        res.json('project1: list data')
    },
    getDataById: async(req,res)=>{
        const { id } = req.params;
        res.json('project1: get data by id ' + id)
    },
    getDataByCondition: async(req,res)=>{
        const item = req.body;
        res.json('project1: get data by condition')
    },

}

module.exports = controller;
