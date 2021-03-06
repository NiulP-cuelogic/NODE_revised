var express = require('express');
var validation = require('../middleware/validation/userValidation');
var checkAuth = require('../middleware/authentication/checkAuth');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var user = require('../controllers/userController');

router.get('/', (req, res) => {
    user.create(req, res);
});

router.post('/save', validation.validate, user.save);

router.get('/show/:id', validation.checkObjectId, user.show);

router.get('/edit/:id', validation.checkObjectId, (req, res) => {
    user.edit(req, res);
})

router.post('/update/:id', validation.checkObjectId, (req, res) => {
    user.update(req, res);
})

router.post('/delete/:id', validation.checkObjectId, (req, res) => {
    user.delete(req, res);
})

router.post('/login', (req, res) => {
    user.login(req, res);
})


router.get('/admin/users', (req, res) => {
    user.list(req, res);
})
router.get('/admin/show/:id', validation.checkObjectId, (req, res) => {
    user.admin_show(req, res);
})
router.get('/login/admin/delete/:id', validation.checkObjectId, (req, res) => {
    user.admin_delete(req, res);
})
router.get('/login/admin/edit/:id', validation.checkObjectId, (req, res) => {
    user.admin_edit(req, res);

})

router.get('/login/admin/users', (req, res) => {
    user.list(req, res);

})
router.post('/login/admin/update/:id', validation.checkObjectId, (req, res) => {
    user.admin_update(req, res);
})
router.post('/login/admin/search', (req, res) => {
    user.search(req, res);
})

router.get('/login/admin/showLoginActivity', (req, res) => {
    user.login_activity(req, res);
})

module.exports = router;