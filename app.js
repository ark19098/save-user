const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mysql = require('mysql');
// const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'node_test_db'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// connection.query('drop table student', function(error){
//   if (error) throw error;
//
//   console.log("table deleted!");
// });

// connection.query('create table student(roll integer primary key, name varchar(25) not null)', function(error){
//   if (error) throw error;
//
//   console.log("table created!");
// });

// connection.query("insert into student (roll, name) values (34, 'Ankur'), (35, 'Anubhav')", function(error, result){
//   if (error) throw error;
//     console.log("Inserted records");
// });

app.get('/', function(req, res) {
  connection.query('select * from student', function(err, result, fields){
    res.render('home',{users: result})
    console.log(result);
  })
});

app.get('/add', (req, res)=>{
  res.render('new-user');
});

app.post('/add',(req, res)=>{
  connection.query("insert into student (roll, name) values (" + req.body.roll + ", '" + req.body.name + "')", function(err, result){
    if(err) throw err;
    console.log("Inserted record");
    res.redirect('/');
  });
});

app.get('/delete/:rollNo', function(req, res){
  connection.query("delete from student where roll=" + req.params.rollNo, function(err, result){
    if(err) throw err;
    console.log("Successfully Deleted");
    res.redirect('/')
  })
})

app.get('/edit/:rollNo', function(req, res){
  connection.query("select * from student where roll=" + req.params.rollNo, function(err, result){
    if(err) throw err;
    res.render('new-user', {user: result[0]});
  })
})


app.listen(8080, function(){
  console.log("Server stated at port no. 8080");
});
