const mongoose = require('mongoose');


const { pick } = require('lodash');

const UserSchema = new mongoose.Schema({  //creamos un nuevo esquema que va a ser creado en mongodb con mongoose, un driver que usa los esquemas y no es necesrio por ejemplo buscar si coincide algun email, que sea unico.
    //Schema es un objeto tarea
    // _id,  lo pone de forma automatica


    name: {
        //String
        type: String,
        //obligatorio
        required: true,
        //maximo 50
        maxlength: 50
    },
    email: {
        //String
        type: String,
        //unico
        unique: true,
        //required
        required: true

        //validar que es un mail de verdad
    },
    password: {
        //String
        type: String,
        //required
        required: true,
        //minimo 8 caracteres
        minlength: 8
        //reglas de validacion
        //encriptarla
    }
}, {
        strict: false //que no sea asi estricto por defecto, asi se puedan añadir mas campos!
    });


UserSchema.methods.toJSON = function () { //sobreescribimos la funcionalidad por defecto de methods.toJSON
    const user = this;  //con arrow function no podria leer este this, es necesario una funcion normal
    return pick(user, ['_id', 'name', 'email']); //para buscar usuarios pero omitir password. Tema de Seguridad!!
    //name: user.name
}


UserSchema.statics.findByCredentials = ({ email, password }) => {
    //email y password. Un metodo que hemos creado nosotros
    console.log(email, password);

    return User.findOne({
        email, password
    })
}

const User = mongoose.model('user', UserSchema);  //es el nombre coleccion y sobre que esquema se va a basar la coleccion. lo exporto donde quiera despues

module.exports = User;