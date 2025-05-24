document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'http://127.0.0.1:8000/api/users';

    // Elementos del DOM para detalles de usuario y manejo de modales
    const detailsUserGroups = document.querySelectorAll('.detailsUser');
    const fechaInput = document.getElementById('fechNac');
    const btnCancel = document.getElementById('btnCancel');
    const btnSave = document.getElementById('btnSave');
    const editCarreraIcon = document.getElementById('editCarrera');
    const userCarreraText = document.getElementById('user-carrera');
    const carreraSelect = document.getElementById('carrera-select');

    const modalEliminarUsuario = document.querySelector(".modalEliminarUsuario");
    const modalConEliminarUsuario = document.getElementById("modalEliminarUsuario");
    const cerrarEliminarUsuario = document.getElementById("closeEliminarUsuario");
    const confirmarEliminarBtn = document.getElementById("confirm-delete-btn");
    const cancelarEliminarBtn = document.getElementById("cancel-delete-btn");

    const modalSubirImagen = document.getElementById("modalContImage");
    const modalConSubirImagen = document.getElementById("modalEditImage");
    const cerrarSubirImagen = document.getElementById("closeModalImage");
    const inputImagenPerfil = document.getElementById("profile-image");
    const btnLimpiarImagen = document.getElementById("btnLimpiar");
    const previewImagenPerfil = document.getElementById("preview-img");

    const btnUploadImage = document.getElementById("btnUploadImage");

    const btnCrearUsuario = document.getElementById('btnCrearUsuario');
    const uploadImageInput = document.getElementById('upload-image');
    const imagePreview = document.querySelector('.image-preview img');
    const modalAgregarUsuario = document.querySelector(".modalAgregarUsuario");
    const modalConAgregarUsuario = document.getElementById("modalAgregarUsuario");
    const cerrarAgregarUsuario = document.getElementById("closeAgregarUsuario");
    const abrirAgregarUsuario = document.getElementById("btnAgregarUsuario");

    // Cargar los usuarios al iniciar
    fetchUsers();

    // Función para cargar usuarios desde la API
    function fetchUsers() {
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                displayUsers(data.users);
            } else {
                console.error('Error al obtener usuarios:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
        });
    }

    // Función para mostrar los usuarios en la tabla
    function displayUsers(users) {
        const usuariosList = document.getElementById('usuarios-list');
        usuariosList.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido_paterno}</td>
                <td>${user.apellido_materno}</td>
                <td>${user.username}</td>
                <td>${user.role ? user.role.nombre : ''}</td>
                <td class="plusButtons">
                    <div class="editCont">
                        <button class="btnEditarUsuario" data-id="${user.id}"><i class="ri-pencil-fill"></i></button>
                    </div>
                    <div class="deleteCont">
                        <button class="btnEliminarUsuario" data-id="${user.id}"><i class="ri-delete-bin-fill"></i></button>
                    </div>
                </td>
            `;
            row.querySelector('.btnEditarUsuario').addEventListener('click', () => {
                fetchUserDetails(user.id);
            });
            row.querySelector('.btnEliminarUsuario').addEventListener('click', () => {
                openDeleteModal(user.id);
            });
            usuariosList.appendChild(row);
        });
    }

    // Función para obtener y mostrar los detalles de un usuario
    function fetchUserDetails(userId) {
        fetch(`${baseUrl}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                // Llenar los detalles del usuario en el formulario
                fillUserDetails(data.user);
    
                // Habilitar la edición de los campos del formulario
                enableEditing();
    
                // Verificar y mostrar los valores actuales en los inputs y selects
                detailsUserGroups.forEach(group => {
                    const input = group.querySelector('input, select');
                    if (input) {
                        checkValue(input);
                    }
                });
    
                // Verificar el valor de la fecha de nacimiento
                checkValue(fechaInput);
    
                // Mostrar el icono de edición de carrera y configurar su funcionalidad
                editCarreraIcon.style.display = 'block';
                editCarreraIcon.addEventListener('click', () => {
                    userCarreraText.style.display = 'none';
                    carreraSelect.style.display = 'block';
                    carreraSelect.value = userCarreraText.textContent;
                });
    
                // Configurar el botón para abrir el modal de subir imagen
                btnUploadImage.addEventListener('click', () => {
                    openModal(modalConSubirImagen, modalSubirImagen);
                });
    
                // Configurar el botón para cerrar el modal de subir imagen
                cerrarSubirImagen.addEventListener('click', () => {
                    closeModal(modalConSubirImagen, modalSubirImagen);
                });
    
                // Manejar el cambio de la imagen de perfil
                inputImagenPerfil.addEventListener('change', handleImagenPerfilChange);
    
                
            } else {
                console.error('Error al obtener detalles del usuario:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener detalles del usuario:', error);
        });
    }

    // Event listener para el botón de guardar cambios
