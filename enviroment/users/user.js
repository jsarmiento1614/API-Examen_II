//Crear usuario
var auth = require('./auth');

module.exports = (app, sql, sqlConfig) => {

    app.get('/', (req, res) => {
        res.send('Bienvenido a PAYPAL');
    });

    app.post("/v1/user/create", (req, res, next) => {

        var email = req.body.email;
        var pass = req.body.pass;

        console.log(email + pass);

        if (!email && !pass) {
            res.send("error");
        }

        var q = `insert into dbo.Usuario(Email, Password) values ('${email}','${pass}')`;

        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.query(q)
        })
            .then(result => {
                var data = {
                    success: true,
                    email: `${email}`,
                    pass : `${pass}`
                    
                }
                res.send(data);
            })
            .catch(err => {
                console.error(err);
            })
    });

    //Post que Loguea al Usuario y le devuelve un Token

    app.post("/v1/user/login", (req, res, next) => {
        var email = req.body.email;
        var pass = req.body.pass;

        if (!email || !pass) {
            res.status(403).send({ message: "missing parameters" });
        }

        var q = `select top 1 * from dbo.Usuario u where u.Email = '${email}' and u.Password = '${pass}'`

        new sql.ConnectionPool(sqlConfig).connect().then(request => {
            return request.query(q);
        })
            .then(result => {

                if (result.recordset.length > 0) {
                    res.send({
                        success: true,
                        message: "",
                        token: auth.CreateToken(result.recordset.UsuarioId),
                        user: result.recordset
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        message: "Error de C o password"
                    })
                }
            })
            .catch(err => {
                return next(err);
            })
    });
}
