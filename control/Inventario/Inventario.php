<?php
require_once('../Conexion/Conexion.php');
class Inventario extends Conexion{

   function __construct(){
   }

   public function ingresarProducto($datos){
      try {
         $this->conectar();
         $sql = "INSERT INTO tabla" . constant("GRUPO") . "(codigo, nombre, marca, precio, cantidad) ";
         $sql .= "values (:codigo, :nombre, :marca, :precio, :cantidad); ";

         $stm = $this->getConexion()->prepare($sql);
         $result  =  $stm->execute(
            array(
               ":codigo"   => $datos["codigo"],
               ":nombre"   => $datos["nombre"],
               ":marca"    => $datos["marca"],
               ":precio"   => $datos["precio"],
               ":cantidad" => $datos["cantidad"]
            )
         );
         $repuesta['mensaje'] = 'Producto creado';
         $repuesta['tipoMensaje'] = 'exito';
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }

   public function consultarProducto($datos){
      try {
         $this->conectar();
         $sql = "SELECT codigo, nombre, marca, precio, cantidad FROM tabla" . constant("GRUPO");
         $sql .= " WHERE codigo= :codigo; ";

         $stm = $this->getConexion()->prepare($sql);
         $result  =  $stm->execute(
            array(
               ":codigo"   => $datos["codigo"],
            )
         );
         if ($stm->rowCount() > 0) {
            $repuesta['datos'] = $stm->fetchAll(PDO::FETCH_ASSOC)[0];
            $repuesta['mensaje'] = 'Producto consultado';
            $repuesta['tipoMensaje'] = 'exito';
         } else {
            $repuesta['mensaje'] = 'Producto consultado sin resultados';
            $repuesta['tipoMensaje'] = 'alerta';
         }
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }

   public function actualizarProducto($datos){
      try {
         $this->conectar();
         $sql = "UPDATE tabla".constant("GRUPO")." SET nombre=:nombre, marca=:marca, precio=:precio, cantidad=:cantidad ";
         $sql .= "WHERE codigo=:codigo; ";

         $stm = $this->getConexion()->prepare($sql);
         $result  =  $stm->execute(
            array(
               ":codigo"   => $datos["codigo"],
               ":nombre"   => $datos["nombre"],
               ":marca"    => $datos["marca"],
               ":precio"   => $datos["precio"],
               ":cantidad" => $datos["cantidad"]
            )
         );
         if ($stm->rowCount() > 0) {
            $repuesta['mensaje'] = 'Producto actualizado';
            $repuesta['tipoMensaje'] = 'exito';
         } else {
            $repuesta['mensaje'] = 'No se actualizó ningún producto';
            $repuesta['tipoMensaje'] = 'alerta';
         }
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }

   public function eliminarProducto($datos){
      try {
         $this->conectar();
         $sql = "DELETE FROM tabla" . constant("GRUPO") . " WHERE codigo=:codigo; ";

         $stm = $this->getConexion()->prepare($sql);
         $result  =  $stm->execute(
            array(
               ":codigo"   => $datos["codigo"]
            )
         );
         if ($stm->rowCount() > 0) {
            $repuesta['mensaje'] = 'Producto eliminado';
            $repuesta['tipoMensaje'] = 'exito';
         } else {
            $repuesta['mensaje'] = 'No se eliminó ningún producto';
            $repuesta['tipoMensaje'] = 'alerta';
         }
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }

   public function consultarProductos(){
      try {
         $this->conectar();
         $sql = "SELECT codigo, nombre, marca, precio, cantidad FROM tabla" . constant("GRUPO");" ;";
         $stm = $this->getConexion()->prepare($sql);
         $stm->execute(array());
         if ($stm->rowCount() > 0) {
            $repuesta['datos'] = $stm->fetchAll(PDO::FETCH_ASSOC);
            $repuesta['mensaje'] = 'Productos consultados';
            $repuesta['tipoMensaje'] = 'exito';
         } else {
            $repuesta['mensaje'] = 'No se encontraron productos registrados';
            $repuesta['tipoMensaje'] = 'alerta';
         }
      } catch (Exception $e) {
         $repuesta['error'] = $e->getMessage();
         $repuesta['tipoMensaje'] = 'error';
      } finally {
         $this->desconectar($stm);
      }
      return $repuesta;
   }
}
