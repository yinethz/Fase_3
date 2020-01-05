<?php
require_once("Sesion.php");
$sesionEstado = new Sesion();
$datosRespuesta = $sesionEstado->validarSesion();
if(!$datosRespuesta["valido"]){
   $datosRespuesta["autenticar"]=true;
   http_response_code(401);
   echo (json_encode( $datosRespuesta));
   exit();
}
?>