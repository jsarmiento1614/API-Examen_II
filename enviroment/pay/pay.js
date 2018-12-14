
app.post("/v1/payment/:userId/create", (req, res, next) => {
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
app.put("/v1/payment/:paymentId/update", (req, res, next) => {
    var user = req.body.user;
    var pass = req.body.pass;

    if (!user || !pass) {
        res.status(403).send({
            message: "missing parameters"
        });
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


