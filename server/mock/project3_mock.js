
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const mock = {
    mockdata: async (req,res) => {
        let sleepTime = Math.round(Math.random() * 10)
        await sleep(sleepTime * 1000)
        let item = req.body
        let trueProb = Math.random()
        let result = {
            input: item,
            true_probability: trueProb,
            false_probability: 1-trueProb,
            label: trueProb>0.5?"True":"False"
        }
        res.json(result)
    }
}

module.exports = mock;
