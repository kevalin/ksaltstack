/**
 * Created by lizi on 2016/1/7.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');

router.get('/', function(req, res) {
    var db = mongoose.createConnection('mongodb://192.168.10.91:27017/servers');
    db.on('error', function(e) {
        console.log('mongo error: ', e)
    });

    var serverSchema = new mongoose.Schema({any: {}});
    var servers = mongoose.model('servers', serverSchema);

    servers.find({}).select().exec(function(err, docs) {
        if (err) {
            console.log(err);
            return
        }
        db.close();
        res.render('server', {status: 'ok', result: docs})
    })
});

router.put(':hostname', function(req, res) {
    var serverInfo = req.body;
    var db = mongoose.createConnection('mongodb://192.168.10.91:27017/servers');

    db.on('error', function(e) {
        console.log('mongo error: ', e)
    });

    var serverSchema = new mongoose.Schema({any: {}});
    var servers = mongoose.model('servers', serverSchema);

    servers.findOneAndUpdate({hostname: req.body.hostname}, serverInfo, function(err, raw) {
        if (err) {
            res.send({status: 'no'});
            return
        }
        console.log('update server success: ', raw);
        res.send({status: 'ok'});
        db.close()
    });
});

router.delete(':hostname', function(req, res) {

});

module.exports = router;