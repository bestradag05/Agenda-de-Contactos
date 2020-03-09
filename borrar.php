<?php

function peticion_ajax()
{
    //Para asegurar que es un ajax
    return isset($_SERVER['HTTP_X_RESQUESTED_WITH']) && $_SERVER['HTTP_X_RESQUESTED_WITH'] == 'XMLHttpRequest';
}



    $id = htmlspecialchars($_GET['id']);




try {
    require_once('funciones/bd_conexion.php');
    $sql = "DELETE FROM contactos WHERE id IN ({$id})";
   

    $resultado = $con->query($sql);
    
    echo json_encode(array(
        
       'respuesta' => $resultado
            
        
    ));
    
} catch (Exception $exc) {
    $error =$e->getMessage();
}

 $con->close();
?>

              


