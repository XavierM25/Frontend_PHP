
//SLIDER IMAGENES
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slider .list');
    const dots = document.querySelectorAll('.dot');
    let index = 0;

    function getSlideWidth() {
        return slides.firstElementChild.clientWidth;
    }

    function nextSlide() {
        index = (index + 1) % slides.children.length;
        showSlide();
    }

    function showSlide() {
        const slideWidth = getSlideWidth();
        slides.style.transform = `translateX(-${index * slideWidth}px)`;
        updateActiveDot();
    }

    function updateActiveDot() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    window.addEventListener('resize', showSlide);

    setInterval(nextSlide, 5000); // Cambia el slide cada 5 segundos

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            showSlide();
        });
    });

    showSlide(); // Mostrar el primer slide al cargar la página
});


/* CONTEO DE CARÁCTERES TEXTAREA FORM */
const textarea = document.getElementById('comments');

// Selecciona el contador de caracteres
const charCounter = document.querySelector('.char-counter');

// Agrega un evento de escucha al textarea para detectar cambios en su contenido
textarea.addEventListener('input', function() {
    // Obtiene la longitud del contenido del textarea
    const textLength = this.value.length;
    // Muestra la longitud actual y la longitud máxima permitida en el contador
    charCounter.textContent = `${textLength}/500`;
});
