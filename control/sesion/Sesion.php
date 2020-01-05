<?php
require_once('../Conexion/Conexion.php');
class Sesion extends Conexion{

   function __construct(){ }

   public function validarUsuario($datos){
      try {
         $this->conectar();
         $sql = "SELECT nombre_usuario, estado_usuario FROM usuarios";
         $sql .= " WHERE nombre_usuario=:nombre_usuario AND contrasena_usuario=:contrasena_usuario; ";

         $stm = $this->getConexion()->prepare($sql);
         $result  =  $stm->execute(
            array(
               ":nombre_usuario"   => $datos["usuario"],
               ":contrasena_usuario"=> md5($datos["contrasena"]),
            )
         );
         $repuesta['valido'] = false;
         if ($stm->rowCount() > 0) {
            $datosUsuario= $stm->fetchAll(PDO::FETCH_ASSOC)[0];
            if($datosUsuario["estado_usuario"]=="1"){
               $repuesta['valido']  =true;
               $repuesta['mensaje'] = 'Usuario activo';
               $repuesta['tipoMensaje'] = 'exito';
            }else{
               $repuesta['mensaje'] = 'Usuario no activo';
               $repuesta['tipoMensaje'] = 'alerta';
            }
         } else {
            $repuesta['mensaje'] = 'Usuario o contraseña incorrectos';
            $repuesta['tipoMensaje'] = 'error';;
         }
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }

   public function iniciarSesion($datos){
      session_start();
      $_SESSION["NOMRE_USUARIO"]= $datos["usuario"];
      $_SESSION["TIEMPO_INICIO"] = time();
      $_SESSION["TIEMPO_MAX"] = constant("SEGUNDOS_EXPIRA_SESION");
   }

   public function validarSesion(){
      session_start();
      $tiempoTranscurrido  = (time() -(int)$_SESSION["TIEMPO_INICIO"]);

      if( $tiempoTranscurrido >(int)$_SESSION["TIEMPO_MAX"]){
         $this->cerrarSesion();
         $repuesta['mensaje'] = 'La sesion ha expirado';
         $repuesta['tipoMensaje'] = 'alerta';
         $repuesta['valido'] = false;
         return $repuesta;
      }
      
      $repuesta['mensaje'] = 'Sesion activa';
      $repuesta['tipoMensaje'] = 'exito';
      $repuesta['valido'] = true;
      return $repuesta;
   }

   public function cerrarSesion(){
      session_destroy();
   }
}
