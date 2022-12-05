import express from "express"
import mongoose from "mongoose"
import project1_route from  './src/project1/route.js'
import project2_route from  './src/project2/route.js'
import project3_route from  './src/project3/route.js'

const app = express();

const port = process.env.Port || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

// Start the DB running. Then, once it's connected, start the server.
mongoose.connect('mongodb://localhost:27017/cs778', { useNewUrlParser: true });

app.use('/project1', project1_route);
app.use('/project2', project2_route);
app.use('/project3', project3_route);

app.get('/',(req, res)=> {
    res.send("health")
})
