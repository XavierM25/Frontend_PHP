<?php require_once("../components/cliente/header.php"); ?>

<?php require_once("../components/cliente/main.php"); ?>

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

<?php require_once("../components/cliente/aside.php"); ?>

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

<script>
// Función para obtener los datos del perfil
async function fetchProfileData() {
    try {
        const response = await fetch("http://localhost/frontend_php/api/proxy/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.warn("Error al obtener datos de perfil:", error);
        return null;
    }
}

// Función para actualizar la información del perfil
async function updateProfileInfo() {
    try {
        const profileData = await fetchProfileData();
        if (profileData && profileData.status) {
            // Actualizar la información del perfil en el DOM
            const userData = profileData.data;
            
            // Actualizar la imagen de perfil
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                const imagePath = userData.imagen_perfil.replace('storage/', '');
                profileImage.src = `http://localhost/frontend_php/api/proxy/media/${imagePath}`;
                profileImage.onerror = function() {
                    this.src = 'http://localhost/frontend_php/assets/images/default.jpg';
                };
            }

            // Actualizar el nombre del usuario
            const userName = document.querySelector('.user-name');
            if (userName) {
                userName.textContent = `${userData.nombre} ${userData.apellido_paterno} ${userData.apellido_materno}`;
            }

            // Actualizar el correo electrónico
            const userEmail = document.querySelector('.user-email');
            if (userEmail) {
                userEmail.textContent = userData.email;
            }

            // Actualizar la carrera y campus si están disponibles
            const userCareer = document.querySelector('.user-career');
            if (userCareer && userData.carrera) {
                userCareer.textContent = userData.carrera;
            }

            const userCampus = document.querySelector('.user-campus');
            if (userCampus && userData.campus) {
                userCampus.textContent = userData.campus;
            }

            console.log("Perfil actualizado correctamente");
        } else {
            console.warn("No se pudo obtener la información del perfil");
        }
    } catch (error) {
        console.warn("Error al actualizar el perfil:", error);
    }
}

// Cargar los datos del perfil cuando el documento esté listo
document.addEventListener("DOMContentLoaded", updateProfileInfo);
</script>

<script src="../assets/cliente/js/dsbrd-pr.js"></script>
<script src="../assets/cliente/js/API/index.js"></script>
<script src="../assets/cliente/js/navigation.js"></script>
</body>

</html>