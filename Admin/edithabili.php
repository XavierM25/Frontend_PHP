<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">Administrar Habilidades</h3>

<section class="usuario-habilites">
    <table id="usuarios-table">
        <thead>
            <tr>
                <th>Seleccionar</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Puntos</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</section>

<?php
    require_once("view/head/aside.php");
?>

<h3 class="Separator">Asignar Categoria</h3>

<section class="asign-cont">
    <div class="user-sel">
        <label for="userSelected">Usuario</label>
        <input type="text" name="userSelect" id="userSelected" readonly>
    </div>
    <div class="categorie-select">
        <label for="category-select">Categoria</label>
        <select name="category" id="category-select">
            <option value="-1">Categorías</option>
        </select>
    </div>
    <div class="subcategories-select">
        <label for="subcategory-select">Subcategoria</label>
        <select name="subcategory" id="subcategory-select">
            <option value="-1">Subcategorías</option>
        </select>
    </div>
    <div class="subcategorie-Point">
        <label for="points-input">Puntos</label>
        <input type="text" name="points" id="points-input">
    </div>
    <div class="state">
        <label for="state-select">Estado</label>
        <select name="state" id="state-select">
            <option value="Estudiante Destacado">Estudiante Destacado</option>
        </select>
    </div>
    
    <div class="btns-abilities">
        <button id="assign-btn">Asignar</button>
        <button id="edit-btn">Editar</button>
        <button id="cancel-btn">Cancelar</button>
    </div>
</section>

<h3 class="separator">Funciones Adicionales</h3>
<section class="aditionals">
    <button id="reset-btn">Restablecer</button>
</section>

<script src="assets/js/API/habilidades.js"></script>
<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
</body>
</html>
