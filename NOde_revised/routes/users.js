var mongoose = require('mongoose');
var express = require('express');

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

router.get('/admin/users',(req,res)=>{
    user.list(req,res);
})
router.get('/admin/show/:id',(req,res)=>{
    user.admin_show(req,res);
})
router.post('/admin/delete/:id',(req,res)=>{
    user.admin_delete(req,res);
})

module.exports = router;