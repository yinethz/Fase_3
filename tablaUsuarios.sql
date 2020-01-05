
DROP DATABASE IF EXISTS bdunad38;

CREATE DATABASE bdunad38;

USE bdunad38;

CREATE TABLE usuarios(
   nombre_usuario       VARCHAR(15) NOT NULL PRIMARY KEY,
   contrasena_usuario   VARCHAR(35) NOT NULL,
   estado_usuario       VARCHAR(1) NOT NULL
);

INSERT INTO usuarios (nombre_usuario, contrasena_usuario, estado_usuario)
VALUES ('admin', MD5('12345678'), '1');

INSERT INTO usuarios (nombre_usuario, contrasena_usuario, estado_usuario)
VALUES ('admin2', MD5('12345678'), '0');