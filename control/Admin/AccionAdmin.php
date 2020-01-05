<?php
require_once('../Conexion/Conexion.php');
class AccionAdmin extends Conexion{

   function __construct(){
   }

   public function crearBaseDeDatos(){
      $stm=null;
      $mensaje=null;
      
      try{
         $this->conectar(false);
         $sql = "CREATE DATABASE bdunad" . constant("GRUPO") . ";";
         $stm = $this->getConexion()->query($sql);
      }catch(Exception $e){
         $mensaje= $e->getMessage();
      }finally{
         if(!is_null( $this->getConexion())){
            $this->desconectar($stm);
         }
      }

      return $mensaje;
   }

   public function crearTabla(){
      $stm = null;
      $mensaje = null;
      try {
         $this->conectar();

         $sql = "CREATE TABLE tabla" . constant("GRUPO") . " ( ";
         $sql .= "   codigo varchar(10) not null primary key,";
         $sql .= "   nombre varchar(50) not null,";
         $sql .= "   marca varchar(11)  not null,";
         $sql .= "   precio double(20,2) not null,";
         $sql .= "   cantidad int not null";
         $sql .= ");";
         
         $stm = $this->getConexion()->query($sql);
      } catch (Exception $e) {
         $mensaje = $e->getMessage();
      } finally {
         if (!is_null($this->getConexion())) {
            $this->desconectar($stm);
         }
      }

      return $mensaje;
   }

}
?>