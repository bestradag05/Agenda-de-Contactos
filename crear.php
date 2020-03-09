<?php
function peticion_ajax()
{
    //Para asegurar que es un ajax
    return isset($_SERVER['HTTP_X_RESQUESTED_WITH']) && $_SERVER['HTTP_X_RESQUESTED_WITH'] == 'XMLHttpRequest';
}


    $nombre = htmlspecialchars($_POST['nombre']);



    $numero =htmlspecialchars($_POST['numero']);



try {
    require_once('funciones/bd_conexion.php');
    $sql = "INSERT INTO contactos(id,nombre, telefono) ";
    $sql .= "VALUES (NULL,'{$nombre}','{$numero}');";
    $resultado = $con->query($sql);
    

        echo json_encode(array(
            'respuesta' => $resultado,
            'nombre' => $nombre  ,
            'telefono' => $numero,
            'id' => $con-> insert_id
        ));
 
} catch (Exception $exc) {
    $error = $e->getMessage();
}


$con->close();
?>
