/**
 * Created by lizi on 2016/1/7.
 */
var servers = require('mongo').serverModel();
var request = require('request');

exports.list = function(req, res) {
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
    var newData = req.body;

    request();
    servers.findOneAndUpdate({hostname: req.params.id}, newData, function(err, raw) {
        if (err) {
            console.log(err);
            res.send({scode: 0});
            return
        }
        res.send({scode: 1, result: raw})
    })
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