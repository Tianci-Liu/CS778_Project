
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const mock = {
    mockdata: async (req,res) => {
        let sleepTime = Math.round(Math.random() * 10)
        await sleep(sleepTime * 1000)
        let item = JSON.stringify(req.body)
        let result = {
            input: item,
            generated_text: 'test result'
        }
        res.json(result)
    }
}

module.exports = mock;
