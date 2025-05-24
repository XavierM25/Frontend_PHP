<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">Administrar Actividades Culturales</h3>

<section class="cont-activities">
    <div class="top">
        <div class="categories">
            <div class="title">
                <h3>Categorías</h3>
            </div>
            <div class="list-cate">
                <ul>
                </ul>
            </div>
        </div>
        <div class="subcategories">
            <div class="title">
                <h3>Subcategorías</h3>
            </div>
            <div class="list-subcate">
                <ul>
                </ul>
            </div>
            <form action=""  method="post" class="create-subcate" id="createSubCate">
                <div class="title">
                    <h3>Crear Subcategoría</h3>
                </div>
                <div class="inpts">
                    <select name="categoriaId" class="categoria-select" id="categoriaSelect" required>
                    </select>
                </div>
                <div class="inpts">
                    <input type="text" name="subCategorie-Name" class="subcategoria-input" id="subcategoriaInput" placeholder="Nombre de la subcategoría">
                    <input type="number" name="subCategorie-Vaca" class="vacantes-input" id="vacantesInput" placeholder="0">
                </div>
                <div class="btn-subcate">
                    <button type="submit" class="btn-crear-subcate">Crear</button>
                </div>
            </form>
        </div>
    </div>
    <div class="bottom">
        <form action="" id="formDetallesSubcategoria">
            <div class="details-subca">
                <div class="title">
                    <h3>Detalles de la Subcategoría</h3>
                </div>
                <div class="inpts">
                    <input type="text" name="subCa-Name" class="detalle-nombre-input" id="detalleNombreInput">
                    <input type="number" name="subCa-Vaca" class="detalle-vacantes-input" id="detalleVacantesInput">
                </div>
                <div class="btns-sucate">
                    <button id="btnGuardarCambios" class="btn-guardar">Guardar</button>
                    <button id="btnEliminar" class="btn-eliminar">Eliminar</button>
                </div>
            </div>
        </form>
    </div>
</section>

<?php
require_once("view/head/aside.php");
?>

<h3 class="separator">Horarios</h3>

<section class="horaries-subca">
    <div class="list-horaries">
        <ul class="horarios-list">
        </ul>
    </div>

    <form action="" method="post" id="createHorarie">
        <div class="inpts-horaries">
            <select name="day" class="horario-dia-select">
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
            </select>
            <div class="inpts-hours">
                <input type="text" name="hour_inicio" class="horario-input">
                <input type="text" name="hour_fin" class="horario-input">
            </div>
        </div>
        <div class="btns-sucate">
            <button type="submit" id="btnCrearHorario" class="btn-agregar-horario">Agregar Horario</button>
        </div>
    </form>   
</section>

<h3 class="separator">Vacantes</h3>

<section class="vacantes-cat">
    <div class="list-vacantes">
        <div class="total">
            <h5>Total de Vacantes</h5>
            <span id="totalVacantes"></span>
        </div>
        <div class="disponibles">
            <h5>Vacantes disponibles</h5>
            <span id="vacantesDisponibles"></span>
        </div>
        <div class="ocupadas">
            <h5>Vacantes ocupadas</h5>
            <span id="vacantesOcupadas"></span>
        </div>
    </div>
</section>

<script src="assets/js/API/actividades.js"></script>
<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
</body>

</html>
