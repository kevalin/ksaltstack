/**
 * Created by lizi on 2016/1/8.
 */
var mongo = require('mongo');
var usersModel = mongo.userModel();

exports.login = function(req, res) {
    usersModel.findOne({user: req.body.user}, function(err, user) {
        if (err) return console.log(err);
        if (!user) {
            res.json({error: 'user not exist'});
        } else {
            if (req.body.password == user.password) {
                delete user.password;
                req.session.user = user;
                res.redirect('/main');
            } else {
                res.json({error: 'password is wrong'});
            }
        }
    });
};

exports.index = function(req, res) {
    res.render('login_test');
};
