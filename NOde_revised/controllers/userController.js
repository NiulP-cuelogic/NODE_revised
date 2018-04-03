// import { O_APPEND } from 'constants';

var mongoose = require('mongoose');
var User = require('../models/user');
var Boom = require('boom');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userController = {};
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var cookie = require('cookie-parser');
var Promise = require('bluebird');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var UserActivity = require('../models/userActivity');

mongoose.Promise = Promise;
Promise.promisifyAll(bcrypt);
Promise.promisifyAll(mongoose);


userController.create = function(req,res){ 
    res.render('../views/users/index');
};

userController.save = function(req,res){
    User.find({email:req.body.email})
    .exec()
    .then(user=>{

        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                console.log("some error occurred..");
            }else{
                var user = new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    password:hash  
                });
                user
                .save()
                .then(user=>{
                    res.redirect('/user/show/'+ user._id);
                })
                .catch(err=>{
                    console.log(err);
                })
            }
    })
    })

    
}


userController.show = function(req,res){
    User.findOne({_id:req.params.id})
    .exec()
    .then(user=>{
        res.render("../views/users/show",{user:user});
    })
    .catch(err=>{
        res.send(Boom.badRequest("ERROR:user not found"));
    })
}





userController.update = function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:{firstname:req.body.firstname,lastname:req.body.lastname}}
    ,{new:true})
    .exec()
    .then(user=>{
        res.render('../views/users/show',{user:user});
    })
    .catch(err=>{
        res.send(Boom.badRequest("Invalid id.."));
    })
}

userController.login = function(req,res){
    

    User.findAsync({email:req.body.email})
    .then(user=>{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                console.log(err);
            }
            if(result){
                console.log("login time",Date.now());

                var user_date = Date.now();

                var id = ObjectId(user[0]._id);
                
                var userActivity = new UserActivity({
                   
                    user_email:req.body.email,
                    userId:id,
                    loginDate:user_date

                })
               userActivity.save().then(user=>{console.log(user)});
               
                if(req.body.email==='admin@gmail.com' && req.body.password ==='admin'){

                    

                    res.redirect('/user/login/admin/users');
                   
                   
                }
                console.log(user);
                user = user[0];
                res.render('../views/users/show',{user:user});
               
            }
      
        })
    })
    .catch(err=>{
        res.json({
            success:true , message:"Username or password is invalid."
        })
    })
} 

userController.list = function(req,res){
    User.find()
    .select('email firstname lastname')
    .exec()
    .then(users=>{
        console.log(users);
        res.render('../views/admin/list',{users:users});
    })
    .catch(err=>{
        console.log(err);
    })
}

userController.admin_delete = function(req,res){
    User.remove({_id:req.params.id})
    .exec()
    .then(user=>{
        res.redirect("/user/login/admin/users");
    })
    .catch(err=>{
        res.send(Boom.badRequest("Error"));
    })
}



userController.admin_edit = function(req,res){
    User.findOne({_id:req.params.id})
    .exec()
    .then(users=>{
        res.render("../views/admin/edit",{user:users})
    })
    .catch(err=>{
        res.send(Boom.badImplementation("Falied tviewso load user profile"));
    })
}

userController.admin_update = function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:{firstname:req.body.firstname,lastname:req.body.lastname}}
        ,{new:true})
        .exec()
        .then(user=>{
            res.redirect('/user/login/admin/users');
        })
        .catch(err=>{
            res.send(Boom.badRequest("Id not found..."));
        })
}

userController.search = function(req,res){
    User.find({firstname:req.body.input_name})
    .exec()
    .then(users=>{
        var id = [];
        var user = [];
        for(var i=0;i<users.length;i++){
            id[i] = ObjectId(users[i]._id);
            user[i] = users[i];
        }
        res.render("../views/admin/user_search_list",{user:user});
    })
    .catch(err=>{ 
            res.send(Boom.badRequest("Error:."));
    })
}


userController.login_activity = function(req,res){
    UserActivity
    .find()
    .sort({loginDate:'desc'})
    .select(" user_email loginDate")
    .exec()
    .then(user=>{
        
        var diff=[];
        var date_now = moment(new Date());
        console.log(date_now);
        var newUser = [];
        // var lastLogin = moment(user[0].date);
        var lastLogin = [];
        // console.log(lastLogin);
        console.log("difference is ", date_now.diff(lastLogin,'days'),'days'); 
        for(let i=0;i<user.length;i++){
             lastLogin[i] = moment(user[i].date);
            diff[i] = date_now.diff(lastLogin[i],'days');
           
            if(diff[i] <= 5){
                newUser[i] = user[i];
                // res.render("../views/admin/loginActivity",{user:user});
            }
        } 
        console.log(diff);
        res.render("../views/admin/loginActivity",{user:newUser});
    })
    .catch(err=>{
        res.send(Boom.badRequest("Error"));
    })


}
// 
// }userController.login = function(req,res){
//     input_email = req.body.email;
//     input_password = req.body.password;
//     User.find({email:input_email})
//      .exec()
//      .then((user)=>{
//          if(user.length<1){
//              console.log("No user found..");
//              res.send(Boom.badRequest("User not found..."));
//          }
//          else{
//              bcrypt.compare(input_password,user[0].password,function(err,result){
//                  if(err) throw err;
//                  if(user[0].password!=input_password){
//                      res.send(Boom.badRequest("Invalid password.."));
//                  }
//                  if(input_email==="admin@gmail.com" && input_password==="admin"){
//                      res.render("../views/admin/list",{user:user});
//                  }
//                 //  else{
//                 //      if(input_email==="admin@gmail.com" && input_password==="admin"){
//                 //          res.redirect('/user/login/admin/users');
//                 //      }
//                 //      else{
//                 //          user = user[0];
//                 //          res.render("../views/users/show",{user:user});
//                 //      }
//                 //  }
//                  console.log(user);
//              })
//          }
//          return user;
//          }).then((user)=>{
//          var user_date = Date.now();
//          var id = ObjectId(user[0]._id);
//          var userActivity = new UserActivity({
//                 user_email:input_email,
//                 userId:id,
//                 loginDate:user_date
//          })
//          userActivity.save().then(user=>{console.log(user)}).catch(err=>{console.log("error occured...")});
//      })
//      .catch((err)=>{
//          console.log("err occured..");
//      })
    
// }

module.exports = userController;