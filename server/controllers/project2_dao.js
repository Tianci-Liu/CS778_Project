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
        res.json('project2: edit data')
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
        res.json('project2: get data by condition')
    },

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
