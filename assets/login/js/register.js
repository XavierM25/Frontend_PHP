// register.js
document.getElementById('regi-sign-up').addEventListener('click', function(e) {
    e.preventDefault();
        var nombre = document.getElementById('name-regi').value;
        var apellido_paterno = document.getElementById('apep-regi').value;
        var apellido_materno = document.getElementById('apem-regi').value;
        var sexo = document.querySelector('input[name="sex"]:checked').value;
        var contraseña = document.getElementById('pass-regi').value;
        var veriContra = document.getElementById('pass_ve-regi').value;
        var email = document.getElementById('email-regi').value;
        var fecha_nacimiento = document.getElementById('naci-regi').value;
        var campus = document.getElementById('campus_ucv').value;
        var carrera = document.getElementById('carrera_ucv').value;
        var numero_telefono = document.getElementById('cel-regi').value;

        fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                sexo: sexo,
                contraseña: contraseña,
                contraseña_confirmation: veriContra,
                email: email,
                fecha_nacimiento: fecha_nacimiento,
                campus: campus,
                carrera: carrera,
                numero_telefono: numero_telefono
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                showCustomAlert(data.username);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});


    function showCustomAlert(username) {
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.innerHTML = `
            <div class="alert-box">
                <p>Registro Exitoso!</p>
                <p>Tu usuario es: ${username}</p>
                <button id="copyUsernameBtn">Copiar al portapapeles</button>
                <button id="closeAlertBtn">Cerrar</button>
            </div>
        `;
        
        document.body.appendChild(customAlert);

        const copyUsernameBtn = document.getElementById('copyUsernameBtn');
        const closeAlertBtn = document.getElementById('closeAlertBtn');
    
        copyUsernameBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(username).then(() => {
                alert('Usuario copiado al portapapeles');
            });
        });
    
        closeAlertBtn.addEventListener('click', () => {
            document.body.removeChild(customAlert);
            window.location.href = "/Login/login.php"; // Redirigir a la página de login
        });
    }