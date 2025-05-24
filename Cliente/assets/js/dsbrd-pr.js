const allVideos = document.querySelectorAll('video');
const sidebar = document.querySelector('.left-section');
const sidebarItems = document.querySelectorAll('.sidebar .item');

// Play/Pause video on mouse enter/leave
allVideos.forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseleave', () => {
        video.pause();
    });
});

// Handle sidebar item click
sidebarItems.forEach(sideItem => {
    sideItem.addEventListener('click', () => {
        sidebarItems.forEach(item => {
            item.classList.remove('active');
        });
        sideItem.classList.add('active');
    });
});

// Move sidebar on small devices scroll
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 992) {
        if (this.scroll > 20) {
            sidebar.style.paddingTop = '20px';
        } else {
            sidebar.style.paddingTop = '70px';
        }
    }
});


//LOGOUT
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('#logout-button');

    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/logout', {
            method: 'GET', // Usualmente se usa GET para logout en APIs RESTful
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Ajusta esto según cómo manejes el token en tu frontend
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('token'); // Elimina el token del almacenamiento local
                window.location.href = '/Login/login.php'; // Redirige al usuario al login
            } else {
                // Manejar cualquier error de respuesta aquí
                console.error('Error al cerrar sesión:', response.statusText);
            }
        })
        .catch(error => console.error('Error en fetch:', error));
    });
});