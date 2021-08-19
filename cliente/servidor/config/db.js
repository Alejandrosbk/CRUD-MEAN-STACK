const mongoose = require('mongoose');
// Accediendo a la ruta de mongodb
require('dotenv').config({ path: 'variables.env' });

// metodo asincrono
const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("BD Conectada");
    } catch (error) {
        console.log(error);
        process.exit(1); // detenemos la app
    }
}

module.exports = conectarDB;