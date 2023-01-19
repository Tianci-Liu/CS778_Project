const Data=require("../models/dataPro2");
const Input=require("../models/inputPro2");
const Output=require("../models/outputPro2");

const controller = {
    addData: async(req,res)=>{
        try{
            const item = req.body;
            const input = new Input({
                factsRule:item.input.factsRule,
                judgeStatement: item.input.judgeStatement
            });
            let inputReturn
            await input.save(input)
                .then(res => {inputReturn = res;})
            const output = new Output({
                templateContent: item.output.templateContent,
                t5Content: item.output.t5Content
            })
            let outputReturn
            await output.save(output)
                .then(res => {outputReturn = res;})

            const data = new Data ({
                input: inputReturn._id,
                output: outputReturn._id,
                rank: item.rank,
                comment: item.comment
            })

            let dataReturn
            await data.save(data)
                .then(res => {dataReturn = res;})
            sendData(formatReturn(dataReturn, inputReturn, outputReturn),res)
        }catch (e){
            sendErrorMessage(res)
        }

    },
    changeData: async(req,res)=>{
        const dbItem = await Data.findById(item._id);
        if (dbItem) {
            dbItem.rank = item.rank;
            dbItem.comment = item.comment;
            await dbItem.save();
            const input = await Input.findById(dbItem.input)
            const output = await Output.findById(dbItem.output)
            const result = formatReturn(dbItem,input,output)
            sendData(result,res)
        }
        sendErrorMessage(res);
    },
    getList: async(req,res)=>{
        try {
            const dataList = await Data.find();
            let result = [];
            for(let num in dataList){
                const input = await Input.findById(dataList[num].input)
                const output = await Output.findById(dataList[num].output)
                result[num] = formatReturn(dataList[num],input,output)
            }
            sendData(result,res)
        }catch (e){
            sendErrorMessage(res)
        }
    },
    getDataById: async(req,res)=>{
        try {
            const { id } = req.params;
            const data = await Data.findById(id)
            const input = await Input.findById(data.input)
            const output = await Output.findById(data.output)
            const result = formatReturn(data,input,output)
            sendData(result,res)
        }catch (e){
            sendErrorMessage(res)
        }
    },
    getDataByCondition: async(req,res)=>{
        const item = req.body;
        let condition = {limit:30,skip:0, sort:{}};
        let filter = {rank:{$exists:true}, datetime:{$exists: true}};
        if(item.conditions != null ) {
            if (item.conditions.page != null) {
                condition.skip = item.conditions.page * item.conditions.lines;
                condition.limit = item.conditions.lines;
            }
            if (item.conditions.order != null) {
                switch (item.conditions.order) {
                    case "date":
                        condition.sort = {datetime: 1};
                        break;
                    case "high rank":
                        condition.sort = {rank: 1};
                        break;
                    case "low rank":
                        condition.sort = {rank: -1};
                }
            }
            if (item.conditions.filter != null) {
                if (item.conditions.filter.rank != null) {
                    filter.rank = {
                        $in: item.conditions.filter.rank
                    }
                }
                if (item.conditions.filter.time != null) {
                    switch (item.conditions.filter.time) {
                        case "day":
                            let day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                            filter.datetime = {$gte: day};
                            break;
                        case "week":
                            let week = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                            filter.datetime = {$gte: week};
                            break;
                        case "month":
                            let month = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
                            filter.datetime = {$gte: month};
                    }
                }
            }
        }


        try {
            const dataList = await Data.find(filter,{},condition);
            let result = [];
            for (let num in dataList) {
                const input = await Input.findById(dataList[num].input)
                const output = await Output.findById(dataList[num].output)
                result[num] = formatReturn(dataList[num], input, output)
            }
            sendData(result, res)
        } catch (e) {
            sendErrorMessage(res)
        }
    }

}

function formatReturn(data, input, output) {
    data = JSON.parse(JSON.stringify(data))
    data.input = input;
    data.output = output;
    return data
}

function sendData(data,res){
    res.json({
        HttpStatus: 200,
        data: data,
        message: "",
        time: new Date()
    })
}

function sendErrorMessage(res){
    res.json({HttpStatus: 404, message:"Not Found", time: new Date()})
}

module.exports = controller;
