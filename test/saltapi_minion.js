/**
 * Created by lizi on 2016/1/15.
 */
var request = require('request');
var saltapi = require('../config/saltapi');
//var usersModel = require('mongo').userModel();

var options = {
    url: 'https://192.168.10.139:8000/minions',
    rejectUnauthorized: false,
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'X-Auth-Token' : '807ee277852c29ce49bd1df210d6dd5f53093caa',
        'Accept'       : 'application/json'
    }
};

console.log(options);

request(options, function(error, resHttps, body) {
    if (!error && resHttps.statusCode == 200) {
        console.log(body)
    } else {
        console.log(resHttps.statusCode, error)
    }
});