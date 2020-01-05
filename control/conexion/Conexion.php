<?php 
	
require_once("config.php");
class Conexion {

   private $conexionDB;
   
   function __construct(){
   }
   public function conectar($conBd=true){
      try {
         if(is_null($this->conexionDB)){
            $strCon = "mysql:host=" . constant("DB_HOST") . ";";
            if($conBd){
               $strCon .= "dbname=" . constant("DB_NOMBRE");
            }
            $this->conexionDB = new PDO(  $strCon , constant("DB_USUARIO") ,constant("DB_CONTRASENA") );
            $this->conexionDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexionDB->exec("SET CHARACTER SET utf8");
         }
      } catch (Exception $e) {
         http_response_code(500);
         die("Error es: " . $e->GetMessage());
      }
   }
   public function getConexion(){
      return $this->conexionDB;
   }

   public function desconectar(&$statement=null){
      if(!is_null($this->conexionDB)){
         if(!is_null($statement)){
            $statement->closeCursor();
            $statement=null;
         }
         $this->conexionDB=null;
      }
   }
   
}
?>