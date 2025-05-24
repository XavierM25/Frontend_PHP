<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/images/ucv.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="assets/css/nuevapass.css">
    <title>UCV | Nueva Contraseña</title>
</head>
<body>
    <div class="container" id="container">
        <section class="form-container forgot-pass">
            <div class="header">
                <div class="navigation">
                    <button><a href="login.php"><i class="fa-solid fa-arrow-left"></i> Atrás</a></button>
                </div>
                <div class="faq">
                    <i class="fa-regular fa-circle-question"></i>
                </div>
            </div>
            <form id="resetPasswordForm" action="" method="post" autocomplete="off">
                <div class="title">
                    <h1>Crea una nueva contraseña</h1>
                    <p>Ingresa una nueva contraseña, esta debe ser diferente a contraseñas anteriores.</p>
                </div>

                <div class="field">
                    <div class="pass">
                        <label for="pass">Contraseña</label>
                        <div class="box-eye">
                            <button id="code-pass" type="button" onclick="mostrarContrasena('pass','show-pass')">
                                <i id="show-pass" class="fa-solid fa-eye logPass"></i>
                            </button>
                        </div>
                        <input type="password" name="new_password" id="pass" required>
                        <span>Debe tener al menos una mayúscula, una minúscula, un símbolo y tener 5 o más caracteres.</span>
                    </div>
                    <div class="veri-pass">
                        <label for="veri-pass">Confirmar contraseña</label>
                        <div class="box-eye">
                            <button id="codeVeri-pass" type="button" onclick="mostrarContrasena('veri-pass','show-veriPass')">
                                <i id="show-veriPass" class="fa-solid fa-eye logPass"></i>
                            </button>
                        </div>
                        <input type="password" name="confirm_password" id="veri-pass" required>
                        <span>Ambas contraseñas deben coincidir</span>
                    </div>
                </div>
                <div class="btn">
                    <input type="hidden" name="token" value="<?php echo htmlspecialchars($_GET['token'] ?? ''); ?>">
                    <input type="hidden" name="otp" value="<?php echo htmlspecialchars($_GET['otp'] ?? ''); ?>">
                    <input type="submit" value="Recuperar contraseña">
                </div>
            </form>
        </section>
    </div>
    <script src="assets/js/forgot-pass/nuevapass.js"></script>
    <script>
        function mostrarContrasena(idPassword, idIcon) {
            let inputPassword = document.getElementById(idPassword);
            let icon = document.getElementById(idIcon);

            if (inputPassword.type === "password" && icon.classList.contains("fa-eye")) {
                inputPassword.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                inputPassword.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye");
            }
        }
    </script>
</body>
</html>
