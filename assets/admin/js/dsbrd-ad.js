const sidebarItems = document.querySelectorAll('.sidebar .item');
const tableRows = document.querySelectorAll('.main table tbody tr');

const menuBtn = document.getElementById('menu-btn');
const leftSection = document.querySelector('.left-section');

let isMenuOpen = false;

sidebarItems.forEach(sideItem => {
    sideItem.addEventListener('click', () => {
        sidebarItems.forEach(item => {
            item.classList.remove('active');
        });
        sideItem.classList.add('active');
    });
});

tableRows.forEach(tableTr => {
    tableTr.addEventListener('click', () => {
        tableRows.forEach(item => {
            item.classList.remove('selected');
        });
        tableTr.classList.add('selected');
    });
});

menuBtn.addEventListener('click', () => {
    if (!isMenuOpen) {
        leftSection.style.left = '0';
    } else {
        leftSection.style.left = '-160px';
    }
    isMenuOpen = !isMenuOpen;
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
                window.location.href = '/Login%20Admin/index.php'; // Redirige al usuario al login
            } else {
                // Manejar cualquier error de respuesta aquí
                console.error('Error al cerrar sesión:', response.statusText);
            }
        })
        .catch(error => console.error('Error en fetch:', error));
    });
});


