<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">
    Administrar Inscripciones
</h3>

<section class="registrations">
        <table class="registrations-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Subcategoria</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>N° Vacante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="registrations-list">

            </tbody>
        </table>
    </section>



<?php
require_once("view/head/aside.php");
?>

<h3 class="separator">Detalle Inscripción</h3>

<section class="registration-details">
        <div class="regi-body">
            <div class="info-header">
                <input type="hidden" id="ins-id" name="id">
                <div class="user-info">
                    <h3 id="username">Selecciona un registro</h3>
                    <p id="user-email">null@null.com</p>
                </div>
                <div class="vacant-info">
                    <label for="vacancy">N° Vacante:</label>
                    <input type="number" id="vacancy" value="0" readonly disabled>
                </div>
            </div>
            <div class="registration-info">
                <div class="info-section">
                    <label for="category">Categoría:</label>
                    <select id="category" disabled>
                        <option value="-1">Categorías</option>

                    </select>
                </div>

                <div class="info-section">
                    <label for="subcategory">Subcategoría:</label>
                    <select id="subcategory" disabled>
                        <option value="-1">Subcategorías</option>
                    </select>
                </div>

                <div class="fech-state">
                    <div class="info-section">
                        <label for="date">Fecha de Registro:</label>
                        <input type="date" id="date" value="" readonly disabled>
                    </div>

                    <div class="info-section">
                        <label for="status">Estado:</label>
                        <select id="status" disabled>
                            <option value="-1">Estado</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>
                </div>

                <div class="horarie-edit">
                    <div class="info-section">
                        <label for="day-regis">Día registrado:</label>
                        <select name="day" id="day-regis" class="horario-dia-select" disabled>
                            <option value="-1">Día registrado</option>
                        </select>
                    </div>
                    <div class="info-section">
                        <label for="horarie-regis"">Horario Registrado:</label>
                        <input type="text" id="horarie-regis" name="hour" class="horario-input" placeholder="Hora registrado" disabled>
                    </div>
                </div>

                <div class="info-section">
                    <label for="comments">Commentarios del Usuario:</label>
                    <textarea id="comments" readonly></textarea>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="btn-save" class="save-button" style="display: none;">Guardar Cambios</button>
            <button id="btn-delete" class="delete-button" style="display: none;">Eliminar</button>
        </div>
    </section>
</aside>

<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
<script src="assets/js/API/inscripciones.js"></script>

</body>

</html>