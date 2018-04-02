var express = require('express');
var validation = require('../middleware/validation/userValidation');
var checkAuth = require('../middleware/authentication/checkAuth');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
// var Validate = require('../validation/userValidation');
var user = require('../controllers/userController');

router.get('/',(req,res)=>{
    user.create(req,res);
});

router.post('/save',validation,user.save);



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
   

router.get('/admin/users',(req,res)=>{
    user.list(req,res);
})
router.get('/admin/show/:id',(req,res)=>{
    user.admin_show(req,res);
})
router.get('/login/admin/delete/:id',(req,res)=>{
    console.log('called...');
    user.admin_delete(req,res);
})
router.get( '/login/admin/edit/:id',(req,res)=>{
    user.admin_edit(req,res);
    
})

router.get('/login/admin/users',(req,res)=>{
    user.list(req,res);
   
})
router.post('/login/admin/update/:id',(req,res)=>{
    user.admin_update(req,res);
})

router.get('/login/admin/allusers',(req,res)=>{
   
    User.find({},function(err,users){
       res.send({user:users});
    })
})
router.post('/login/admin/search',(req,res)=>{
    user.search(req,res);
})

router.get('/login/admin/showLoginActivity',(req,res)=>{
    user.login_activity(req,res);
})

module.exports = router;