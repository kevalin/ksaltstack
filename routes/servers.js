/**
 * Created by lizi on 2016/1/7.
 */
var mongo = require('mongo');
var request = require('request');
var servers = mongo({dbname: 'servers'});
var users = mongo({dbname: 'users'});

exports.list = function(req, res) {
    servers.find({}).select().exec(function(err, docs) {
        if (err) {
            console.log(err);
            res.send({statusCode: 0});
            return
        }
        res.render('server', {statusCode: 1, result: docs})
    })
};

exports.get = function(req, res) {
    servers.find({hostname: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({statusCode: 0});
            return
        }
        res.send({statusCode: 1, result: docs})
    })
};

exports.delete = function(req, res) {
    servers.remove({hostname: req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            res.send({statusCode: 0});
            return
        }
        res.send({statusCode: 1, result: docs})
    })
};

exports.update = function(req, res) {
    var newData = req.body;

    request();
    servers.findOneAndUpdate({hostname: req.params.id}, newData, function(err, raw) {
        if (err) {
            console.log(err);
            res.send({statusCode: 0});
            return
        }
        res.send({statusCode: 1, result: raw})
    })
};

exports.add = function(req, res) {
    var data = req.body;

    servers.save(data, function(err, raw) {
        if (err) {
            console.log(err);
            res.send({statusCode: 0});
            return
        }
        res.send({statusCode: 1, result: raw})
    })
};