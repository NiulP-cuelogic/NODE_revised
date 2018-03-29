var mongoose = require('mongoose');
var User = require('../models/user');
var Boom = require('boom');
var bcrypt = require('bcrypt');
var userController = {};
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var cookie = require('cookie-parser');
var Promise = require('bluebird');
var UserActivity = require('../models/userActivity');
Promise.promisifyAll(bcrypt);
Promise.promisifyAll(mongoose);


userController.create = function(req,res){ 
    res.render('../views/users/create');
};
userController.save = function(req,res){
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            console.log('user exists...');
            // window.alert("User already exists .. please login..");
        }
        else{

        }

        bcrypt.hashAsync(req.body.password,10,(err,hash)=>{
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
    .exec((err,user)=>{
        if(err){
            console.log('user does not exist..');
        }else{
            res.render('../views/users/show',{user:user});
        }
    })  
}



userController.update = function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:{firstname:req.body.firstname,lastname:req.body.lastname}}
    ,{new:true},function(err,user){
                if(err){
                    console.log("error occurred while updating..");
                    // res.render("../views/users/edit",{user:req.body });
                }else{
                    console.log('updated...');
                    res.render("../views/users/show",{user:user});
                }
    })
}

userController.delete = function(req,res){
    User.remove({_id:req.params.id},function(err){
        if(err){
            console.log("error occurred while deleting...");
        }else{
            console.log("employee deleted..");
            res.redirect('/user');
        }
    })
}

userController.login = function(req,res){
    

    User.findAsync({email:req.body.email})
    .then(user=>{
        if(user.length<1){
            console.log('user does not exist..');
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                console.log(err);
            }
            if(result){
                console.log("login time",Date.now());

                var user_date = Date.now();

                var id = ObjectId(user[0]._id);
                
                var userActivity = new UserActivity({
                    date:user_date,
                    user_email:req.body.email,
                    userId:id,
                    loginDate:Date.now()

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

userController.admin_show = function(req,res){
    User.findOne({_id:req.params.id})
    .exec((err,user)=>{
        if(err){
            console.log("some error occurred..");
        }
        else{
             res.render('../views/admin/user_show',{user:user});
        }
    })
    
}

userController.admin_delete = function(req,res){
    User.remove({_id:req.params.id},function(err){
        if(err){
            console.log("error deleting the user...");
        }
        else{
            res.redirect('/user/login/admin/users');
        }
    })
}


userController.admin_edit = function(req,res){
    User.findOne({_id:req.params.id})
    .exec((err,users)=>{
        if(err){
            console.log("error ocurred..");
        }
        else{
            res.render('../views/admin/edit',{user:users});
            res.redirect('/user/login/admin/users');
        }
    })
    


}

userController.admin_update = function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:{firstname:req.body.firstname,lastname:req.body.lastname}}
        ,{new:true},function(err,user){
                    if(err){
                        console.log("error occurred while updating..");
                        res.render("../views/users/edit",{user:req.body });
                    }else{
                        res.redirect("/user/login/admin/users");
                    }
        })
}

userController.search = function(req,res){
    console.log('called..');
    User.find({firstname:req.body.input_name})
    .exec((err,users)=>{
        if(err){
            console.log(err);
        }
        else{
            
            var id = ObjectId(users[0]._id);
            console.log(id);
            user = users[0];
            console.log(user);
            user = users[0];
            res.render('../views/admin/edit',{user:user});
        }
    })
}


userController.login_activity = function(req,res){
    UserActivity
    .find()
    .select("userId date user_email loginDate")
    .exec()
    .then(user=>{
        console.log(user);  
        // res.send(user);
        res.render("../views/admin/loginActivity",{user:user});
    })


}
module.exports = userController;