btnSave.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.getElementById('user-id').value;
    saveChanges(userId);
});

// Función para enviar los cambios al backend
function saveChanges(userId) {
    // Obtener los valores actualizados del formulario
    const nombre = document.getElementById('name').value.trim();
    const apellidoPaterno = document.getElementById('apePa').value.trim();
    const apellidoMaterno = document.getElementById('apeMa').value.trim();
    const fechaNacimiento = document.getElementById('fechNac').value.trim();
    const sexo = document.getElementById('sex').value.trim();
    const email = document.getElementById('mail').value.trim();
    const campus = document.getElementById('campus').value.trim();
    const numeroTelefono = document.getElementById('numCel').value.trim();
    const carrera = document.getElementById('carrera-select').value.trim();
    const rolId = document.getElementById('user-role').innerText.trim();
    // Obtener la imagen de perfil seleccionada por el usuario
    const profileImageInput = document.getElementById('profile-image');
    const profileImageFile = profileImageInput.files[0];

    const userData = {
        nombre: nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        fecha_nacimiento: fechaNacimiento,
        sexo: sexo,
        email: email,
        campus: campus,
        numero_telefono: numeroTelefono,
        carrera: carrera,
        rol_id: rolId
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(userData)); 

    if (profileImageFile) {
        formData.append('profile_image', profileImageFile, profileImageFile.name);
    }
    // Enviar la solicitud PATCH al backend
    fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 200) {
            console.log('Usuario actualizado correctamente:', data.message);
            fetchUsers(); // Actualizar la lista de usuarios después de la actualización
        } else {
            console.error('Error al actualizar usuario:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al actualizar usuario:', error.message);
    });
}



    function checkValue(input) {
        const label = input.parentNode.querySelector('label');
        if (input.value.trim()) {
            input.classList.add('not-empty');
            label.classList.add('active');
        } else {
            input.classList.remove('not-empty');
            label.classList.remove('active');
        }
    }

    // Función para eliminar usuario
    function deleteUsuario(userId) {
        fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                closeModal(modalConEliminarUsuario, modalEliminarUsuario);
                fetchUsers();
            } else {
                console.error('Error al eliminar usuario:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al eliminar usuario:', error);
        });
    }

    // Función para llenar los detalles del usuario en el formulario
    function fillUserDetails(user) {
        document.getElementById('user-id').value = user.id || '';
        document.getElementById('user-role').innerText = user.role ? user.role.nombre : 'Null';
        document.getElementById('user-profile-pic').src = 'http://127.0.0.1:8000/'+ user.imagen_perfil;
        document.getElementById('user-username').innerText = user.username || 'null';
        document.getElementById('user-carrera').innerText = user.carrera || 'null';
        document.getElementById('name').value = user.nombre || '';
        document.getElementById('apePa').value = user.apellido_paterno || '';
        document.getElementById('apeMa').value = user.apellido_materno || '';
        document.getElementById('fechNac').value = user.fecha_nacimiento || '';
        document.getElementById('sex').value = user.sexo || '';
        document.getElementById('mail').value = user.email || '';
        document.getElementById('campus').value = user.campus || '';
        document.getElementById('numCel').value = user.numero_telefono || '';
    }

    // Función para habilitar la edición de los inputs
    function enableEditing() {
        document.querySelectorAll('.editable').forEach(input => {
            input.disabled = false;
        });
        btnSave.style.display = 'inline-block';
        btnCancel.style.display = 'inline-block';
    }

    // Función para cerrar los modales
    function closeModal(modal, modalContent) {
        modalContent.classList.add('modal-close');
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
        }, 850);
    }

    // Función para abrir los modales
    function openModal(modal, modalContent) {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modalContent.classList.remove('modal-close');
    }

    // Función para manejar el cambio de imagen de perfil
    function handleImagenPerfilChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImagenPerfil.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Función para abrir el modal de eliminar usuario
    function openDeleteModal(userId) {
        openModal(modalConEliminarUsuario, modalEliminarUsuario);
        confirmarEliminarBtn.onclick = () => deleteUsuario(userId);
        cancelarEliminarBtn.onclick = () => closeModal(modalConEliminarUsuario, modalEliminarUsuario);
    }

    // Event listeners para cerrar modales
    cerrarEliminarUsuario.addEventListener('click', () => {
        closeModal(modalConEliminarUsuario, modalEliminarUsuario);
    });

    // Función para crear un nuevo usuario
    btnCrearUsuario.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtener valores de los campos individualmente
        const nombre = document.getElementById('new-name').value.trim();
        const apellidoPaterno = document.getElementById('new-apePa').value.trim();
        const apellidoMaterno = document.getElementById('new-apeMa').value.trim();
        const sexo = document.getElementById('new-sex').value.trim();
        const contraseña = document.getElementById('new-pass').value.trim();
        const email = document.getElementById('new-mail').value.trim();
        const fechaNacimiento = document.getElementById('new-fechNac').value.trim();
        const carrera = document.getElementById('new-carrera').value.trim();
        const campus = document.getElementById('new-campus').value.trim();
        const numeroCelular = document.getElementById('new-numCel').value.trim();
        const imagenPerfil = uploadImageInput.files[0];

        // Validación básica del lado del cliente
        if (!nombre || !apellidoPaterno || !apellidoMaterno || !sexo || !contraseña || !email || !fechaNacimiento || !carrera || !campus || !numeroCelular || !imagenPerfil) {
            console.error('Por favor completa todos los campos obligatorios.');
            return;
        }

        // Crear objeto FormData y agregar campos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido_paterno', apellidoPaterno);
        formData.append('apellido_materno', apellidoMaterno);
        formData.append('sexo', sexo);
        formData.append('contraseña', contraseña);
        formData.append('email', email);
        formData.append('fecha_nacimiento', fechaNacimiento);
        formData.append('carrera', carrera);
        formData.append('campus', campus);
        formData.append('numero_telefono', numeroCelular);
        formData.append('imagen_perfil', imagenPerfil);

        // Llamar a la función para crear un nuevo usuario
        createNewUser(formData);
    });

    // Función para crear un nuevo usuario
    function createNewUser(formData) {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                console.log('Usuario creado exitosamente:', data.message);
                closeModal(modalConAgregarUsuario, modalAgregarUsuario);
                fetchUsers();
            } else {
                console.error('Error al crear usuario:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
        });
    }

    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Event listeners para cerrar modal de agregar usuario
    cerrarAgregarUsuario.addEventListener('click', () => {
        closeModal(modalConAgregarUsuario, modalAgregarUsuario);
    });

    abrirAgregarUsuario.addEventListener('click', () => {
        openModal(modalConAgregarUsuario, modalAgregarUsuario);
    });

    // Event listener para cancelar edición
    btnCancel.addEventListener('click', () => {
        detailsUserGroups.forEach(group => {
            const input = group.querySelector('input, select');
            if (input) {
                input.value = input.defaultValue;
            }
        });
        carreraSelect.style.display = 'none';
        userCarreraText.style.display = 'block';
        carreraSelect.value = userCarreraText.textContent;
        btnSave.style.display = 'none';
        btnCancel.style.display = 'none';
        editCarreraIcon.style.display = 'none';
    });

    // Event listener para subir imagen de perfil
    btnLimpiarImagen.addEventListener('click', (event) => {
        event.preventDefault();
        // Limpiar el campo de entrada de archivo
        inputImagenPerfil.value = null;
        // Limpiar la vista previa de la imagen
        previewImagenPerfil.src = 'assets/images/profile.png'; // Cambiar a tu imagen por defecto
    });

    // Cerrar modal al hacer clic fuera del contenido modal
    window.onclick = function(event) {
        if (event.target === modalConEliminarUsuario) {
            closeModal(modalConEliminarUsuario, modalEliminarUsuario);
        } else if (event.target === modalConSubirImagen) {
            closeModal(modalConSubirImagen, modalSubirImagen);
        } else if (event.target === modalConAgregarUsuario) {
            closeModal(modalConAgregarUsuario, modalAgregarUsuario);
        }
    };

    /* MANEJO DE INPUTS DE EL MODAL AGREGAR NUEVO USUARIO */
    const formGroups = document.querySelectorAll('.form-group');
    const dateInput = document.getElementById('new-fechNac');

    formGroups.forEach(group => {
        const input = group.querySelector('input, select');
        const label = group.querySelector('label');

        if (input && label) {
            function checkValue() {
                if (input.value) {
                    input.classList.add('not-empty');
                } else {
                    input.classList.remove('not-empty');
                }
            }

            input.addEventListener('input', checkValue);

            // Initial check in case the input is pre-filled
            checkValue();
        }
    });

    dateInput.addEventListener('focus', function() {
        // Agregar la clase que muestra el campo de fecha al hacer focus
        dateInput.classList.add('show-datepicker');
    });

    dateInput.addEventListener('blur', function() {
        if (!dateInput.value) {
            // Quitar la clase que muestra el campo de fecha si el campo está vacío al perder el focus
            dateInput.classList.remove('show-datepicker');
        }
    });

});

