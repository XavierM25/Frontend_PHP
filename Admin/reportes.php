<?php
    require_once("view/head/header.php");
?>

<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">
    Reportes
</h3>

<div class="reports-cont">
    <div class="tlt">
        <h2>Opciones de Reporte</h2>
        <span>Selecciona el módulo que quieres generar un reporte y personaliza las opciones</span>
    </div>

    <div class="columns">
        <div class="left">
            <div class="inpts-reports">
                <div class="module">
                    <label for="modules">Módulo</label>
                    <select name="module" id="modules" onchange="updateOrderOptions()">
                        <option value="Usuarios">Usuarios</option>
                        <option value="Ranking">Ranking</option>
                        <option value="Actividades">Actividades</option>
                        <option value="Inscripciones">Inscripciones</option>
                    </select>
                </div>

                <div class="format">
                    <label for="formats">Formato</label>
                    <select name="format" id="formats">
                        <option value="Excel">Excel</option>
                        <option value="PDF">PDF</option>
                    </select>
                </div>

                <div class="dates">
                    <div class="start-date">
                        <label for="fecha_inicio">Fecha de Inicio</label>
                        <input type="date" name="start_date" id="fecha_inicio">
                    </div>

                    <div class="end-date">
                        <label for="fecha_fin">Fecha Final</label>
                        <input type="date" name="end_date" id="fecha_fin">
                    </div>
                </div>

                <div class="filters-order">

                    <div class="orders" id="orders-users">
                        <!-- Opciones de Orden para Usuarios -->
                        <label for="orders-users-select">Ordenar por:</label>
                        <select name="orders" id="orders-users-select">
<!-- -->
                        </select>
                    </div>

                    <div class="orders" id="orders-order">
                        <!-- Filtros para Usuarios -->
                        <label for="orden">Orden:</label>
                        <select id="orden" name="orden">
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                </div>

                <div class="btns-reports">
                    <button class="preview">Previsualizar</button>
                    <button class="report">Generar reporte</button>
                </div>
            </div>
        </div>

        <div class="right">
            <h4>Previsualización</h4>
            <div class="preview">
                <div class="cont-preview">
                </div>
            </div>
        </div>
    </div>
</div>



<?php
require_once("view/head/aside.php");
?>

<h3 class="separator"><i class="ri-history-line"></i> Historial</h3>

<section class="history">
    <div class="cont-hist">
        

    </div>
</section>

</aside>
<script src="assets/js/API/reportes.js"></script>
<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
<script>
    function updateOrderOptions() {
        const module = document.getElementById('modules').value;
        const orderSelect = document.getElementById('orders-users-select');
        let optionsHTML = '';
    
        switch (module) {
            case 'Usuarios':
                optionsHTML = `
                    <option value="username">Nombre de Usuario</option>
                    <option value="created_at">Fecha de Registro</option>
                    <option value="carrera">Carrera</option>
                `;
                break;
            case 'Ranking':
                optionsHTML = `
                    <option value="puntos">Puntaje</option>
                    <option value="posicion">Posición</option>
                    <option value="updated_at">Última Actualización</option>
                `;
                break;
            case 'Actividades':
                optionsHTML = `
                    <option value="dia">Horarios</option>
                    <option value="vacantes">Vacantes</option>
                `;
                break;
            case 'Inscripciones':
                optionsHTML = `
                    <option value="created_at">Fecha de Registro</option>
                    <option value="usuario">Usuario</option>
                    <option value="categoria">Categoría</option>
                `;
                break;
        }
    
        orderSelect.innerHTML = optionsHTML;
    }
    
    // Llamar la función cuando la página se carga para establecer las opciones iniciales
    document.addEventListener('DOMContentLoaded', updateOrderOptions);
</script>
</body>

</html>