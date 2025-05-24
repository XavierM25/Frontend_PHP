</main>
<aside class="right-section">
    <section class="profile">
        <div class="info">
            <img id="user-profile-img" src="">
            <div class="account">
                <h5 id="welcome-user"></h5>
                <p id="welcome-email"></p>
            </div>
        </div>
        <i class="ri-arrow-down-s-line"></i>
    </section>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Función para obtener y mostrar datos del perfil
        function fetchProfileData() {
            fetch('http://127.0.0.1:8000/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del perfil');
                }
                return response.json(); // Parseamos la respuesta a JSON
            })
            .then(data => {
                // Actualizar el nombre de usuario
                const welcomeUser = document.getElementById('welcome-user');
                if (welcomeUser) {
                    welcomeUser.textContent = data.data.username || '';
                }

                // Actualizar el email
                const welcomeEmail = document.getElementById('welcome-email');
                if (welcomeEmail) {
                    welcomeEmail.textContent = data.data.email || '';
                }

                // Actualizar la imagen de perfil si existe
                const userProfileImg = document.getElementById('user-profile-img');
                if (userProfileImg && data.data.imagen_perfil) {
                    const perfilImageUrl = 'http://127.0.0.1:8000/' + data.data.imagen_perfil;
                    userProfileImg.src = perfilImageUrl;
                    userProfileImg.alt = 'Perfil de ' + (data.data.nombre || 'Usuario');
                }
            })
            .catch(error => console.error('Error al obtener datos de perfil:', error.message));
        }

        // Llamar a la función para obtener los datos del perfil al cargar la página
        fetchProfileData();
    });
</script>

