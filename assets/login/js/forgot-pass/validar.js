document.addEventListener('DOMContentLoaded', function() {
    const verificationForm = document.getElementById('verificationForm');
    const codeInputs = document.querySelectorAll('.veriCode-input');
    const token = new URLSearchParams(window.location.search).get('token');
    
    verificationForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const otp = Array.from(codeInputs).map(input => input.value).join('');
    
        if (!otp || otp.length !== 6) {
            alert('Por favor, ingrese un código OTP válido (6 dígitos)');
            return;
        }
    
        fetch('http://127.0.0.1:8000/api/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token: token, otp: otp }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.message === 'Código OTP válido') {
                window.location.href = `/Login/nuevapass.php?token=${token}&otp=${otp}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al validar el código OTP. Por favor, inténtelo de nuevo.');
        });
    });
});
