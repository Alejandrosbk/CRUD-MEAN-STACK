const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// CREANDO EL SERVIDOR
const app = express();

// CONECTANDO LA BD
conectarDB();
app.use(cors())

// CONFIGURAR EL MIDDLEWARE PARA QUE SE PUEDAN ENVIAR JSON 
app.use(express.json());

app.use('/api/productos', require('./routes/producto'));

app.listen(4000, () => {
    console.log("servidor funciona ok");
})