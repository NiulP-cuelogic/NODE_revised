var mongoose = require('mongoose');
mongoose.set('debug',true);
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
    email:{type:String , required:true},
    firstname:{type:String , required:true},
    lastname:{type:String , required:true},
    password:{type:String , required:true}
});

module.exports = mongoose.model("User",userSchema);