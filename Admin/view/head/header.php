<?php
    require_once("head.php");
?>

<header class="left-section">
    <div class="logo">
    </div>

    <nav>
        <ul class="sidebar">
                <li class="item active">
                    <a href="index.php">
                        <i class="ri-apps-line"></i>
                        <h3>Dashboard</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="editusuarios.php">
                        <i class="ri-user-3-line"></i>
                        <h3>Usuarios</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="editvideos.php">
                        <i class="ri-video-on-line"></i>
                        <h3>Videos</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="editranking.php">
                        <i class="ri-bar-chart-2-line"></i>
                        <h3>Ranking</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="editactivi.php">
                        <i class="ri-bookmark-3-line"></i>
                        <h3>Actividades</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="edithabili.php">
                        <i class="ri-medal-2-line"></i>
                        <h3>Habilidades</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="editinscrip.php">
                        <i class="ri-article-line"></i>
                        <h3>Inscripciones</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="reportes.php">
                        <i class="ri-receipt-fill"></i>
                        <h3>Reportes</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="">
                        <i class="ri-id-card-line"></i>
                        <h3>Perfil</h3>
                    </a>
                </li>
                <li class="item">
                    <a href="">
                        <i class="ri-settings-3-line"></i>
                        <h3>Ajustes</h3>
                    </a>
                </li>
        </ul>
    </nav>

        <div class="sign-out">
            <a href="http://127.0.0.1:8000/api/logout" id="logout-button">
                <i class="ri-logout-box-r-line"></i>
                <h3>Cerrar Sesión</h3>
            </a>
        </div>
    
</header>