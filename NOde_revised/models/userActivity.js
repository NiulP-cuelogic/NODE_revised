var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userActivitySchema  = new Schema({
    date:{type:Date , default:Date.now},
    user_email:{type: String,  ref:"User"},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    loginDate:{type:Date, default:Date.now} 
})

module.exports = mongoose.model("UserActivity",userActivitySchema);