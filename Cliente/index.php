
<?php require_once("view/head/header.php");?>

<?php require_once("view/head/main.php");?>

<section class="banner">
    <div class="share">
        <i class="ri-share-forward-line"></i>
        <i class="ri-more-fill"></i>
    </div>
    <div class="video-info">
        <div class="item">
            <h3>El Video Popular de Hoy :</h3>
        </div>
        <div class="item">
            <i class="ri-thumb-up-line"></i>
            <h3 id="likesPopular">230</h3>
        </div>
        <div class="item">
            <i class="ri-calendar-line"></i>
            <h3 id="date-created">20 Mar</h3>
        </div>
    </div>
    <video id="popularVideo" src="" muted loop></video>
</section>

<section class="separator">
    <h3>Descubre Deportes y Noticias</h3>
        <ul class="categories">
            <!-- Categorias -->
        </ul>
        <ul class="subcategories">
            <!--Subcategorias-->
        </ul>
</section>


<section class="video-items-cont">
    
</section>

<?php require_once("view/head/aside.php"); ?>

<h3>Reproduciendo Actualmente</h3>

<section class="player">
    <div class="content">
        <video src="" preload="metadata" muted loop></video>
        <div class="info">
            <h5>No se está reproduciendo un video</h5>
            <div class="rate">
                <i class="ri-heart-2-fill"></i>
                <h5>UCV</h5> 
            </div>
        </div>
    </div>
    <i class="ri-pause-large-line"></i>
</section>

<h3>Ranking | Desempeño</h3>
<section class="ranking">

</section>

<script src="assets/js/dsbrd-pr.js"></script>
<script src="assets/js/API/index.js"></script>
<script src="assets/js/navigation.js"></script>
</body>
</html>