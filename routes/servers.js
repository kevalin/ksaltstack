/**
 * Created by lizi on 2016/1/7.
 */
var servers = require('mongo').serverModel();
var request = require('request');
var saltapi = require('../config/saltapi');

exports.list = function(req, res) {
    servers.find({}).select().exec(function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return;
        }
        res.render('server', {scode: 1, result: docs});
    });
};

exports.get = function(req, res) {
    servers.find({host: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return;
        }
        res.send({scode: 1, result: docs});
    });
};

exports.delete = function(req, res) {
    servers.remove({host: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return;
        }
        res.send({scode: 1, result: docs});
    });
};

exports.update = function(req, res) {
    var options = {
        url                : saltapi.host + '/minions/' + req.params.id,
        rejectUnauthorized : false,
        headers            : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'X-Auth-Token' : req.session.user.token,
            'Accept'       : 'application/json'
        }
    };

    request(options, function(err, resHttps, body) {
        if (!err || resHttps.statusCode == 200) {
            var host = req.params.id;
            var serverInfos = JSON.parse(body).return[0][host];
            servers.findOneAndUpdate({host: host}, {$set: serverInfos}, function(err, raw) {
                if (err) {
                    console.log(err);
                    res.send({scode: 0, info: 'insert serversInfo into mongodb faild'});
                    return;
                }
                res.send({scode: 1, info: raw.toObject().host});
            });
        } else {
            console.log(err, resHttps.statusCode);
            res.send({scode: 0, info: 'request saltapi faild'});
        }
    });
};

exports.add = function(req, res) {
    var data = req.body;

    servers.save(data, function(err, raw) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return;
        }
        res.send({scode: 1, result: raw});
    });
};