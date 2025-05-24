<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">
    Categorías
</h3>

<section class="filter-rank">
    <section class="cate-rank">
        <!-- CATEGORIAS -->
    </section>

    <section class="subCate-rank">
        <!-- SUBCATEGORIAS -->
    </section>
</section>

<h3 class="separator sep-rkng">
    Ranking
</h3>

<section class="list-Rnk">
    <div class="tbl-deportes">
        <table id="ranking-list">
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Puntos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</section>

<?php
require_once("view/head/aside.php");
?>
<h3>Detalle</h3>
<section class="student-rank">
    <div class="fields">
        <label for="positionRnk">Posición:</label>
        <input type="text" name="" id="positionRnk" readonly>
    </div>
    <div class="fields">
        <label for="nameRnk">Nombre</label>
        <input type="text" name="" id="nameRnk" readonly>
    </div>
    <div class="fields">
        <label for="subCaRnk">Subcategoría</label>
        <input type="text" name="" id="subCaRnk" readonly>
    </div>
    <div class="fields">
        <label for="pointRnk">Puntos</label>
        <input type="text" name="" id="pointRnk" readonly>
    </div>
    <div class="fields">
        <label for="stateRnk">Estado</label>
        <input type="text" name="" id="stateRnk" readonly>
    </div>
    <a href="edithabili.php" id="edit-button" class="disabled"><i class="ri-external-link-line"></i> Editar</a>
</section>

</aside>
<script src="assets/js/API/ranking.js"></script>
<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
</body>

</html>