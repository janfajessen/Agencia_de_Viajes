// para crear variables de entorno en package-lock.json en dev y start está configurado para windows Ó Mac Ó Lynux

// console.log(process.env.NODE_ENV);


const environment = {   // para crear un string y no haya un error en el typeo. No haya posibilidad de error
    production: "production",
    development: "development",
    test: "test"
}

const ENV = process.env.NODE_ENV || environment.development;  // Variables de entorno. Si estoy en produccion sino estoy en desarrollo. Se llama NODE_ENV porque lo ha llamado asi en package json,se suelen llamar asi
console.log(ENV);

const config = {
    [environment.production]: {
        //npm start. Este es el entorno definitivo realmente
        PORT: 80,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'bootcamp_fullstack'
        }
    },
    [environment.development]: {
        //npm run dev. Sirve para pruebas
        PORT: 3000,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'bootcamp_fullstack_dev'
        }
    },
    [environment.test]: {
        PORT: 3000,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'bootcamp_fullstack_test'
        }
    }
}

//Si no se pone el nombre correcto o no entra a environment
const CONFIG = config[ENV];
if (!CONFIG) {
    throw new Error('NODE_ENV=${ENV} is not a valid environment.')
}

// console.log(CONFIG);

// console.log(process.env)

//nunca poner process.env = CONFIG!!!!!!!!      


//Así conservamos lo que teniamos y añadimos lo de CONFIG:
process.env = {
    ...process.env,      //coge todas las variables que coincidan y añade las del config
    ...CONFIG
};


// console.log(process.env.MongoDB)
