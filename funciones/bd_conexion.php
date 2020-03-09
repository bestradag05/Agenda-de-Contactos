<?php

$con = new mysqli('localhost','root','','contactos');

if($con->connect_error)
{
    echo $error = $con->connect_error;
}


?>
