<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css">
    <link rel="stylesheet" href="assets/css/index.css">
    <title>Login | Admin</title>
</head>
<body>
    <div class="container" id="container">
        <div class="form-container sign-in">
            <form id="adminLoginForm">
                <h1>Iniciar Sesión</h1>
                <div class="advertisement">
                    <span>Inicia sesión como administrador</span>
                </div>
                <div class="username">
                    <div class="box-icon">
                        <label for="username">
                            <i id="iconAdmin" class="ri-admin-fill"></i>
                        </label>
                    </div>
                    <input type="text" name="user" id="username" placeholder="Username">
                </div>
                <div class="password">
                    <div class="box-icon">
                        <button type="button" onclick="mostrarContrasena('password', 'seePass')">
                            <i id="seePass" class="ri-eye-line"></i>
                        </button>
                    </div>
                    <input type="password" name="contra" id="password" placeholder="Contraseña">
                </div>
                <button type="submit" id="loginAction">Iniciar Sesión</button>
                <a href="../Login/recuperar.php">Olvidaste tu contraseña?</a>
                <div class="redirect-admin">
                    <a id="redirect-client" href="../Login/login.php">Ingresa como Estudiante</a>
                </div>
            </form>
        </div>
    </div>
    <script src="assets/js/API/loginAdmin.js"></script>
</html>