var express = require('express');
var router = express.Router();
var request = require('request');

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
            var result = JSON.parse(body).return;
            res.send({statusCode: resHttps.statusCode, info: result})
        } else {
            console.log(error);
            res.send({statusCode: resHttps.statusCode, info: error})
        }
    })
});

module.exports = router;