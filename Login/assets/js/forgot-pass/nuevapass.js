document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPassword = document.getElementById('pass').value;
        const confirmPassword = document.getElementById('veri-pass').value;
        const token = document.querySelector('input[name="token"]').value;
        const otp = document.querySelector('input[name="otp"]').value;

        // Validar contraseña usando la misma función de validación que tienes en el frontend
        if (!validatePassword(newPassword)) {
            alert("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un símbolo y tener entre 5 a más caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        fetch('http://127.0.0.1:8000/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                otp: otp,
                password: newPassword,
                password_confirmation: confirmPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'Contraseña restablecida exitosamente') {
                window.location.href = '/Login/login.php'; // Redirige al usuario al login después de restablecer la contraseña
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al restablecer la contraseña. Por favor, inténtelo de nuevo.');
        });
    });

    // Función para validar la contraseña
    function validatePassword(password) {
        const re = /^(?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return re.test(password);
    }
});
