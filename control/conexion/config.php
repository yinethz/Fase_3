<?php
   error_reporting(E_ERROR | E_PARSE); //Esconde los warning de php
   define("GRUPO","38");
	define("DB_HOST","localhost");
	define("DB_USUARIO", "root");
	define("DB_CONTRASENA", "12345678");
	define("DB_NOMBRE", "bdunad".constant("GRUPO"));
   define("DB_CHARSET","utf8"); //codificación de caracteres latinos
   define("SEGUNDOS_EXPIRA_SESION", 7*60);

   //define("DB_EXEC", 'c:\xampp\mysql\bin\mysqldump');
   define("DB_EXEC", 'c:\AppServ\MySQL\bin\mysqldump');
   define("DB_BACKUP",  constant("DB_EXEC").' --no-defaults -u '.constant("DB_USUARIO").
                        ' -p'.constant("DB_CONTRASENA").
                        ' '.constant("DB_NOMBRE").' > ');
   
?>