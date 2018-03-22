var mongoose = require('mongoose');
var express = require('express');
var User = require('../models/user');
var router = express.Router();

var user = require('../controllers/userController');



router.get('/',(req,res)=>{
    user.create(req,res);
});

router.post('/save',(req,res)=>{
    console.log('called');
    user.save(req,res);
})

router.get('/show/:id',(req,res)=>{
    user.show(req,res);
})

router.get('/edit/:id',(req,res)=>{
    user.edit(req,res);
})

router.post('/update/:id',(req,res)=>{
    user.update(req,res);
})
router.post('/delete/:id',(req,res)=>{
    user.delete(req,res);
})

router.post('/login',(req,res)=>{
    user.login(req,res);
})

// router.get('/admin/users',(req,res)=>{
//     user.list(req,res);
// })
router.get('/admin/show/:id',(req,res)=>{
    user.admin_show(req,res);
})
router.get('/admin/delete/:id',(req,res)=>{
    user.admin_delete(req,res);
})
router.get( '/login/admin/edit/:id',(req,res)=>{
    user.admin_edit(req,res);
    // var id = req.params.id;
    // var newFirstname = req.body.newFirstName;
    // var newLastname = req.body.newLastName;
    // var found  = false;
    // User.find({},function(err,users){
    //     users.forEach(function(user){
    //         if(!found || user._id === id){
    //             user.firstname = newFirstname;
    //             user.lastname = newLastName;
    //         }
    //     })
    // })
    // res.send("updated user successfully...");
})

router.get('/login/admin/users',(req,res)=>{
    user.list(req,res);
   
})
router.post('/login/admin/update/:id',(req,res)=>{
    user.admin_update(req,res);
})

router.get('/login/admin/allusers',(req,res)=>{
    // res.send({users:user});
    // User.find()
    // .select('email firstname lastname')
    // .exec()
    // .then(users=>{
    //     res.send(users);
    //     // res.render('../views/admin/list',{users:users});
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
    // var users = {};
    User.find({},function(err,users){
       res.send({user:users});
    })
})
router.post('/login/admin/search',(req,res)=>{
    user.search(req,res);
})

module.exports = router;