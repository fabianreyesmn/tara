<?php
    if(session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    /*
    $servername = "localhost";
    $username = "cheinspa_admin";
    $password = "passWord#24";
    $dbname = "cheinspa_Chein";
    */

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "chein";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexionn fallida: " . $conn->connect_error);
    }

    $agregados = null;

    if (isset($_SESSION['id']) && isset($_SESSION['nombre']) && isset($_SESSION['rango'])) {
        $id_usuario = $_SESSION['id'];
        $nombre_usuario = $_SESSION['nombre'];
        $rango_usuario = $_SESSION['rango'];

        $sql = "SELECT SUM(Cantidad) AS suma FROM carrito WHERE ID_Usuario = $id_usuario;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $agregados = $row['suma'];
        }
    }

?> 

<!-- header.php --> <link rel="stylesheet" href="estilos/estilos_header.css">

<script src="https://kit.fontawesome.com/48174618d9.js" crossorigin="anonymous"></script>
 <header class="header">
    <div class="header-left">
        <a href="index.php" >INICIO</a>
        <a href="productos.html">PRODUCTOS</a>
        <a href="#">ACERCA DE</a>
        <a href="contacto.html">CONTACTO</a>
    </div>

   
    <div class="header-center">
        <h1>TARA</h1>
    </div>

   
    <div class="header-right">
        <p><a class="links" name="btnMostrarMenu"><i class="fa-regular fa-user" style="color: #ffffff;">&nbsp;</i>INICIAR SESION</a></p>
        <a href="#">(USUARIO)</a>
    </div>
</header>
