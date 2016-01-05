var mongoose = require('mongoose');
var async = require('async');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

db.on('error', function(e) {
    console.log(e)
});

var schema = new mongoose.Schema({
    user: {type: String, default: 'Guest'},
    password: {type: String},
    sTime: {type: Date, default: Date.now}
});

schema.methods.print = function() {
    var userName = this.user;
    console.log('save %s ok', userName)
}

schema.methods.findByUserName = function(callback) {
    return this.model('users').find({user: this.user}, callback)
}

schema.statics.findByUserName = function(username, callback) {
    return this.find({user: username}, callback)
}

var mongooseModel = db.model('users', schema);

mongooseModel.find({user: 'user_100'}, function(err, docs) {
    if (err) return console.log(err);
    console.log(docs);
    db.close()
})

// entity find
// var mongooseEntity = new mongooseModel({user: 'user_100'});
// mongooseEntity.findByUserName(function(err, docs) {
//     if (err) return console.log(err);
//     console.log(docs);
//     db.close();
// })

// statics find
// mongooseModel.findByUserName('user_100', function(err, docs) {
//     if (err) return console.log(err);
//     console.log(docs);
//     db.close()
// })

// for (var i = 0; i < 101; i++) {
//     var doc = {
//         user: 'user_' + i,
//         password: Math.random() * 100000
//     };
    
//     var mSave = new mongooseModel(doc);
//     mSave.save(function(err, mSave) {
//         if (err) {
//             console.log(err)
//         } else {
//             mSave.print()
//         }
//     })
// }

// async.waterfall([
//     function(cb1) {
//         var a = [];
//         for (var i = 0; i < 101; i++) {
//             var doc = {
//                 user: 'user_' + i,
//                 password: Math.random() * 100000,
//             };
            
//             a.push(doc)
//         }
        
//         cb1(null, a)
//     },
//     function(a, cb1) {
//         async.map(a, function(v, cb2) {
//             var mSave = new mongooseModel(v);
//             mSave.save(function(err, mSave) {
//                 mSave.print();
//                 cb2(err, null)
//             })
//         }, function(err, r) {
//             cb1(err, r)
//         })
//     }
// ], function(err, results) {
//     if (err) return console.log(err);
//     db.close()
// })