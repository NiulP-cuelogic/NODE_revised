var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = 'mongodb://localhost/user_db';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(db);
mongoose.Promise = global.Promise;
var path  = require('path');
var userRoutes = require("./routes/users");

app.use(express.static(path.join(__dirname, './views/admin')))
// app.set('views',path.join(_dirname,'views'));
app.set("view engine",'ejs');


app.use("/user",userRoutes);

module.exports = app;