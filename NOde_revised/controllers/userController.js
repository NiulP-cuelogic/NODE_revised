var mongoose = require('mongoose');
var User = require('../models/user');
var Boom = require('boom');
// mongoose.set('debug',true);
var bcrypt = require('bcrypt');
var userController = {};

userController.create = function(req,res){ 
    res.render('../views/users/create');
};
userController.save = function(req,res){
    // var user = new User(req.body);
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            console.log('user exists...');
            // window.alert("User already exists .. please login..");
        }
        else{
            
        }
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
                    console.log(user);
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

userController.edit = function(req,res){
    User.findOne({_id:req.params.id})
        .exec((err,user)=>{
            if(err){
                console.log("Error while editing...");
            }else{
                res.render("../views/users/edit",{user:user});
            }
    })
}

userController.update = function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:{firstname:req.body.firstname,lastname:req.body.lastname}}
    ,{new:true},function(err,user){
                if(err){
                    console.log("error occurred while updating..");
                    res.render("../views/users/edit",{user:req.body });
                }else{
                    res.redirect("/user/show/" + user._id);
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
    // User.find({email:req.body.email,password:req.body.password})
    // .exec()
    // .then(user=>{
    //     // user = req.body;
    //     if(user.length<1){
    //         // console.log();
    //         console.log("user does not exist..")
    //     }
    //     else{
    //         // console.log(user);   
    //         // res.redirect('/user/show/'+user_id);
    //         user = user[0];
    //         console.log('user exists..');
    //         console.log(user);
    //         if(user.email === 'admin@gmail.com' && user.password ==="admin"){
    //             // res.status(200).json({message:"Welcome admin.."});
    //             res.render('../views/admin/admin');
    //         }
    //         else{
    //              res.render('../views/users/show',{user:user});
    //         }
            
           
            
    //     }
    // })

    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            console.log('user does not exist..');
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                console.log(err);
            }
            if(result){
                if(req.body.email==='admin@gmail.com' && req.body.password ==='admin'){
                    res.render('../views/admin/admin');
                }
                console.log(user);
                user = user[0];
                res.render('../views/users/show',{user:user});
            }
            // res.send(Boom.badRequest('Auth falied...'));
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
            res.redirect('/user/admin/users');
        }
    })
}

module.exports = userController;