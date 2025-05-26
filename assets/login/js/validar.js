function validateStep1() {
    let isValid = true;
    let messages = [];

    const name = document.getElementById('name-regi').value.trim();
    const apellidoPaterno = document.getElementById('apep-regi').value.trim();
    const apellidoMaterno = document.getElementById('apem-regi').value.trim();

    if (!name || !apellidoPaterno || !apellidoMaterno) {
        messages.push('Complete los campos');
        isValid = false;
    } else {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (!regex.test(name)) {
            messages.push('El nombre no debe contener números ni símbolos');
            isValid = false;
        }
        if (!regex.test(apellidoPaterno)) {
            messages.push('El apellido paterno no debe contener números ni símbolos');
            isValid = false;
        }
        if (!regex.test(apellidoMaterno)) {
            messages.push('El apellido materno no debe contener números ni símbolos');
            isValid = false;
        }
    }

    if (!isValid) {
        alert(messages.join('\n'));
    }

    return isValid;
}

function validateStep2() {
    let isValid = true;
    let messages = [];

    const fechaNacimiento = document.getElementById('naci-regi').value;
    const sexo = document.querySelector('input[name="sex"]:checked');

    if (!fechaNacimiento || !sexo) {
        messages.push('Completa los campos');
        isValid = false;
    } else {
        const inputDate = new Date(fechaNacimiento);
        const today = new Date();
        const minDate = new Date('1930-01-01');
        const minAgeDate = new Date();
        minAgeDate.setFullYear(minAgeDate.getFullYear() - 16);

        if (isNaN(inputDate.getTime())) {
            messages.push('Introduzca una fecha válida');
            isValid = false;
        } else if (inputDate > today || inputDate < minDate) {
            messages.push('Introduzca una fecha de nacimiento válida');
            isValid = false;
        } else if (inputDate > minAgeDate) {
            messages.push('Debe ser mayor de 16 años para registrarse');
            isValid = false;
        }
    }

    if (!isValid) {
        alert(messages.join('\n'));
    }

    return isValid;
}

function validateStep3() {
    let isValid = true;
    let messages = [];

    const email = document.getElementById('email-regi').value;
    const carrera = document.getElementById('carrera_ucv').value;
    const campus = document.getElementById('campus_ucv').value;
    const numeroTelefono = document.getElementById('cel-regi').value;

    if (!email || carrera === "-1" || campus === "-1" || !numeroTelefono) {
        messages.push('Completa los campos');
        isValid = false;
    } else {
        if (!validateEmail(email)) {
            messages.push('Ingrese un correo válido');
            isValid = false;
        }

        if (carrera === "-1") {
            messages.push('Escoja una carrera');
            isValid = false;
        }

        if (campus === "-1") {
            messages.push('Escoja un campus');
            isValid = false;
        }

        if (!/^\d{9}$/.test(numeroTelefono) || !/^9/.test(numeroTelefono)) {
            messages.push('Introduzca un número válido. El número debe comenzar con 9 y tener 9 dígitos.');
            isValid = false;
        }
    }

    if (!isValid) {
        alert(messages.join('\n'));
    }

    return isValid;
}

function validateStep4() {
    let isValid = true;
    let messages = [];

    const password = document.getElementById('pass-regi').value;
    const confirmPassword = document.getElementById('pass_ve-regi').value;

    if (!password || !confirmPassword) {
        messages.push('Completa los campos');
        isValid = false;
    } else {
        if (!validatePassword(password)) {
            messages.push('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un símbolo y tener entre 5 a más caracteres.');
            isValid = false;
        }

        if (password !== confirmPassword) {
            messages.push('Las contraseñas no coinciden');
            isValid = false;
        }
    }

    if (!isValid) {
        alert(messages.join('\n'));
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return re.test(password);
}

window.validateStep1 = validateStep1;
window.validateStep2 = validateStep2;
window.validateStep3 = validateStep3;
window.validateStep4 = validateStep4;