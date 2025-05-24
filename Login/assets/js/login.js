const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// login.js
document.getElementById('log-sign-in').addEventListener('click', function(e) {
    e.preventDefault();

    var username = document.getElementById('user-login').value;
    var password = document.getElementById('pass-login').value;

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
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol_id', data.rol_id);
            
            if (data.rol_id === 1) { // Cliente
                window.location.href = data.home_route; // Usar la ruta proporcionada en la respuesta
            } else if (data.rol_id === 2) { // Administrador
                alert("Estás intentando iniciar sesión como administrador. ¿Quieres iniciar sesión como Administrador?");
                window.location.href = "http://localhost:3000/Login%20Admin/index.php";
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});


// GOOGLE
document.addEventListener('DOMContentLoaded', function() {
    const googleIcon = document.getElementById('google-icon');

    googleIcon.addEventListener('click', function(event) {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/auth/google', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
});

// Mostrar contraseña event
function mostrarContrasena(idPassword, idIcon) {
    let inputPassword = document.getElementById(idPassword);
    let icon = document.getElementById(idIcon);

    if (inputPassword.type === "password" && icon.classList.contains("fa-eye")) {
        inputPassword.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        inputPassword.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}
