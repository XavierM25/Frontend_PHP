document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.pathname.split('/').pop(); // Obtiene el nombre de la página actual
    const links = document.querySelectorAll('.sidebar .item a');

    links.forEach(link => {
        if (link.getAttribute('href').includes(currentLocation)) { // Verifica si la URL del enlace incluye la página actual
            link.parentElement.classList.add('active'); // Añade la clase 'active' al elemento padre del enlace
        } else {
            link.parentElement.classList.remove('active'); // Elimina la clase 'active' del elemento padre del enlace si no coincide
        }
    });
});
