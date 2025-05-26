<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<section class="ins-container">
    <div class="txt-right">
        <h3>INSCRIPCIONES</h3>
        <p>Inscribete en las distintos disciplinas</p>
        <span>Recuerda verificar las vacantes disponibles</span>
    </div>

    <div class="form-cont">
        <form action="" id="inscriptionForm">
            <div class="cont-field">
                <h4>Selecciona una categoría</h4>
                <div class="fields">
                    <div class="field-input">
                        <select id="selectCategoria" name="categoria_id">
                            <option value="" disabled selected>Selecciona una categoría</option>
                            <!-- Opciones de categoría -->
                        </select>
                    </div>
                    <div class="field-input">
                        <select id="selectSubcategoria" name="subcategoria_id">
                            <option value="" disabled selected>Subcategoría</option>
                            <!-- Opciones de subcategoría -->
                        </select>
                    </div>
                </div>
            </div>

            <div class="cont-field">
                <h4>Selecciona el día disponible</h4>
                <div class="fields checkboxes">
                    <div class="checkbox-group l-j">
                        <label><input type="checkbox" name="dias[]" value="Lunes" disabled> Lunes</label>
                        <label><input type="checkbox" name="dias[]" value="Martes" disabled> Martes</label>
                        <label><input type="checkbox" name="dias[]" value="Miércoles" disabled> Miércoles</label>
                        <label><input type="checkbox" name="dias[]" value="Jueves" disabled> Jueves</label>
                    </div>
                    <div class="checkbox-group v-d">
                        <label><input type="checkbox" name="dias[]" value="Viernes" disabled> Viernes</label>
                        <label><input type="checkbox" name="dias[]" value="Sábado" disabled> Sábado</label>
                        <label><input type="checkbox" name="dias[]" value="Domingo" disabled> Domingo</label>
                    </div>
                </div>
            </div>

            <div class="cont-field">
                <h4>Selecciona el horario</h4>
                <div class="fields">
                    <div class="field-input">
                        <select id="selectHorario" name="horario_id">
                            <option value="" disabled selected>Selecciona un horario</option>
                            <!-- Agrega más opciones según sea necesario -->
                        </select>
                    </div>
                </div>
            </div>

            <div class="cont-field">
                <h4>Comentarios</h4>
                <div class="fields">
                    <div class="field-input">
                        <textarea id="comments" name="comentarios" placeholder="Comentarios" maxlength="500"></textarea>
                        <div class="char-counter">0/500</div>
                    </div>
                </div>
            </div>

            <div class="button-field">
                <button id="createInscrip" type="submit">Enviar</button>
            </div>
        </form>
    </div>
</section>


<?php
require_once("view/head/aside.php");
?>

<section class="slider">
    <div class="list">
        <div class="itemSl">
            <img src="" alt="img1">
        </div>
        <div class="itemSl">
            <img src="" alt="img2">
        </div>
        <div class="itemSl">
            <img src="" alt="img3">
        </div>
        <div class="itemSl">
            <img src="" alt="img4">
        </div>
        <div class="itemSl">
            <img src="" alt="img5">
        </div>
    </div>

    <ul class="dotSl">
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
    </ul>
</section>

<h3>Vacantes Disponibles</h3>

<div class="vacancy-section">
    <div class="vacancy-categories">
        <input id="vacancyCategorie" type="text" readonly>
        <input id="vacancySubCategorie" type="text" readonly>
    </div>
    <div class="vacancy-info">
        <div class="total">
            <i class="ri-file-list-3-line"></i>
            <p>Total: <span id="totalVacancies">0</span></p>
        </div>
        <div class="ocupadas">
            <i class="ri-calendar-close-fill"></i>
            <p>Ocupadas: <span id="occupiedVacancies">0</span></p>
        </div>
        <div class="diponibles">
            <i class="ri-calendar-check-fill"></i>
            <p>Disponibles: <span id="availableVacancies">0</span></p>
        </div>
    </div>
</div>

</aside>

<script src="assets/js/navigation.js"></script>
<script src="assets/js/elementsInscrip.js"></script>
<script src="assets/js/API/inscripciones.js"></script>
</body>
</html>
