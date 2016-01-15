/**
 * Created by lizi on 2016/1/7.
 */
var servers = require('mongo').serverModel();
var request = require('request');
var saltapi = require('../config/saltapi');

exports.list = function(req, res) {
    console.log(req.session);
    servers.find({}).select().exec(function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return
        }
        res.render('server', {scode: 1, result: docs})
    })
};

exports.get = function(req, res) {
    servers.find({hostname: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return
        }
        res.send({scode: 1, result: docs})
    })
};

exports.delete = function(req, res) {
    servers.remove({hostname: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return
        }
        res.send({scode: 1, result: docs})
    })
};

exports.update = function(req, res) {
    if (req.session.user) {
        var options = {
            url: saltapi.host + '/minions/' + req.params.id,
            rejectUnauthorized: false,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'X-Auth-Token' : req.session.user.token,
                'Accept'       : 'application/json'
            }
        };

        request(options, function(err, resHttps, body) {
            if (!err || resHttps.statusCode == 200) {
                var hostname = req.params.id;
                console.log(hostname);
                var serverInfos = JSON.parse(body).return[0][hostname];
                console.log(serverInfos.os);
                servers.findOneAndUpdate({host: hostname}, {$set: serverInfos}, function(err, raw) {
                    if (err) {
                        console.log(err);
                        res.send({scode: 0, info: 'insert serversInfo into mongodb faild'});
                        return
                    }
                    res.send({scode: 1, info: raw.toObject()._id})
                });
            } else {
                console.log(err, resHttps.statusCode);
                res.send({scode: 0, info: 'request saltapi faild'})
            }
        });
    } else {
        res.redirect('/')
    }
};

exports.add = function(req, res) {
    var data = req.body;

    servers.save(data, function(err, raw) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return
        }
        res.send({scode: 1, result: raw})
    })
};