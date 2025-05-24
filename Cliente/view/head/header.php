<?php
require_once("view/head/head.php");
?>

<header class="left-section">
    <div class="logo">
    </div>
    <nav>
        <ul class="sidebar">
            <li class="item">
                <a href="index.php">
                    <i class="ri-home-4-line"></i>
                    <h3>Dashboard</h3>
                </a>
            </li>
            <li class="item">
                <a href="editcliente.php">
                    <i class="ri-user-6-line"></i>
                    <h3>Mi Perfil</h3>
                </a>
            </li>
            <li class="item">
                <a href="ranking.php">
                    <i class="ri-bar-chart-line"></i>
                    <h3>Ranking</h3>
                </a>
            </li>
            <li class="item">
                <a href="inscripciones.php">
                    <i class="ri-article-line"></i>
                    <h3>Inscripciones</h3>
                </a>
            </li>
            <li class="item">
                <a href="ajustes.php">
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