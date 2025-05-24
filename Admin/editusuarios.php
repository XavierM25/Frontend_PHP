<?php
    require_once("view/head/header.php");
?>

<div id="modalEditImage">
    <div id="modalContImage" class="modal modal-close">
        <p id="closeModalImage" class="close">X</p>
        <form id="profile-pic-form">
            <div class="column-1">
                <img id="preview-img" src="" alt="Vista previa">
                <input type="file" name="profile_image" id="profile-image" accept="image/*">
            </div>
            <button id="btnLimpiar">Limpiar selección</button>
        </form>
    </div>
</div>

<div id="modalAgregarUsuario">
    <div class="modalAgregarUsuario modal-close">
        <p id="closeAgregarUsuario" class="closeAgregarUsuario">X</p>
        <div class="modal-content">
            <!-- Vista previa del usuario -->
            <h2>Nuevo Usuario</h2>
                <form id="new-user-form" class="modal-inputs">
                    <div class="inputs-info">
                        <div class="form-group">
                            <input type="text" id="new-name" name="new-name" required>
                            <label for="new-name">Nombre</label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="new-apePa" name="new-apePa" required>
                            <label for="new-apePa">Apellido Paterno</label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="new-apeMa" name="new-apeMa" required>
                            <label for="new-apeMa">Apellido Materno</label>
                        </div>
                        <div class="form-group">
                            <input type="date" id="new-fechNac" name="new-fechNac" required>
                            <label for="new-fechNac">Fecha de Nacimiento</label>
                        </div>
                        <div class="form-group">
                            <select name="new-sex" id="new-sex">
                                <option value="" disabled selected></option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                            <label for="new-sex">Sexo</label>
                        </div>
                        <div class="form-group">
                            <input type="email" id="new-mail" name="new-mail" required>
                            <label for="new-mail">Email</label>
                        </div>
                        <div class="form-group">
                            <select id="new-carrera" name="new-carrera">
                                <option value="" disabled selected></option>
                                <option value="Administración y Marketing">Administración y Marketing</option>
                                <option value="Administración y Negocios Internacionales">Administración y Negocios Internacionales</option>
                                <option value="Administración">Administración</option>
                                <option value="Administración en Turimo y Hotelería">Administración en Turimos y Hotelería</option>
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
                                <option value="Estomología">Estomología</option>
                                <option value="Medicina">Medicina</option>
                                <option value="Nutrición">Nutrición</option>
                                <option value="Psicología">Psicología</option>
                                <option value="Tecnología Médica">Tecnología Médica</option>
                            </select>
                            <label for="new-carrera">Carrera Universitaria</label>
                        </div>
                        <div class="form-group">
                            <select id="new-campus" name="new-campus">
                                <option value="" disabled selected></option>
                                <option value="Los Olivos">Los Olivos</option>
                                <option value="Trujillo">Trujillo</option>
                                <option value="Ate">Ate</option>
                                <option value="Callao">Callao</option>
                                <option value="San Juan de Luriganchos">San Juan de Lurigancho</option>
                                <option value="Chiclay">Chiclayo</option>
                                <option value="Chimbote">Chimbote</option>
                                <option value="Piura">Piura</option>
                                <option value="Tarapoto">Tarapoto</option>
                                <option value="Chepén">Chepén</option>
                                <option value="Huaraz">Huaraz</option>
                                <option value="Moyobamba">Moyobamba</option>
                            </select>
                            <label for="new-campus">Campus</label>
                        </div>
                        <div class="form-group">
                            <input id="new-numCel" type="text" name="new-numCel" required>
                            <label for="new-numCel">Número de Celular</label>
                        </div>
                        <div class="form-group">
                            <input id="new-pass" type="text" name="new-pass" required>
                            <label for="new-pass">Contraseña</label>
                        </div>
                    </div>
                
                    <div class="image-preview">
                        <img src="assets/images/profile.png" alt="">
                        <label for="upload-image"><i class="ri-image-add-line"></i></label>
                        <input type="file" id="upload-image" name="upload-image" accept="image/*" required>
                        <button id="btnCrearUsuario" type="submit">Crear nuevo usuario</button>
                    </div>
                </form>
        </div>    
    </div>
</div>

<div id="modalEliminarUsuario">
    <div class="modalEliminarUsuario modal-close">
        <p id="closeEliminarUsuario" class="closeEliminarUsuario">X</p>
        <div class="modal-texts">
        <h2>Eliminar Video</h2>
        <p>¿Estás seguro de que deseas eliminar este video?</p>
            <button id="confirm-delete-btn">Eliminar</button>
            <button id="cancel-delete-btn">Cancelar</button>
        </div>
    </div>
