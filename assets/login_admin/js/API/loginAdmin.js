document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            contraseña: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol_id', data.rol_id);
            
            if (data.rol_id === 2) { // Administrador
                window.location.href = data.home_route; // Usar la ruta proporcionada en la respuesta
            } else if (data.rol_id === 1) { // Cliente
                alert("No tienes autorización para iniciar sesión como Cliente desde esta página.");
                window.location.href = "http://localhost:3000/Login/login.php";
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Función para mostrar/ocultar contraseña
function mostrarContrasena(idPassword, idIcon) {
    let inputPassword = document.getElementById(idPassword);
    let icon = document.getElementById(idIcon);

    if (inputPassword.type === "password" && icon.classList.contains("ri-eye-line")) {
        inputPassword.type = "text";
        icon.classList.replace("ri-eye-line", "ri-eye-off-line");
    } else {
        inputPassword.type = "password";
        icon.classList.replace("ri-eye-off-line", "ri-eye-line");
    }
}
