var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//todo mi servidor tenga añadido plantillas
const hbs = require('hbs');
//
const hbsUtils = require('hbs-utils')(hbs);
//para crear pequeños parciales
hbsUtils.registerPartials(`${__dirname}/views/partials`);
//para cada cambio no se tenga que volver a reiniciar el servidor
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);
//para acceder a las routes creadas


var app = express();

require('./config/mongo.js');

var winston = require('./config/winston');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev', { stream: winston.stream }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;