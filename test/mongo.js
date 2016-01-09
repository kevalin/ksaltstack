/**
 * Created by lizi on 2016/1/9.
 */
var mongo = require('mongo');

var options = {
    dbname: 'users'
};

var users = mongo(options);
for (var i = 0; i < 10000; i ++) {
    users.find({user: 'user_100'}, function(err, docs) {
        if (err) return console.log(err);
        console.log(docs);
    });
}