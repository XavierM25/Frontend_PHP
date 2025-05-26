<?php
    require_once("view/head/header.php");
?>

<!-- Formulario para subir la imagen de perfil -->
<div id="modalEditImage">
    <div class="modal modal-close">
        <p class="close">X</p>
        <form id="profile-pic-form">
            <input type="file" name="profile_pic" id="profile_pic">
            <button id="btnUpdateImgProfile" type="submit">Subir Imagen</button>
        </form>
    </div>
</div>


<?php
require_once("view/head/main.php");
?>

<section class="edit-info">
    <article class="basic-info">
        <form id="edit-user-form">
            <h1>Mi Perfil</h1>
            <input type="hidden" name="id" id="user-id">
            <div class="item">
                <label for="nomCli">Nombre</label>
                <input id="nomCli" type="text" name="nombre" placeholder="">
            </div>
            <div class="item">
                <label for="apePaCli">Apellido Paterno</label>
                <input id="apePaCli" type="text" name="apellido_paterno" placeholder="">
            </div>
            <div class="item">
                <label for="apeMaCli">Apellido Materno</label>
                <input id="apeMaCli" type="text" name="apellido_materno" placeholder="">
            </div>
            <div class="item">
                <label for="fechCli">Fecha de Nacimiento</label>
                <input id="fechCli" type="date" name="fecha_nacimiento" max="2024-12-31">
            </div>
            <div class="item">
                <label for="mailCli">Correo electrónico</label>
                <input id="mailCli" type="email" name="email" placeholder="">
            </div>
            <div class="item">
                <label for="carreCli">Carrera Profesional</label>
                <select id="carreCli" name="carrera">
                <option value="-1" disabled selected>Carrera Profesional</option>
                            <option value="Administración y Marketing">Administración y Marketing</option>
                            <option value="Administración y Negocios Internacionales">Administración y Negocios Internacionales</option>
                            <option value="Administración">Administración</option>
                            <option value="Administración en Turismo y Hotelería">Administración en Turismo y Hotelería</option>
                            <option value="Contabilidad">Contabilidad</option>
                            <option value="Economía">Economía</option>
                            <option value="Gestión Pública">Gestión Pública</option>
                            <option value="Artes & Diseño Gráfico Empresarial">Artes & Diseño Gráfico Empresarial</option>
                            <option value="Ciencias de la Comunicación">Ciencias de la Comunicación</option>
                            <option value="Ciencias del Deporte">Ciencias del Deporte</option>
                            <option value="Derecho">Derecho</option>
                            <option value="Educación Inicial">Educación Inicial</option>
                            <option value="Educación Primaria">Educación Primaria</option>
                            <option value="Traducción e Interpretación">Traducción e Interpretación</option>
                            <option value="Arquitectura">Arquitectura</option>
                            <option value="Ingeniería de Ciberseguridad">Ingeniería de Ciberseguridad</option>
                            <option value="Ingeniería en Ciencia de Datos">Ingeniería en Ciencia de Datos</option>
                            <option value="Ingeniería Empresarial">Ingeniería Empresarial</option>
                            <option value="Ingeniería Agroindustrial">Ingeniería Agroindustrial</option>
                            <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
                            <option value="Ingeniería Civil">Ingeniería Civil</option>
                            <option value="Ingeniería de Minas">Ingeniería de Minas</option>
                            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                            <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                            <option value="Ingeniería Mecánica Eléctrica">Ingeniería Mecánica Eléctrica</option>
                            <option value="Enfermería">Enfermería</option>
                            <option value="Estomatología">Estomatología</option>
                            <option value="Medicina">Medicina</option>
                            <option value="Nutrición">Nutrición</option>
                            <option value="Psicología">Psicología</option>
                            <option value="Tecnología Médica">Tecnología Médica</option>
                </select>
            </div>
            <div class="item">
                <label for="campuCli">Campus</label>
                <select id="campuCli" name="campus">
                <option value="-1" disabled selected>Campus</option>
                            <option value="Los Olivos">Los Olivos</option>
                            <option value="Trujillo">Trujillo</option>
                            <option value="Ate">Ate</option>
                            <option value="Callao">Callao</option>
                            <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
                            <option value="Chiclayo">Chiclayo</option>
                            <option value="Chimbote">Chimbote</option>
                            <option value="Piura">Piura</option>
                            <option value="Tarapoto">Tarapoto</option>
                            <option value="Chepén">Chepén</option>
                            <option value="Huaraz">Huaraz</option>
                            <option value="Moyobamba">Moyobamba</option>
                </select>
            </div>
            <div class="item">
                <label for="celCli">Celular</label>
                <input id="celCli" type="text" name="numero_telefono" placeholder="">
            </div>
            <div class="buttons">
                <button type="button" class="back">Volver</button>
                <button id="updateProfileButton" type="submit" class="save">Guardar Cambios</button>
            </div>
        </form>
    </article>
</section>

<?php
require_once("view/head/aside.php");
?>

<h3>Información Login</h3>

<section class="imp-info">
    <header>
        <div class="info">
            <div class="edit">
                <i class="ri-bar-chart-fill"></i>
                <p>#1</p>
            </div>
            <p>Ranking</p>
        </div>
        <div class="profile">
            <img id="user-profile-pic" src="" alt="Profile Picture">
        </div>
        <div class="info">
            <div class="edit cta">
                <i class="ri-image-edit-line"></i>
            </div>
            <p>Subir Imagen</p>
        </div>
    </header>

    <div class="about">
        <h2 id="user-username"></h2>
    </div>

    <div class="tabs-container">
        <ul class="tabs">
            <li>
                <a href="#tab-1" id="tab-1-link" class="tab-link">Usuario</a>
            </li>
            <li>
                <a href="#tab-2" id="tab-2-link" class="tab-link">Contraseña</a>
            </li>
        </ul>
    </div>

    <div class="tab-content" id="tab-1">
        <br>
        <h3>Cambiar Usuario</h3>
        <div class="vote">
            <form id="change-username-form" class="vote">
                <div class="fieldCli">
                    <label for="userCli">Usuario</label>
                    <div class="">
                        <input id="userCli" type="text" name="username" placeholder="Usuario">
                    </div>
                </div>
                <button id="btnUsernameUpdate" type="submit">Guardar Cambios</button>
            </form>
        </div>
    </div>

    <div class="tab-content" id="tab-2">
        <br>
        <h3>Cambiar Contraseña</h3>
        <div class="vote">
            <form id="change-password-form" class="vote">
                <div>
                    <label for="newPass">Nueva Contraseña</label>
                    <div>
                        <input id="newPass" type="password" name="new_password">
                    </div>
                    <label for="veriPass">Confirmar Contraseña</label>
                    <div>
                        <input id="veriPass" type="password" name="confirm_password">
                    </div>
                </div>
                <button id="btnPassUpdate" type="submit">Guardar Cambios</button>
            </form>
        </div>
    </div>
</section>        
</aside>

<script src="assets/js/edicliente.js"></script>
<script src="assets/js/API/perfil.js"></script>
<script src="assets/js/navigation.js"></script>
</body>
</html>
