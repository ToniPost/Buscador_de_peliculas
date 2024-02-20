<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

// Verificar si el usuario ya existe
$sql_verificar = "SELECT * FROM usuarios WHERE nombre_usuario = '$usuario'";
$result_verificar = $conn->query($sql_verificar);

if ($result_verificar->num_rows > 0) {
    echo "¡El usuario ya existe! Por favor, elige otro nombre de usuario.";
} else {
    // Insertar nuevo usuario
    $sql_insertar = "INSERT INTO usuarios (nombre_usuario, contrasena) VALUES ('$usuario', '$contrasena')";

    if ($conn->query($sql_insertar) === TRUE) {
        echo "Registro exitoso. Redirigiendo a la página principal...";
        header("Location: pagina_principal.html"); // Redirigir a la página principal después del registro
        exit();
    } else {
        echo "Error al registrar usuario: " . $conn->error;
    }
}

$conn->close();
?>
