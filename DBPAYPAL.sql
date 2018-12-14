CREATE DATABASE DBPAYPAL;

GO 

USE DBPAYPAL;

GO

CREATE TABLE Usuario 
(
[UsuarioId] int NOT NULL IDENTITY(1,1),
[Email] varchar(100) NOT NULL,
[Password] varchar (200) NOT NULL,
CONSTRAINT PK_Usuarios PRIMARY KEY ([UsuarioId])

)

GO

CREATE TABLE TipoTransaccion
(
[TipoTransaccionId] INT NOT NULL IDENTITY (1,1),
[Nombre] varchar (50) NOT NULL,
CONSTRAINT PK_TipoTransacciones PRIMARY KEY ([TipoTransaccionId])
)
GO


CREATE TABLE TransaccionDetalle 
(
[TransaccionDetalleId] INT NOT NULL IDENTITY(1,1),
[Cantidad] decimal (8,4) NOT NULL,
[Concurrencia] varchar (10) NOT NULL,
[Descripcion] varchar (100) NOT NULL,
[DocumentoRefencia] INT NOT NULL,
CONSTRAINT PK_TransaccionDetalles PRIMARY KEY ([TransaccionDetalleId])

)

GO


CREATE TABLE Transacciones
(
[TransaccionId] INT NOT NULL IDENTITY(1,1),
[UsuarioId] INT NOT NULL,
[Destinatario] varchar(100),
[Date] Datetime NOT NULL,
TipoTransaccionId int NOT NULL,
TransaccionDetalleId int NOT NULL,
CONSTRAINT PK_Transacciones PRIMARY KEY([TransaccionId]),
CONSTRAINT FK_TipoTransacciones FOREIGN KEY (TipoTransaccionId)
REFERENCES TipoTransaccion(TipoTransaccionId),
CONSTRAINT FK_TransaccionDetalles FOREIGN KEY (TransaccionDetalleId)
REFERENCES TransaccionDetalle(TransaccionDetalleId)
)



