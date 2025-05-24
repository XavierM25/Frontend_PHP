document.addEventListener('DOMContentLoaded', function() {
    const recoverForm = document.getElementById('recoverForm');

    recoverForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('correo').value.trim();

        // Validación básica del correo electrónico
        if (!isValidEmail(email)) {
            alert('Por favor ingrese un correo electrónico válido.');
            return;
        }

        fetch('http://127.0.0.1:8000/api/recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => response.json())
        .then(data => {
            if (!data.status) {
                alert(data.message); // Mostrar mensaje de error de la API
            } else {
                alert(data.message); // Mostrar mensaje de éxito de la API
                const token = data.token;
                window.location.href = `/Login/validar.php?token=${token}&email=${email}`; // Redirigir con el token y email
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error en la solicitud.');
        });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
