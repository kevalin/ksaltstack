/**
 * Created by lizi on 2016/1/15.
 */
var request = require('request');
var saltapi = require('../config/saltapi');

var options = {
    url: saltapi.host + '/login',
    method: 'POST',
    rejectUnauthorized: false,
    header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    },
    form: {
        username: 'saltapi',
        password: 'gameingo',
        eauth: 'pam'
    }
};

console.log(options);

request(options, function(error, resHttps, body) {
    if (!error && resHttps.statusCode == 200) {
        console.log(body)
    } else {
        console.log(error)
    }
});