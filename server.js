var express = require('express');
var sql = require('mssql');
var cors = require('cors');
var bodyparser = require('body-parser');
var env = require('dotenv');

var app = express();

const result = env.config();

app.use(cors());
app.use(bodyparser());
app.use(bodyparser.urlencoded({
    extended: true
}));

const sqlConfig = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    debug: false,
    options: {
        encrypt: false,
        instanceName: process.env.DB_INSTANCE_NAME
    }
}


app.use(function (err, req, res, next) {
    console.log(err);
    res.send({
        success: false,
        message: err
    });
});

app.listen(parseInt(process.env.APP_PORT), () => {
    console.log("Esta corriendo el servidor!!!")
    console.log(result.parsed);
    console.log(sqlConfig);
});

 require("./enviroment/users/user")(app, sql, sqlConfig);
//  require("./enviroment/pay/pay")(app, sql, sqlConfig);