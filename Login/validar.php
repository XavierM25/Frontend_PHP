<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/images/ucv.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="assets/css/validar.css">
    <title>UCV | Código verificación</title>
</head>

<body>
    <div class="container" id="container">
        <section class="form-container code-pass">
            <form action="" method="post" autocomplete="off" id="verificationForm">
                <div class="img-head">
                    <i class="fa-solid fa-envelope-open-text"></i>
                </div>
                <div class="title">
                    <h1>Revisa tu correo</h1>
                    <p>Hemos enviado un correo con el código de verificación para recuperar tu contraseña.</p>
                </div>

                <div class="field">
                    <h3>Ingresa el código de verificación</h3>
                    <div class="code-inputs">
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo1" required>
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo2" required>
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo3" required>
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo4" required>
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo5" required>
                        <input type="text" name="verification_code[]" placeholder="__" maxlength="1" class="veriCode-input" id="veriCo6" required>
                    </div>
                </div>
                <div class="btn">
                    <input type="hidden" name="email" value="<?php echo htmlspecialchars($_GET['email'] ?? ''); ?>">
                    <input type="hidden" name="token" value="<?php echo htmlspecialchars($_GET['token'] ?? ''); ?>">
                    <input type="submit" value="Verificar">
                </div>
            </form>
        </section>
    </div>
    <script src="assets/js/forgot-pass/validar.js"></script>
    <script>// Validación input
    const verificationForm = document.getElementById('verificationForm');
    const codeInputs = document.querySelectorAll('.veriCode-input');

    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (event) => {
            const value = event.target.value;
            if (value && value.length === 1) {
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                } else {
                    event.preventDefault(); // Evitar el envío automático del formulario
                }
            } else if (!value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        input.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key === 'Backspace' && index > 0 && !input.value) {
                codeInputs[index - 1].focus();
            }
        });
    });
    </script>
</body>
</html>