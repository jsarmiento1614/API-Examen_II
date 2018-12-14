// importo los espacio de nombres.
var express = require("express");
var sql = require("mssql");
var bodyparser = require("body-parser");
var cors = require("cors");
var dotenv = require("dontenv");

// agrego el express a la variable app
var app = express();

// Pongo en uso  bodyparser y cors
app.use(cors());
app.use(bodyparser());

// metodo para agregar la configuracion de la base de datos.
const sqlConfig = {
    user: process.env.DB_User,
    password: process.env.DB_password,
    server: process.env.DB_server,
    database: process.env.DB_database,
    port: parseInt(process.env.DB_PORT),
    debug: true,
    options: {
        encrypt: false
    }
}

// Creo una funcion  para capturar los errores ocacionados en el servidor.

app.use(function(err, req, res, next){
    console.log(err);
    res.send({success: false, message: err});
});

// escucho el puerto para ejecutar el servidor
app.listen(parseInt(process.env.APP_PORT), () => {
    console.log("El servidor esta corriendo en el servidor 8090");
    console.log(result.parse);
    console.log(msqConfig);
});

// importo los archivos que usare de forma externa.
require("./movies")(app, sql, sqlConfig);
require("./users")(app, sql, sqlConfig);





