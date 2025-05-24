
<?php
    require_once("view/head/header.php");
?>
<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">
            Acceso Rápido
        </h3>

        <section class="quick-access">
            <div class="item">
                <i class="ri-video-on-fill"></i>
                <h5>Videos</h5>
                <p id="totalVideos">0 videos</p>
            </div>
            <div class="item">
                <i class="ri-user-fill"></i>
                <h5>Usuarios</h5>
                <p id="totalUsers">0 usuarios</p>
            </div>
            <div class="item">
                <i class="ri-bar-chart-fill"></i>
                <h5>Ranking</h5>
                <p id="topRanking">-</p>
            </div>
            <div class="item">
                <i class="ri-article-fill"></i>
                <h5>Inscripciones</h5>
                <p id="registersApproved">0/0 registros</p>
            </div>
        </section>

        <h3 class="separator">
            Actividad Reciente
        </h3>

        <table class="recentActivity">
            <thead>
                <tr>
                    <th></th>
                    <th>Título</th>
                    <th>Likes/Nombres</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        <p id="noRecentActivity" style="display: none;">No se encontró actividad reciente</p>

<?php
require_once("view/head/aside.php");
?>

    <section class="widgets">
        <div class="records">
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="info">
                <h5><span id="approvedCount"></span> registros aprobados<span id="totalCount"></span></h5>
                <p>Registros</p>
            </div>
        </div>

        <div class="bottom">
            <button>Nuevo Video <i class="ri-add-line"></i></button>

            <div class="new-user">
                <div class="content">
                    <div class="title">
                        <h5>Nuevos Usuarios</h5>
                    </div>
                    <div class="image-user">
                        <div class="slider-container">
                            <div class="slides">
                                
                            </div>
                            <div class="controls">
                                <div class="left">
                                    <i class="ri-arrow-left-s-line"></i>
                                </div>
                                <div class="right">
                                    <i class="ri-arrow-right-s-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</aside>

    <script src="assets/js/dsbrd-ad.js"></script>
    <script src="assets/js/navigation.js"></script>
    <script src="assets/js/API/index.js"></script>
</body>

</html>