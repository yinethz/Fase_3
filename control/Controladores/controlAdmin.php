<?php
require_once("../sesion/validaEstadoSesion.php");
require_once("../Admin/AccionAdmin.php");
$repuesta=array('mensaje'=>'Sin accion');
$accionAdmin= new AccionAdmin();
$datos=json_decode(file_get_contents('php://input'), true);
$accion= array_key_exists('accion', $datos) ? $datos['accion'] : null;
switch( $accion){
   case 'bd':
      $repuesta['error'] = $accionAdmin->crearBaseDeDatos();
      $repuesta['mensaje'] = 'Base de datos creada';
      $repuesta['tipoMensaje'] = $repuesta['error'] ? 'error' : 'exito';
      break;
   case 'tb':
      $repuesta['error'] = $accionAdmin->crearTabla();
      $repuesta['mensaje'] = 'Tabla creada';
      $repuesta['tipoMensaje'] = $repuesta['error'] ? 'error':'exito';
      break;
   case 'backup':
      try{
         $nombre = 'dbBackup' . date('Y-m-d-H-i-s') . '.sql';
         exec(constant("DB_BACKUP") . ' ../../backups/' . $nombre);
         $repuesta['mensaje'] = 'Backup creado con el nombre: ' . $nombre;
         $repuesta['tipoMensaje'] = 'exito';
      }catch(Exception $e){
         $repuesta['mensaje'] = 'Se presentó un error al crear el Backup, ' . $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      }
      break;
}
echo(json_encode($repuesta));
?>