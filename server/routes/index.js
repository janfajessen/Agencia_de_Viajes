var express = require('express');
// const User = require('../models/user');
var router = express.Router();

const winston = require('../config/winston.js');

/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// router.get('/register', function (req, res, next) {

//     res.render('register');
// });

// router.post('/register', function (req, res, next) {

//     console.log(req.body);
//     new User(req.body)
//         .save()
//         .then(() => {
//             console.log('registro valido');
//             res.render('register', { message: 'Registro válido. Ya puedes hacer login' });

//         })
//         .catch((err) => {
//             console.log('registro invalido', err);

//             res.render('register', { error: err.message });

//         })
// });

// router.get('/login/:email?/:pass?', function (req, res, next) {

//     res.render('login', { email: req.params.email, pass: req.params.pass });
// });


// router.post('/login', function (req, res, next) {

//     winston.debug(JSON.stringify(req.body));

//     User.findOne(req.body)
//         .then((user) => {
//             console.log('login valido', user);
//             if (user) {
//                 req.session.user = user;
//                 res.redirect('/home');
//             } else {
//                 res.render('login', { error: 'credenciales incorrectos' });
//                 console.log("no se encuentra usuario")
//             }
//         })
//         .catch((err) => {
//             console.log('login invalido', err);
//             res.render('login', { error: 'Ups algo no ha ido bien.  vuelva intentarlo más tarde' });

//         })
// });


module.exports = router;