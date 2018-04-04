var express = require('express');
var app = express();
var dotenv = require('dotenv').config();
// dotenv.load();
var flash = require('connect-flash');
var mongoose = require('mongoose');
var db = 'mongodb://localhost/user_db';
var Joi = require('joi');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
// var session = require('express-session');
var session = require("client-sessions");



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    cookieName: 'session',
    secret: 'secret',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success message");
    res.locals.error_msg = req.flash("error message");
    res.locals.error = req.flash('error');
    next();
})

// app.use(flash());
mongoose.connect(process.env.DB);
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