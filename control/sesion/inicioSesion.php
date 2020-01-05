<?php
require_once( "./Sesion.php");
$repuesta=array('mensaje'=>'Sin accion');
$datos=json_decode(file_get_contents('php://input'), true);
$accion= array_key_exists('accion', $datos) ? $datos['accion'] : null;

$sesion= new Sesion();
switch ($accion) {
   case 'ingresar':
      $repuesta=$sesion->validarUsuario($datos);
      if($repuesta["valido"]) $sesion->iniciarSesion($datos);
   break;
   case 'validar':
      $repuesta = $sesion->validarSesion($datos);
   break;
}

echo(json_encode($repuesta));
?>