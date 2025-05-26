<?php 
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>


    <section class="settings-container">
        <div class="settings-header">
            <h3>Ajustes</h3>
        </div>

        <div class="settings-section">
            <h4>Preferencias del Usuario</h4>
            <div class="setting-item">
                <label for="theme">Tema</label>
                <select id="theme">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                </select>
            </div>
            <div class="setting-item">
                <label for="language">Idioma</label>
                <select id="language">
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                </select>
            </div>
            <div class="setting-item">
                <label for="notifications">Notificaciones</label>
                <input type="checkbox" id="notifications">
            </div>
        </div>
    </section>

<?php
require_once("view/head/aside.php");
?>

    <section class="settings-section">
        <h4>Preferencias de Comunicación</h4>
        <div class="setting-item">
            <label for="email-notifications">Notificaciones por Correo Electrónico</label>
            <input type="checkbox" id="email-notifications">
        </div>
        <div class="setting-item">
            <label for="push-notifications">Notificaciones Push</label>
            <input type="checkbox" id="push-notifications">
        </div>
    </section>
</aside>

<script src="assets/js/navigation.js"></script>
<script src="assets/js/ajustes.js"></script>
</body>
</html>
