<?php
if(isset($_GET['id']))
{
    $id= $_GET['id'];
}

try {
    require_once('funciones/bd_conexion.php');
    $sql = "SELECT * FROM contactos WHERE id ={$id} ";
    $resultado = $con->query($sql);
} catch (Exception $exc) {
    $error =$e->getMessage();
}

?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Agenda PHP</title>
        <link href="css/estilos.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="contenedor">
            <h1>Agenda de Contactos
            
            </h1>
            
            <div class="contenido">
                <h2>Editar Contacto</h2>
               
                
             
                <form action="actualizar.php" method="GET" >
                     <?php while($registro = $resultado->fetch_assoc()){ ?>
                <div class="campo">
                    <label for="nombre">Nombre
                        <input type="text" value="<?php echo $registro['nombre'] ;?>" name="nombre" id="nombre" placeholder="nombre">
                        
                    </label>
                </div>
                 <div class="campo">
                    <label for="numero">Numero
                        <input type="text" value="<?php echo $registro['telefono'] ;?>" name="numero" id="numero" placeholder="numero">
                        
                    </label>
                </div>
                    <input type="hidden" name="id" value="<?php echo $registro['id'] ?>">
                <input type="submit" value="Editar">
                     <?php }?>
                </form>
            </div>
          
            
        </div>
        <?php  $con->close(); ?>
    </body>
</html>
