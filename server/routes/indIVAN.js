const router = require('express').Router();  //una funcion que coje una parte de express y crea la ruta

const User = require('../models/User');

const winston = require('../config/winston.js');

const upload = require('../config/multer');


// router.get('/env', (req, res) => {
//     res.send(process.env.NODE_ENV)  /// para verificar en qué entorno estariamos trabajando
// }); 


router.post('/users', (req, res) => {  //deberia llamarse register
    console.log(req.body);
    new User(req.body)
        .save()
        .then(user => {
            res.json(user);  //puede ser .send o .json (.send es texto plano)
        }).catch(err => {
            res.status(400).json(err);
        })
})
//     (req.body)==={
//     name: 'Ivan',
//     email: 'ivan@geekshubsacademy.com',
//     password: 'mipass123'
// })
router.post('/users/auth', async (req, res) => {  //debe llamarse login!
    try {  //solo con sync, en una promesa .then no sirve de nada. Se podría poner then igualmente
        const user = await User.findByCredentials(req.body);
        if (!user)
            return res.status(401).send('Wrong Credentials Motherfucker!')
        res.send(user); //hay que poner send sino se quedaría cargando continuamente y espera respuesta del servidor
    } catch (err) {
        res.status(401).send(err);
    }
})

router.get('/users', (req, res) => {
    User.find({}).then(users => {  //User de la variable en mayuscula, para buscar todos se pone un objeto vacio
        res.send(users);
    }).catch(err => {
        res.status(500).send(err); //internal server error
    })
})

router.get('/users/:user_id', (req, res) => { //los dos puntos sera todas las carpetas siguientes
    User.findById(req.params.user_id).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err); //internal server error
    })
})

router.delete('/users/:user_id', (req, res) => {
    // User.findAndDelete({                  para borrar por el nombre!!
    //   name: req.params.name.....  
    // })
    User.findByIdAndDelete(req.params.user_id)
        .then(users => {  //solo mongoose tiene estas funciones en mongo tendrias que poner la veriable del _id
            res.send(users);
        }).catch(err => {
            res.status(500).send(err);
        })
})

//Actualizar sin borrar el anterior PUT borra el anterior
router.patch('/users/:user_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id,
        {
            ...req.body
        },
        {
            new: true,
            runValidators: true
        }
    ).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
})
// console.log({ ...user });
// user = {
//     ...user.toObject(),   //conservar todo lo que tenias antes y la que coincida la pones encima
//     ...req.body
// }
// user.save().then(updatedUser => {
//     res.send(updatedUser);
// }).catch(err => {
//     res.status(400).send(err);
// })
// res.send(user);
router.put('/users/:user_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id,
        {
            ...req.body
        },
        {
            new: true,
            runValidators: true,
            // overWrite: true
        }
    ).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
})

router.put('/users/:user_id', (req, res) => {
    User.findByIdAndUpdate
})

module.exports = router;