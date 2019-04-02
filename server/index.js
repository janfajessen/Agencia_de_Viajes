require('./config');  //requiere index.js en la carpeta config
const express = require('express');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs); //dentro tiene la funcion de hbs
hbs.registerPartials(`${__dirname}/views/partials`); //los cuadaditos de la web para no repetir codigo y guardar los pequeños parciales
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`); //para que cualquier cambio se actualic sin necesidad de reiniciar el server

const router = require('./routes')

//con sudo npm start va con el puerto 80, con npm run dev va en puerto 3000
const PORT = process.env.PORT || 3000;
const app = express();



//middlewares
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`);  //no lo pilla en relativo, lo tienes que poner en absoluto (coge el directorio entero hasta tu carpeta)
//lo de arriba es lo mismo que:  app.set('views', `/Users/jan/dev/mongo/server/views`);


app.use(express.json());
//servir la carpeta public desde fuera del servidor
app.use('/', express.static(`${__dirname}/public`))
app.use(router);

// app.get('/hbs', (req, res) => {
//     res.render('prueba.hbs', {
//         title: 'Prueba',
//         users: [
//             { id: 1, name: 'Jan' },
//             { id: 2, name: 'Xavi' },
//             { id: 3, name: 'Juan' }
//         ],
//         admin: {
//             name: 'Ivan',
//             fullName: 'Ivan Ruiz'
//         },
//         layout: 'template'
//     })
// });

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Agencia de Viajes',
        layout: 'template'
    })
}); //se metera en las tres llaves de body {{{body}}}


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
});

