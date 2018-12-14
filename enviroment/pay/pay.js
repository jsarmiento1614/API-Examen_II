var auth = require('../users/auth');
module.exports = (app, sql, sqlConfig) =>{

app.post("/v1/payment/:userId/:idTipoTra/:detalletipo/create", auth.ValidateToken, (req, res, next) => {
    var userId = req.params.userId;
    var destinatario = req.body.destinatario;
    var date = req.body.date;
    var tipo = req.params.tipo;
    var cantidad = req.body.cantidad;
    var concurrenia = req.body.concurrenia;
    var descripcion = req.body.descripcion;
    var noDoc = req.body.noDoc;


    /* if (!user || !pass) {
        res.status(403).send({ message: "missing parameters" });
    } */
    var registro =`create procedure insertar @Destinatario varchar(100), @Date Datetime, @TipoTransaccionId int,
     @Cantidad decimal (8,4) , @Concurrencia varchar (10), @Descripcion varchar (100) , @DocumentoRefencia int As
     Begin Insert into Transacciones Destinatario, Date) Values('${destinatario}', '${date}')
     Insert into TransaccionDetalle Cantidad, Concurrencia, Descripcion, DocumentoRefencia)
     Values ('${cantidad}','${concurrenia}', '${descripcion}' '${noDoc}')End`

   

    new sql.ConnectionPool(sqlConfig).connect().then(request => {
        return request.query(registro);
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
                    message: "Registro Creado"
                })
            }
        })
        .catch(err => {
            return next(err);
        })
});
app.put("/v1/payment/:paymentId/update", (req, res, next) => { 
    var userId = req.body.userId;
    var Cantidad = req.body.Cantidad;
    var Concurrencia = req.body.Concurrencia;
    
    if (!userId || !Cantidad || !Concurrencia ) {
        res.status(403).send({
            message: "missing parameters"
        });
    }

    var Actualizar = `UPDATE TransaccionDetalle.Cantidad,TransaccionDetalle.Concurrencia, Usuario.UsuarioId SET Cantidad = '${Cantidad}', Concurrencia = '${Concurrencia}',
     From TransaccionDetalle INNER JOIN TransaccionDetalle.TransaccionId = Usuario.UsuarioId WHERE UserId = '${UserId}';`

    new sql.ConnectionPool(sqlConfig).connect().then(request => {
        return request.query(Actualizar);
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

app.get('/v1/payment/:userId/all', auth.ValidateToken, (req, res, next) => {
    var userId = req.params.userId;


    if (!userId) {
        res.status(403).send({
            message: "missing parameters"
        });
    }

    var q = `SELECT * FROM dbo.Usuario u INNER JOIN Transacciones t ON u.UsuarioId=t.UsuarioId INNER JOIN TransaccionDetalle td ON t.TransaccionDetalleId = td.TransaccionDetalleId INNER JOIN TipoTransaccion tt ON t.TipoTransaccionId = tt.TipoTransaccionId where UsuarioId=${userId}`

    new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.query(q)
        })
        .then(result => {
            var data = {
                success: true,
                message: '',
                data: result.recordset
            }
            res.send(data);

            sql.close();
        }).catch(err => {
            return next(err);
        });
})

}

