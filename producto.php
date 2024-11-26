<?php include "header.php"; ?>

<?php
    $Nombre_P = $_POST['Nombre_P'];
    $ID_Producto = $_POST['ID_Producto'];
    $Imagen_P = $_POST['Imagen_P'];
    $Descripcion_P = $_POST['Descripcion_P'];
    $Existencias_P = $_POST['Existencias_P'];
    $Precio_P = $_POST['Precio_P'];
    $Tiene_Descuento_P = $_POST['Tiene_Descuento_P'];
    $Descuento_P = $_POST['Descuento_P'];
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/c29b677056.js" crossorigin="anonymous"></script>
    <script src="scripts/scripts_productos.js"></script>
    <link rel="stylesheet" href="estilos/estilosProd.css">
    <title><?php echo $Nombre_P; ?></title>
</head>
<body>
    
    <div class="principal">
        <div class="imagen">
            <?php
                echo '<img src="fotos/' . $Imagen_P . '" alt="' . $Nombre_P . '">';
            ?>
        </div>

        <div class="informacion">
            <?php
                echo '<h1>' . $Nombre_P . '</h1>';
                echo '<p><i class="fa-solid fa-fingerprint"></i> ' . $ID_Producto . '</p>';
                echo '<p>' . $Descripcion_P . '</p>';
                echo '<p>' . $Existencias_P . ' unidades</p>';
                if ($Tiene_Descuento_P) {
                    echo '<div class="centrar-precio">';
                    echo '<p class="tachado"><i class="fa-solid fa-dollar-sign"></i> ' . $Precio_P . '</p>';
                    echo '<p><i class="fa-solid fa-dollar-sign"></i> ' . ($Precio_P - $Descuento_P) . '</p>';
                    echo '</div>';
                }else{
                    echo '<p><i class="fa-solid fa-dollar-sign"></i> ' . $Precio_P . '</p>';
                }

                echo '<form id="agregar-car' . $ID_Producto . '">';
                echo '<input type="hidden" name="ID_Producto" value="' . $ID_Producto . '">';
                if (isset($_SESSION['id']) && $_SESSION['id'] !== null){
                    echo '<button type="button" onclick="agregarAlCarrito(' . $ID_Producto . ')" class="agregar-p"><i class="fa-solid fa-cart-plus"></i></button>';
                }else{
                    echo '<button name="btnMostrarMenu" type="button" class="no-agregar-p"><i class="fa-solid fa-cart-plus"></i></button>';
                }
                echo '</form>';
            ?>
        </div>
    </div>
    <?php include "footer.php"; ?>
</body>