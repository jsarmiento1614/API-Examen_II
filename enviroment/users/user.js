//Crear usuario
var auth = require('./auth');

module.exports = (app, sql, sqlConfig) => {

    app.get('/', (req, res) => {
        res.send('Bienvenido a PAYPAL');
    });

    app.post("/v1/user/create", (req, res, next) => {

        var email = req.body.user;
        var pass = req.body.pass;

        console.log(email + pass);

        if (!email && !pass) {
            res.send("error");
        }

        var q = `insert into dbo.Users(UserName, UserPassword) values ('${email}','${pass}')`;

        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.query(q)
        })
            .then(result => {
                var data = {
                    success: true,
                    message: `Se ha registrado el usuario ${user} `
                }
                res.send(data);
            })
            .catch(err => {
                console.error(err);
            })
    });

    //Post que Loguea al Usuario y le devuelve un Token

    app.post("/v1/user/login", (req, res, next) => {
        var user = req.body.user;
        var pass = req.body.pass;

        if (!user || !pass) {
            res.status(403).send({ message: "missing parameters" });
        }

        var q = `select top 1 * from dbo.Users u where u.UserName = '${user}' and u.UserPassword = '${pass}'`

        new sql.ConnectionPool(sqlConfig).connect().then(request => {
            return request.query(q);
        })
            .then(result => {

                if (result.recordset.length > 0) {
                    res.send({
                        success: true,
                        message: "",
                        token: auth.CreateToken(result.recordset.UserId),
                        user: result.recordset
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        message: "Error de usuario o password"
                    })
                }
            })
            .catch(err => {
                return next(err);
            })
    });
}
