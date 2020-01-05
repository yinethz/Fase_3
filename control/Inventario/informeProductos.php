<?php
require_once("../sesion/Sesion.php");
$sesionEstado = new Sesion();
$datosRespuesta = $sesionEstado->validarSesion();
if (!$datosRespuesta["valido"]) {
   echo $datosRespuesta[ "mensaje"];
   exit();
}
require_once( "../../libs/dompdf/autoload.inc.php");
$dompdf = new Dompdf\Dompdf();
$dompdf->setPaper('letter', 'portrait');
$contenidoHtml=$_POST["contenidoPdf"];
$dompdf->loadHtml($contenidoHtml);
$dompdf->render();
ob_clean();
$dompdf->stream("ProductosInventario.pdf", array("Attachment" => 0));
?>