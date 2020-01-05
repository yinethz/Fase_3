<?php
require_once("../sesion/validaEstadoSesion.php");
require_once("../Inventario/Inventario.php");
$repuesta=array('mensaje'=>'Sin accion');
$datos=json_decode(file_get_contents('php://input'), true);
$accion= array_key_exists('accion', $datos) ? $datos['accion'] : null;

$inventario= new Inventario();
$stm=null;
switch ($accion) {
   case 'ingresar':
         $repuesta=$inventario->ingresarProducto($datos);      
      break;
   case 'consultar':
      $repuesta = $inventario->consultarProducto($datos);
      break;
   case 'actualizar':
      $repuesta = $inventario->actualizarProducto($datos);
      break;
   case 'eliminar':
      $repuesta = $inventario->eliminarProducto($datos);
      break;
   case 'consultarTodo':
      $repuesta = $inventario->consultarProductos();
      break;
}

echo(json_encode($repuesta));
?>