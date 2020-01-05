<?php
require_once("Conexion.php");

$conexion = new Conexion();
$conexion-> conectar(false);


$sql = "CREATE DATABASE bdunad" . constant( "GRUPO").";";

/*
CREATE TABLE example(id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_example primary key(id));
INSERT INTO example(id, name) VALUES(null, 'Sample data');
*/
$stm = $conexion->getConexion()->query($sql);
$conexion->desconectar($stm);
?>