<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<section class="separator-rank">
    <h1>Ranking | Deportes, Cultura y Talleres UCV</h1>
    <ul class="categories-rank">
    </ul>
    <ul class="subcategories-rank">
    </ul>
</section>

<section class="rankUser-cont">
    <div class="descCont">

    </div>
</section>

<button id="btnViewMore" type="button">Ver Más</button>

<section class="table-content">
    <div id="tableRank" class="table-rank hidden">  
        <table>
            <thead>
                <tr>
                    <th>Puesto</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Categoría</th>
                    <th>Puntos</th>
                    <th>Estado</th>
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
    <h3>Detalle Estudiante</h3>
    <section class="student-details" id="student-details">
        <div class="detailsCon">
            <div class="detailHead">
                <h2 id="studetPosition">#1</h2>
                <p id="studentCategorySubca">- | -</p>
            </div>
            <img id="studentImage" src="assets/images/profile.png" alt="">
            <div class="detailsBody">
                <h3 id="studentFullName">null</h3>
                <p id="studentCareer">null</p>
            </div>
            <div class="detailsForm">
                <form action="">
                    <div class="detailsInpt">
                        <input id="detailCat" type="text" readonly>
                        <label for="detailCat">Categoría</label>
                    </div>
                    <div class="detailsInpt">
                        <input id="detailSubCat" type="text" readonly>
                        <label for="detailSubCat">Subcategoría</label>
                    </div>
                    <div class="detailsInpt">
                        <input id="detailPuntos" type="text" readonly>
                        <label for="detailPuntos">Puntos</label>
                    </div>
                </form>
            </div>
        </div>
        
    </section>
</aside>

<script src="assets/js/navigation.js"></script>
<script src="assets/js/API/ranking.js"></script>
</body>
</html>
