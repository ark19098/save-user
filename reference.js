const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// mongoose.connect("mongodb://localhost:27017/usersDB");
//
// let users = [];
//
// const usersSchema = {
//   roll: Number,
//   name: String
// }
//
// const User = mongoose.model('User',usersSchema);

// const user = new User({
//   roll: 34,
//   name: 'Ankur'
// });
// user.save(function(err){
//   if(!err){
//     console.log("saved");
//   }
// });

// app.get('/', function(req, res) {
//   User.find({}, function(err, foundUsers){
//     res.render('home',{users: foundUsers})
//   });
// });
//
// app.get('/add', function(req, res){
//   res.render('new-user');
// });
//
// app.post('/add', function(req, res){
//   const user = new User({
//     roll: req.body.roll,
//     name: req.body.name
//   });
//   user.save(function(err){
//     if(!err){
//       res.redirect('/');
//     }
//   });
//   res.redirect('/');
// });

mongoose.connect('mongodb://localhost:27017/test');
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save();

app.listen(8080, function(){
  console.log("Server stated at port no. 8080");
});
