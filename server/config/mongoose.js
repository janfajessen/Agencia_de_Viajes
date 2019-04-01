const mongoose = require('mongoose');

const { PORT, DB, HOST } = process.env.MongoDB;

//${HOST}= localhost,${PORT}=27017, ${DB}= bootcamp_fullstack
mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`, { useNewUrlParser: true }); //se conecta con la base de datos. Conecta Node con Mongo

///para que no afecte a la hora de tumbar un servidor para la base de datos vamos a crear otra ip, servidor.. para pruebas 
module.exports = mongoose;

