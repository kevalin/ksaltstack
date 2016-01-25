var request = require('request');
var usersModel = require('mongo').userModel();
var saltapi = require('../config/saltapi');

exports.login = function(req, res) {
    var options = {
        url: saltapi.host + '/login',
        method: 'POST',
        rejectUnauthorized: false,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        form: {
            username: req.body.username,
            password: req.body.password,
            eauth: 'pam'
        }
    };

    usersModel.findOne({username: req.body.username}, function(err, user) {
        if (err) return console.log(err);
        if (!user) {
            res.send({scode: 0, info: 'user not exist'});
        } else {
            if (req.body.password !== user.password) {
                res.send({scode: 0, info: 'password is wrong'});
            } else {
                request(options, function(error, resHttps, body) {
                    if (!error && resHttps.statusCode == 200) {
                        console.log(JSON.parse(body).return[0]);
                        var saltapiReturn = JSON.parse(body).return[0];
                        var needSave = {
                            token: saltapiReturn.token,
                            expire: saltapiReturn.expire * 1000,
                            perms: saltapiReturn.perms
                        };
                        req.session.user = saltapiReturn;

                        console.log(req.session);

                        usersModel.findOneAndUpdate({username: saltapiReturn.user}, {$set: needSave}, function(err, raw) {
                             if (err) return console.log(err);
                             console.log('update user success: ', raw.toObject().username);
                             res.send({scode: 1});
                        });
                    } else {
                        console.log(error);
                        res.send({scode: 0, info: error});
                    }
                });
            }
        }
    });
};