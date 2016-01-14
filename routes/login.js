var request = require('request');
var usersModel = require('mongo').userModel();

exports.login = function(req, res) {
    var options = {
        url: 'https://192.168.33.10:8000/login',
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

    usersModel.findOne({user: req.body.username}, function(err, user) {
        if (err) return console.log(err);
        if (!user) {
            res.send({scode: 0, info: 'user not exist'})
        } else {
            if (req.body.password !== user.password) {
                res.send({scode: 0, info: 'password is wrong'})
            } else {
                delete user.password;
                req.session['user'] = user;
                res.redirect('/main');
                // request(options, function(error, resHttps, body) {
                //     if (!error && resHttps.statusCode == 200) {
                //         req.session['user'] = body;

                //         usersModel.update({user: user.username}, body, {upsert: true}, function(err, raw) {
                //             if (err) return console.log(err);
                //             //console.log('update token success: ', raw);
                //             res.render('main', {scode: 1})
                //         })
                //     } else {
                //         console.log(error);
                //         res.send({scode: 0, info: error.message})
                //     }
                // })
            }
        }
    })
};