var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var server = http.createServer(app);
var db = new sqlite3.Database('./employee.db');
db.run('CREATE TABLE IF NOT EXISTS emp(id integer primary key , FirstName TEXT, LastName TEXT , EmailId TEXT, Gender TEXT, Country TEXT,State TEXT,City TEXT , MobileNo bigint)');

app.post('/addEmployeeDetails/',function(req,res){
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Gender = req.body.Gender;
  var MobileNo = req.body.MobileNo;
  var EmailId = req.body.EmailId;
  var Country= req.body.Country
  var City = req.body.City;
  var State = req.body.State;
  db.serialize(()=>{
    db.run('INSERT INTO emp(FirstName,LastName,Gender,MobileNo,EmailId,Country,City,State) VALUES(?,?,?,?,?,?,?,?)', [FirstName, LastName,Gender,MobileNo,EmailId,Country,City,State], function(err,row) {
      if (err) {
        return console.log(err.message);
      }else{
        db.all('SELECT * FROM emp', function(err,rows){     
          if(err){
            res.send("Error encountered while displaying");
            return console.error(err.message);
          }else{
            res.send(rows);
          }
        });
      }
    });
});

})

app.get('/getEmployeeList', function(req,res){
  db.serialize(()=>{
    db.all('SELECT * FROM emp', function(err,row){     
      if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }else{
        res.send(row);
      }
    });

  });
});

app.post('/updateEmployeeDetails/', function(req,res){
  var id = req.body.id;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Gender = req.body.Gender;
  var MobileNo = req.body.MobileNo;
  var EmailId = req.body.EmailId;
  var Country= req.body.Country
  var City = req.body.City;
  var State = req.body.State;
  db.serialize(()=>{
    db.run('UPDATE emp SET FirstName = ? ,LastName = ? ,Gender = ?,MobileNo=?,EmailId = ?,Country = ?,City = ?,State = ? WHERE id = ?',[FirstName, LastName,Gender,MobileNo,EmailId,Country,City,State,id], function(err){
      if(err){
        res.send("Error encountered while updating");
        return console.error(err.message);
      }else{
        db.all('SELECT * FROM emp', function(err,rows){     
          if(err){
            res.send("Error encountered while displaying");
            return console.error(err.message);
          }else{
            res.send(rows);
          }
        });
      }
    });
  });
});


app.get('/deleteEmployee/:id', function(req,res){
  db.serialize(()=>{
    db.run('DELETE FROM emp WHERE id = ?', req.params.id, function(err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }else{
        db.all('SELECT * FROM emp', function(err,rows){     
          if(err){
            res.send("Error encountered while displaying");
            return console.error(err.message);
          }else{
            res.send(rows);
          }
        });
      }
    });
  });
});

server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
});
module.exports = app;
