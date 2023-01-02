const controller = {
    addData: async(req,res)=>{
        res.json('project2: new data')
    },
    changeData: async(req,res)=>{
        res.json('project2: edit data')
    },
    getList: async(req,res)=>{
        res.json('project2: list data')
    },
    getDataById: async(req,res)=>{
        const { id } = req.params;
        res.json('project2: get data by id ' + id)
    },
    getDataByCondition: async(req,res)=>{
        const item = req.body;
        res.json('project2: get data by condition')
    },

}

module.exports = controller;
