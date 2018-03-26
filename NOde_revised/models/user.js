var mongoose = require('mongoose');
mongoose.set('debug',true);
var Joi = require('joi');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String , required:true},
    firstname:{type:String , required:true},
    lastname:{type:String , required:true},
    password:{type:String , required:true}
});
// var userSchema = Joi.object().keys({
//     email:Joi.string().email(),
//     firstname:Joi.string(),
//     lastname:Joi.string(),
//     password:Joi.string()
// })
// debugger;
module.exports = mongoose.model("User",userSchema);   





