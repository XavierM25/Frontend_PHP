document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener y mostrar datos del perfil
    function fetchProfileData() {
        fetch('http://127.0.0.1:8000/api/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del perfil');
            }
            return response.json(); // Parseamos la respuesta a JSON
        })
        .then(data => {
            console.log('Datos del perfil:', data);

            // Llenar los campos del formulario con los datos del usuario
            document.getElementById('nomCli').value = data.data.nombre || '';
            document.getElementById('apePaCli').value = data.data.apellido_paterno || '';
            document.getElementById('apeMaCli').value = data.data.apellido_materno || '';
            document.getElementById('fechCli').value = data.data.fecha_nacimiento || '';
            document.getElementById('mailCli').value = data.data.email || '';
            document.getElementById('carreCli').value = data.data.carrera || '';
            document.getElementById('campuCli').value = data.data.campus || '';
            document.getElementById('celCli').value = data.data.numero_telefono || '';

            // Guardar el ID del usuario en una variable y en el campo oculto
            const userId = data.data.id;
            document.getElementById('user-id').value = userId;

            // Actualizar el username en el elemento <h2 id="user-username"></h2>
            const usernameElement = document.getElementById('user-username');
            if (usernameElement) {
                usernameElement.textContent = data.data.username || '';
            }

            // Actualizar la imagen de perfil si existe
            if (data.data.imagen_perfil) {
                const perfilImageUrl = 'http://127.0.0.1:8000/' + data.data.imagen_perfil;
                document.getElementById('user-profile-pic').src = perfilImageUrl;
            }
        })
        .catch(error => console.error('Error al obtener datos de perfil:', error.message));
    }

    // Llamar a la función para obtener los datos del perfil al cargar la página
    fetchProfileData();

    // Lógica para actualizar el perfil
    document.getElementById('updateProfileButton').addEventListener('click', function(event) {
        event.preventDefault();

        const userId = document.getElementById('user-id').value;
        const nombre = document.getElementById('nomCli').value;
        const apellidoPaterno = document.getElementById('apePaCli').value;
        const apellidoMaterno = document.getElementById('apeMaCli').value;
        const fechaNacimiento = document.getElementById('fechCli').value;
        const email = document.getElementById('mailCli').value;
        const carrera = document.getElementById('carreCli').value;
        const campus = document.getElementById('campuCli').value;
        const numeroTelefono = document.getElementById('celCli').value;

        // Validar que los campos obligatorios no estén vacíos
        if (!nombre || !email) {
            alert('Debe completar todos los campos obligatorios.');
            return;
        }

        // Construir objeto con datos actualizados del perfil
        const profileData = {
            nombre: nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            email: email,
            carrera: carrera,
            campus: campus,
            numero_telefono: numeroTelefono
        };

        // Enviar datos al servidor para actualizar el perfil
        fetch(`http://127.0.0.1:8000/api/profile/update/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(profileData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                alert('Perfil actualizado correctamente.');
                // Volver a obtener y mostrar los datos actualizados del perfil
                fetchProfileData();
            } else {
                const message = data.message || 'Error al actualizar el perfil.';
                alert(message);
            }
        })
        .catch(error => console.error('Error al actualizar perfil:', error));
    });

    // Lógica para actualizar el nombre de usuario
    document.getElementById('btnUsernameUpdate').addEventListener('click', function(event) {
        event.preventDefault();

        if (confirm('¿Está seguro de que desea cambiar su nombre de usuario?')) {
            const userId = document.getElementById('user-id').value;
            const newUsername = document.getElementById('userCli').value;

            if (!newUsername) {
                alert('El nombre de usuario no puede estar vacío.');
                return;
            }

            const profileUser = {
                username: newUsername
            }
            // Mostrar indicador de carga o mensaje mientras se procesa la actualización
            const btnUsernameUpdate = document.getElementById('btnUsernameUpdate');
            btnUsernameUpdate.textContent = 'Actualizando...';
            btnUsernameUpdate.disabled = true;

            fetch(`http://127.0.0.1:8000/api/profile/update/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(profileUser)
            })            
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el nombre de usuario. Por favor, intenta nuevamente.');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200) {
                    alert('Nombre de usuario actualizado correctamente.');
                    // Actualizar el nombre de usuario en la interfaz
                    document.getElementById('user-username').textContent = newUsername;
                } else {
                    const message = data.message || 'Error al actualizar el nombre de usuario.';
                    alert(message);
                }
            })
            .catch(error => {
                console.error('Error al actualizar el nombre de usuario:', error);
                alert('Hubo un error al actualizar el nombre de usuario. Por favor, intenta nuevamente.');
            })
            .finally(() => {
                // Restaurar el estado del botón
                btnUsernameUpdate.textContent = 'Actualizar Nombre de Usuario';
                btnUsernameUpdate.disabled = false;
            });
        }
    });

    // Lógica para actualizar la contraseña
    document.getElementById('btnPassUpdate').addEventListener('click', function(event) {
        event.preventDefault();

        if (confirm('¿Está seguro de que desea cambiar su contraseña?')) {
            const userId = document.getElementById('user-id').value;
            const newPassword = document.getElementById('newPass').value;
            const confirmPassword = document.getElementById('veriPass').value;

            if (!newPassword || !confirmPassword) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('La nueva contraseña y la confirmación no coinciden.');
                return;
            }

            const profilePass = {
                contraseña: newPassword,
                contraseña_confirmation: confirmPassword
            }

            fetch(`http://127.0.0.1:8000/api/profile/update/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(profilePass)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la contraseña');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200) {
                    alert('Contraseña actualizada correctamente.');
                } else {
                    const message = data.message || 'Error al actualizar la contraseña.';
                    alert(message);
                }
            })
            .catch(error => console.error('Error al actualizar la contraseña:', error));
        }
    });

    // Lógica para actualizar la imagen de perfil
    document.getElementById('btnUpdateImgProfile').addEventListener('click', function(event) {
        event.preventDefault();

        const fileField = document.getElementById('profile_pic').files[0];

        if (!fileField) {
            alert('Debe seleccionar un archivo.');
            return;
        }

        const userId = document.getElementById('user-id').value;
        const formData = new FormData();
        formData.append('imagen_perfil', fileField);
        
        // Enviar solicitud fetch al servidor
        fetch(`http://127.0.0.1:8000/api/profile/update/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la imagen de perfil');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                alert('Imagen de perfil actualizada correctamente.');
                // Volver a obtener y mostrar los datos actualizados del perfil
                fetchProfileData();
            } else {
                const message = data.message || 'Error al actualizar la imagen de perfil.';
                alert(message);
            }
        })
        .catch(error => {
            console.error('Error al actualizar imagen de perfil:', error);
            alert('Hubo un error al actualizar la imagen de perfil. Por favor, intenta nuevamente.');
        })
        .finally(() => {
            // Restaurar el estado del botón
            btnUpdateImgProfile.textContent = 'Subir Imagen';
            btnUpdateImgProfile.disabled = false;
        });
    });
});