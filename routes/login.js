var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    user: {type: String},
    password: {type: String},
    token: {type: String},
    start: {type: Date},
    expire: {type: Date},
    eauth: {type: String},
    perms: {type: Array}
});

router.post('/', function(req, res, next) {
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
    
    request(options, function(error, resHttps, body) {
        if (!error && resHttps.statusCode == 200) {
            var db = mongoose.createConnection('mongodb://192.168.10.91:27017/users');

            db.on('error', function(e) {
                console.log('mongodb: %s', e)
            });

            var result = JSON.parse(body).return;
            
            result['password'] = req.body.password;
            result['start'] = result.start * 1000;
            result['expire'] = result.expire * 1000;
            
            var usersModel = db.model('users', usersSchema);
            var tempResult = new usersModel(result);
            
            tempResult.save(function(err) {
                if (err) return console.log(err);
                console.log('%s login success', tempResult.user);
                db.close();
                res.send({statusCode: resHttps.statusCode})
            })
        } else {
            console.log(error);
            res.send({statusCode: resHttps.statusCode, info: error})
        }
    })
});

module.exports = router;