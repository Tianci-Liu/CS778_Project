const express = require('express')
const Router = express.Router();
const controller = require("../controllers/project1_dao")
const mock = require("../mock/project1_mock")

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
// get mockData
Router.post('/mockdata', mock.mockdata);

module.exports = Router;