</div>

    <?php require_once("view/head/main.php"); ?>

    <h3 class="separator">Administrar Usuarios</h3>

    <!-- Botón para agregar un nuevo usuario -->
    <button id="btnAgregarUsuario">Agregar Nuevo Usuario <i class="ri-add-line"></i></button>

    <!-- Tabla de usuarios -->
    <section class="usuario-table">
        <table id="usersRows">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Más</th>
                </tr>
            </thead>
            <tbody id="usuarios-list">
            </tbody>
        </table>
    </section>

    <?php require_once("view/head/aside.php"); ?>

    <h3>Detalles de Usuario</h3>

    <section class="details-info">
        <header>
            <div class="info">
                <div id="btnSwitchRole" class="edit">
                    <i class="ri-user-line"></i>
                </div>
                <p id="user-role">Null</p>
            </div>
            <div class="profile">
                <img id="user-profile-pic" src="assets/images/profile.png" alt="Profile Picture">
            </div>
            <div class="info">
                <div id="btnUploadImage" class="edit">
                    <i class="ri-image-edit-line"></i>
                </div>
                <p>Subir Imagen</p>
            </div>
        </header>

        <div class="form-details">
            <form action="" id="user-details-form">
                <input type="hidden" id="user-id" name="id">
                <div class="about">
                    <div class="user">
                        <h2 id="user-username">null</h2>
                    </div>
                    <div class="carrera select-container">
                        <p id="user-carrera">null</p>
                        <select id="carrera-select" style="display: none;" class="active">
                            <option value="-1" disabled selected>Carrera Profesional</option>
                            <option value="Administración y Marketing">Administración y Marketing</option>
                            <option value="Administración y Negocios Internacionales">Administración y Negocios Internacionales</option>
                            <option value="Administración">Administración</option>
                            <option value="Administración en Turimos y Hotelería">Administración en Turimos y Hotelería</option>
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
                            <option value="Estomología">Estomología</option>
                            <option value="Medicina">Medicina</option>
                            <option value="Nutrición">Nutrición</option>
                            <option value="Psicología">Psicología</option>
                            <option value="Tecnología Médica">Tecnología Médica</option>
                        </select>
                        <div class="edit-carrera">
                            <i style="display: none;" id="editCarrera" class="ri-edit-box-line"></i>
                        </div>
                    </div>
                </div>

                <div class="inputs">
                    <div class="detailsUser">
                        <input type="text" id="name" name="nombreUser" class="editable" disabled autocomplete="off">
                        <label for="name">Nombre</label>
                    </div>
                    <div class="detailsUser">
                        <input type="text" id="apePa" name="last_namePa" class="editable" disabled>
                        <label for="apePa">Apellido Paterno</label>
                    </div>
                    <div class="detailsUser">
                        <input type="text" id="apeMa" name="last_nameMa" class="editable" disabled>
                        <label for="apeMa">Apellido Materno</label>
                    </div>
                    <div class="detailsUser">
                        <input type="date" id="fechNac" name="fechNac" class="editable" disabled>
                        <label for="fechNac">Fecha de Nacimiento</label>
                    </div>
                    <div class="detailsUser">
                        <select name="sex" id="sex" class="editable" disabled>
                            <option value="" disabled selected></option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        <label for="sex">Sexo</label>
                    </div>
                    <div class="detailsUser">
                        <input type="email" id="mail" name="mail" class="editable" disabled>
                        <label for="mail">Email</label>
                    </div>
                    <div class="detailsUser">
                        <select id="campus" name="campus" class="editable" disabled>
                            <option value="" disabled selected></option>
                            <option value="Los Olivos">Los Olivos</option>
                            <option value="Trujillo">Trujillo</option>
                            <option value="Ate">Ate</option>
                            <option value="Callao">Callao</option>
                            <option value="San Juan de Luriganchos">San Juan de Lurigancho</option>
                            <option value="Chiclay">Chiclayo</option>
                            <option value="Chimbote">Chimbote</option>
                            <option value="Piura">Piura</option>
                            <option value="Tarapoto">Tarapoto</option>
                            <option value="Chepén">Chepén</option>
                            <option value="Huaraz">Huaraz</option>
                            <option value="Moyobamba">Moyobamba</option>
                        </select>
                        <label for="campus">Campus</label>
                    </div>
                    <div class="detailsUser">
                        <input type="text" id="numCel" name="numCel" class="editable" disabled>
                        <label for="numCel">Número de Celular</label>
                    </div>
                </div>
                <div class="btns">
                    <button type="button" id="btnCancel" style="display: none;">Cancelar</button>
                    <button type="submit" id="btnSave" style="display: none;">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </section>
</aside>

<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/API/usuarios.js"></script>
<script src="assets/js/navigation.js"></script>
</body>

</html>