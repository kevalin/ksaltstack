/**
 * Created by lizi on 2016/1/8.
 */
var mongoose = require('mongoose');
/*var db = mongoose.createConnection('mongodb://127.0.0.1:27017/users');
var schema = new mongoose.Schema({
    user: {type: String},
    password: {type: String}
});

var usersModel = db.model('users', schema);*/
var mongo = require('mongo')({dbname: 'users'});



exports.login = function(req, res) {
    console.log(req.body);
    userModel.findOne({user: req.body.user}, function(err, user) {
        if (err) return console.log(err);
        if (!user) {
            res.json({error: 'user not exist'})
        } else {
            console.log(user);
            console.log(user['password']);
            console.log(typeof user);

            if (req.body.password == user.password) {
                delete user.password;
                req.session['user'] = user;
                res.redirect('/main')
            } else {
                res.json({error: 'password is wrong'})
            }
        }
    })
};

exports.index = function(req, res) {
    res.render('login_test')
};