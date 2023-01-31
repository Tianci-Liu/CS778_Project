
const results = [
    "This is whole life of William Shakespeare...",
    "Napoleon Bonaparte (born Napoleone Buonaparte; 15I August 1769 – 5 May 1821), later known by his regnal name Napoleon ...",
    "Steven Paul Jobs (February 24, 1955 – October 5, 2011) was an American entrepreneur, business magnate, industrial designer, media proprietor, and investor. He was the co-founder, chairman, and CEO of Apple...",
    "The other output of A is in this passage..."
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const mock = {
    mockdata: async (req,res) => {
        let sleepTime = Math.round(Math.random() * 10)
        await sleep(sleepTime*1000);
        let item = req.body
        let output = results[Math.round(Math.random()*3)]
        let result = {
            input: item,
            generated_text: output
        }
        res.json(result)
    }
}

module.exports = mock;
