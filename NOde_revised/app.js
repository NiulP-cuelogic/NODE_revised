var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = 'mongodb://localhost/user_db';
var Joi = require('joi');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect(db);
mongoose.Promise = global.Promise;
var path  = require('path');
var userRoutes = require("./routes/users");

// app.use(express.static(path.join(__dirname, './views/admin')))
// app.set('views',path.join(_dirname,'views'));
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/views/scripts'));
// app.use(express.static(__dirname+'/views/css'))
app.set("view engine",'ejs');


app.use("/user",userRoutes);

module.exports = app;