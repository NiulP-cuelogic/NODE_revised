var mongoose = require('mongoose');
mongoose.set('debug',true);
var express = require('express');
// var expressJoi = require('express-joi');
var Joi = require('joi');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String , required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String,  required:true}
})

module.exports = mongoose.model('User',userSchema);

