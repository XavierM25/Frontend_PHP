<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/images/ucv.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="assets/css/recuperar.css">
    <title>UCV | login</title>
</head>

<body>
    <div class="container" id="container">
        <section class="form-container forgot-pass">
            <div class="header">
                <div class="navigation">
                    <button><a href="login.php"><i class="fa-solid fa-arrow-left"></i> Atras</a></button>
                </div>
                <div class="faq">
                    <i class="fa-regular fa-circle-question"></i>
                </div>
            </div>
            <form id="recoverForm" action="" method="post" autocomplete="off">
                <div class="title">
                    <h1>Recuperar contraseña</h1>
                    <p>Ingresa el correo asociado con tu cuenta y te enviaremos un correo con las intrucciones para
                        recuperar tu contraseña.</p>
                </div>

                <div class="field">
                    <label for="correo">Correo electrónico</label>
                    <input type="email" id="correo" name="email" placeholder="ej: leoav@outlook.com" autocomplete="off" required>
                </div>
                <div class="btn">
                    <input type="submit" value="Enviar correo">
                </div>
            </form>
        </section>
    </div>
</body>

<script src="assets/js/forgot-pass/recuperar.js"></script>

</html>