const express = require('express');
const Router = express.Router();
const controller = require("../controllers/project2_dao")

// new data
Router.post('/newdata', controller.addData)
// edit data
Router.put(`/editdata`, controller.changeData);
// list data
Router.get('/getdata', controller.getList);
// get data by id
Router.get('/getdata/?:id', controller.getDataById);
// get data by condition
Router.post('/getdata', controller.getDataByCondition);

module.exports = Router;
