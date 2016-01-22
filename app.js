/* global __dirname */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongo = require('mongo').conn();

var index = require('./routes/index');
var login = require('./routes/login');
var servers = require('./routes/servers');
var main = require('./routes/main');
var login_test = require('./routes/login_test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'kevalin',
    resave: false,
    saveUninitialized: true
}));
// check session middleware
app.use(function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        console.log(req.baseUrl)
        if (req.baseUrl !== "") {
            res.redirect('/');
        }
        next();
    }
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.post('/login', login.login);
app.get('/main', main.index);
app.get('/servers', servers.list);
app.get('/servers/:id', servers.get);
app.put('/servers/:id', servers.update);
app.delete('/servers/:id', servers.delete);
app.post('/servers', servers.add);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
