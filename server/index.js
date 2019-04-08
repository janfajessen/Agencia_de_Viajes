require('./config');  //requiere index.js en la carpeta config
const express = require('express');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs); //dentro tiene la funcion de hbs
hbs.registerPartials(`${__dirname}/views/partials`); //los cuadaditos de la web para no repetir codigo y guardar los pequeños parciales
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`); //para que cualquier cambio se actualic sin necesidad de reiniciar el server

const router = require('./routes')
const User = require('./models/user');

var winston = require('./config/winston');



var session = require('express-session');

//con sudo npm start va con el puerto 80, con npm run dev va en puerto 3000
const PORT = process.env.PORT || 3000;
const app = express();

app.use(session({
    // Clave con la que se va a firmar el ID de las cookies
    secret: '1234',
    // Nombre de la cookie
    name: 'register-demo',
    // Si se debe reguardar el objeto completo o no en cada petición.
    resave: true,
    // Si la sesión se debe guardar al crearla aunque no la modifiquemos.
    saveUninitialized: true
}));


//middlewares
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`);  //no lo pilla en relativo, lo tienes que poner en absoluto (coge el directorio entero hasta tu carpeta)
//lo de arriba es lo mismo que:  app.set('views', `/Users/jan/dev/mongo/server/views`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//servir la carpeta public desde fuera del servidor
app.use('/', express.static(`${__dirname}/public`))
app.use(router);

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Agencia de Viajes',
        layout: 'template'
    })
}); //se metera en las tres llaves de body {{{body}}}

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {

    res.render('register');
});

router.post('/register', function (req, res, next) {

    console.log('body:', req.body);
    new User(req.body)
        .save()
        .then(() => {
            console.log('registro valido');
            res.render('register', { message: 'Registro válido. Ya puedes hacer login' });

        })
        .catch((err) => {
            console.log('registro invalido', err);

            res.render('register', { error: err.message });

        })
});

router.get('/login/:email?/:pass?', function (req, res, next) {

    res.render('login', { email: req.params.email, pass: req.params.pass });
});


router.post('/login', function (req, res, next) {

    winston.debug(JSON.stringify(req.body));

    User.findOne(req.body)
        .then((user) => {
            console.log('login valido', user);
            if (user) {
                req.session.user = user;
                res.redirect('/home');
            } else {
                res.render('login', { error: 'credenciales incorrectos' });
                console.log("no se encuentra usuario")
            }
        })
        .catch((err) => {
            console.log('login invalido', err);
            res.render('login', { error: 'Ups algo no ha ido bien.  vuelva intentarlo más tarde' });

        })
});


router.get('/home', function (req, res, next) {
    if (req.session.user) {

        res.render('home', { email: req.session.user.email });
    } else {
        res.redirect('/login')
    }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/')
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
});

