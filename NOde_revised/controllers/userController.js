var path = require('path');
var mongoose = require("mongoose");
var User = require("../models/user");
var Boom = require("boom");
var bcrypt = require("bcrypt");
var moment = require("moment");
var userController = {};
var ObjectId = require("mongodb").ObjectID;
var jwt = require("jsonwebtoken");
var cookie = require("cookie-parser");
var Promise = require("bluebird");
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");
var UserActivity = require("../models/userActivity");

mongoose.Promise = Promise;
Promise.promisifyAll(bcrypt);
Promise.promisifyAll(mongoose);


userController.create = function (req, res) {
    res.render("../views/users/index");
};

userController.save = function (req, res) {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log("some error occurred..");
                } else {
                    var user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: hash
                    });
                    user
                        .save()
                        .then(user => {
                            res.redirect("/user/show/" + user._id);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
        }).catch(err=>{
            res.send(Boom.badRequest("User not saved.."));
        })


}


userController.show = function (req, res) {
    User.findOne({
            _id: req.params.id
        })
        .exec()
        .then(user => {
            res.render("../views/users/show", {
                user: user
            });
        })
        .catch(err => {
            res.send(Boom.badRequest("ERROR:user not found"));
        })
}





userController.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        }, {
            new: true
        })
        .exec()
        .then(user => {
            res.render("../views/users/show", {
                user: user
            });
        })
        .catch(err => {
            res.send(Boom.badRequest("Invalid id.."));
        })
}





function promiseBcrypt(password, dbpassword) {

    return new Promise(function (resolve, reject) {
        var result = bcrypt.compareSync(password, dbpassword);

        if (result)
            resolve(result);
        else
            reject(result);
    })

}
userController.login = function (req, res) {

    var user;
    User.find({
            email: req.body.email
        })
        .then(user1 => {
            user = user1;
            return promiseBcrypt(req.body.password, user[0].password);
        }).then((result) => {
            if (result) {
                
                var user_date = moment();

                var id = ObjectId(user[0]._id);

                var userActivity = new UserActivity({

                    user_email: req.body.email,
                    userId: id,
                    loginDate: user_date

                })
                userActivity.save().then(user => {
                    console.log(user)
                });

                if (req.body.email === "admin@gmail.com" && req.body.password === "admin") {
                    res.redirect("/user/login/admin/users");
                }
                console.log(user);
                user = user[0];
                res.render("../views/users/show", {
                    user: user
                });
            }
        })
        .catch(err => {
            res.send(Boom.badRequest("User not found..."));
        })
}

userController.list = function (req, res) {
    User.find()
        .select("email firstname lastname")
        .exec()
        .then(users => {
            res.render("../views/admin/list", {
                users: users
            });
        })
        .catch(err => {
            console.log(err);
        })
}

userController.admin_delete = function (req, res) {
    User.remove({
            _id: req.params.id
        })
        .exec()
        .then(user => {
            res.redirect("/user/login/admin/users");
        })
        .catch(err => {
            res.send(Boom.badRequest("Error"));
        })
}



userController.admin_edit = function (req, res) {
    User.findOne({
            _id: req.params.id
        })
        .exec()
        .then(users => {
            res.render("../views/admin/edit", {
                user: users
            })
        })
        .catch(err => {
            res.send(Boom.badImplementation("Falied tviewso load user profile"));
        })
}

userController.admin_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        }, {
            new: true
        })
        .exec()
        .then(user => {
            res.redirect("/user/login/admin/users");
        })
        .catch(err => {
            res.send(Boom.badRequest("Id not found..."));
        })
}

userController.search = function (req, res) {
    User.find({
            firstname: req.body.input_name
        })
        .exec()
        .then(users => {
            var id = [];
            var user = [];
            for (var i = 0; i < users.length; i++) {
                id[i] = ObjectId(users[i]._id);
                user[i] = users[i];
            }
            res.render("../views/admin/user_search_list", {
                user: user
            });
        })
        .catch(err => {
            res.send(Boom.badRequest("Error:."));
        })
}


userController.login_activity = function (req, res) {
    UserActivity
        .find()
        .sort({
            loginDate: "desc"
        })
        .select(" user_email loginDate")
        .exec()
        .then(user => {

            var diff = [];
            var date_now = moment(new Date());
            var users = [];
            var lastLogin = [];

            for (var i = 0; i < user.length; i++) {
                lastLogin[i] = moment(user[i].loginDate);

                diff[i] = date_now.diff(lastLogin[i], "hours");

                if (diff[i] <= 10) {

                    users.push(user[i]);

                }
            }

            res.render("../views/admin/loginActivity", {
                user: users
            });
        })
        .catch(err => {
            res.send(Boom.badRequest("Error"));
        })


}
module.exports = userController;