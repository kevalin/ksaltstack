var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/users');

db.on('error', function(e) {
    console.log(e)
});

/*var schema = new mongoose.Schema({
    user: {type: String, default: 'Guest'},
    password: {type: String},
    sTime: {type: Date, default: Date.now}
});*/

var schema = new mongoose.Schema({any: {}});

schema.methods.print = function() {
    var userName = this.user;
    console.log('save %s ok', userName)
};

schema.methods.findOne = function(callback) {
    return this.model('users').find({user: this.user}, callback)
};

schema.statics.findOne = function(option, callback) {
    return this.findOne(option, callback)
};

var mongooseModel = db.model('users', schema);

/*mongooseModel.update({user: 'user_0'}, {password: 'ceshi002'}, {upset: true}, function(err, raw) {
    if (err) return console.log('mongo update error: ', err);
    console.log('mongo update response: ', raw);
    db.close()
});*/

/*mongooseModel.find({user: 'user_100'}, function(err, docs) {
    if (err) return console.log(err);
    console.log(docs);
    db.close()
});*/

// entity find
 var mongooseEntity = new mongooseModel({user: 'user_1'});
 mongooseEntity.findOne(function(err, docs) {
     if (err) return console.log(err);
     console.log(docs);
     db.close();
 })

// statics find
/* mongooseModel.find({user: 'user_100'}, function(err, docs) {
     if (err) return console.log(err);
     console.log(docs);
     db.close()
 });*/

/* for (var i = 0; i < 101; i++) {
     var doc = {
         user: 'user_' + i,
         password: Math.random() * 100000
     };

     var mSave = new mongooseModel(doc);
     mSave.save(function(err, mSave) {
         if (err) {
             console.log(err)
         } else {
             mSave.print()
         }
     })
 }*/
