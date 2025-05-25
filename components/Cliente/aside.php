</main>
<aside class="right-section">
    <section class="profile">
        <div class="info">
            <i class="ri-user-3-line"></i>
            <h5 id="welcome-message"></h5>
        </div>
        <div class="user">
            <i class="ri-notification-2-line"></i>
            <img id="user-profile-img" src="">
        </div>
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
                console.log('Datos del perfil:', data);

                // Actualizar el mensaje de bienvenida con el nombre de usuario
                const welcomeMessage = document.getElementById('welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.textContent = 'Bienvenido, ' + (data.data.nombre || '');
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
