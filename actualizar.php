<?php

function peticion_ajax()
{
    //Para asegurar que es un ajax
    return isset($_SERVER['HTTP_X_RESQUESTED_WITH']) && $_SERVER['HTTP_X_RESQUESTED_WITH'] == 'XMLHttpRequest';
}




$datos = $_GET['datos'];
$datos = json_decode($datos,true);
   
  
  $nombre = $datos['nombre'];
  $numero = $datos['telefono'];
  $id = $datos['id'];
  
  
   

    try {
    require_once('funciones/bd_conexion.php');
    $sql = "UPDATE contactos SET ";
    $sql .=" nombre = '{$nombre}', telefono = '{$numero}' WHERE id='{$id}';";

    $resultado = $con->query($sql);
    
    echo json_encode(array(
       'respuesta' => $resultado ,
        'nombre' => $nombre,
        'telefono' => $numero,
        'id' => $id
        
            
    ));
    
   
} catch (Exception $exc) {
    $error =$e->getMessage();
}
$con->close();





?>
