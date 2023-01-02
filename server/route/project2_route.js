const express = require('express'),
    Router = express.Router();


// const articleController = require('../controllers/articles');

// new data
Router.post('/newdata',(req,res) => {
    console.log("project2: new data")
    res.json("project2: new data")
});
// edit data
Router.put(`/editdata`,(req,res) => {
    console.log("project2: edit data")
    res.json("project2: edit data")
});
// list data
Router.get('/getdata',(req,res) => {
    console.log("project2: list data")
    res.json("project2: list data")
});
// get data by id
Router.get('/getdata?:id',(req,res) => {
    console.log("project2: get data by id")
    res.json("project2: get data by id")
});
// get data by condition
Router.post('/getdata',(req,res) => {
    console.log("project2: get data by condition")
    res.json("project2: get data by condition")
});

module.exports = Router;
