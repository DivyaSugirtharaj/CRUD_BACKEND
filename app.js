var createError = require('http-errors');
var express = require('express');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
const cors = require('cors');
var app = express();
var EmployeeModel = require('./employee');
const { sequelize } = require('./db');
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var server = http.createServer(app);app.post('/')

sequelize.sync({force:true}).then(()=> console.log('db is ready'))

app.get('/getEmployeeList',async(req,res)=>{
  const EmployeeList = await EmployeeModel.findAll();
  res.send(EmployeeList);
})

app.post('/addEmployeeDetails/',async (req,res)=>{
  await EmployeeModel.create(req.body);
  const EmployeeList = await EmployeeModel.findAll();
  res.send(EmployeeList)
})
app.put('/updateEmployeeDetails/:id',async (req,res)=>{
  var reqId = req.params.id;
  var Employee = await EmployeeModel.findOne(({where : {id : reqId}}));
  Employee.FirstName = req.body.FirstName;
  Employee.LastName = req.body.LastName;
  Employee.Gender = req.body.Gender;
  Employee.MobileNo = req.body.MobileNo;
  Employee.EmailId = req.body.EmailId;
  Employee.Country= req.body.Country
  Employee.City = req.body.City;
  Employee.State = req.body.State;
  await Employee.save();
  const EmployeeList = await EmployeeModel.findAll();
  res.send(EmployeeList)
})
app.delete('/deleteEmployee/:id',async (req,res)=>{
  var reqId = req.params.id;
  var Employee = await EmployeeModel.destroy(({where : {id : reqId}}));
  const EmployeeList = await EmployeeModel.findAll();
  res.send(EmployeeList)
})
server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
});
module.exports = app;
