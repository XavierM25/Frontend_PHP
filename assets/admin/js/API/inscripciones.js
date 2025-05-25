// Variables globales
const API_URL = 'http://127.0.0.1:8000/api/inscripciones/';
let currentInscripcionId = null; // Variable global para almacenar el ID de la inscripción actualmente editada

fetchInscriptions();

function fetchInscriptions() {
    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            displayInscriptions(data.inscripciones);
        } else {
            console.error('Error al obtener inscripciones:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al obtener inscripciones:', error);
    });
}

function displayInscriptions(inscripciones) {
    const registrationsList = document.getElementById('registrations-list');
    registrationsList.innerHTML = '';

    inscripciones.forEach(inscripcion => {
        const avatarUrl = `http://127.0.0.1:8000/${inscripcion.usuario.imagen_perfil}`;
        const formattedDate = formatDate(new Date(inscripcion.created_at));
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <img class="user-avatar" src="${avatarUrl}" alt="${inscripcion.usuario.nombre}">
                    <div class="user-details">
                        <p>${inscripcion.usuario.nombre}</p>
                        <p>${inscripcion.usuario.email}</p>
                    </div>
                </div>
            </td>
            <td>${inscripcion.categoria.nombre}</td>
            <td>${inscripcion.subcategoria.nombre}</td>
            <td>${formattedDate}</td>
            <td><span class="status ${inscripcion.estado.toLowerCase()}">${inscripcion.estado}</span></td>
            <td>${inscripcion.numero_vacante}</td>
            <td><i class="ri-edit-line editToggle" data-id="${inscripcion.id}"></i></td>
        `;

        // Event listener para editar la inscripción
        row.querySelector('.editToggle').addEventListener('click', () => {
            editRegistration(inscripcion.id);
        });

        registrationsList.appendChild(row);
    });
}

function editRegistration(inscripcionId) {
    currentInscripcionId = inscripcionId;
    fetch(`${API_URL}${inscripcionId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            fillRegistrationDetails(data.inscripcion);
            showEditButtons(); // Mostrar botones de guardar y eliminar
            enableStatusField(); // Habilitar campo de estado
        } else {
            console.error('Error al obtener detalles de la inscripción:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al obtener detalles de la inscripción:', error);
    });
}

function fillRegistrationDetails(inscripcion) {
    document.getElementById('ins-id').value = inscripcion.id || '';
    document.getElementById('username').innerText = `${inscripcion.usuario.nombre} ${inscripcion.usuario.apellido_paterno}`;
    document.getElementById('user-email').innerText = inscripcion.usuario.email || 'null@null.com';
    document.getElementById('vacancy').value = inscripcion.numero_vacante || 0;

    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = `<option value="${inscripcion.categoria.id}">${inscripcion.categoria.nombre}</option>`;
    categorySelect.disabled = true;

    const subcategorySelect = document.getElementById('subcategory');
    subcategorySelect.innerHTML = `<option value="${inscripcion.subcategoria.id}">${inscripcion.subcategoria.nombre}</option>`;
    subcategorySelect.disabled = true;

    document.getElementById('date').value = formatDateForInput(new Date(inscripcion.created_at));
    document.getElementById('status').value = inscripcion.estado || 'Pendiente';

    const daySelect = document.getElementById('day-regis');
    daySelect.innerHTML = `<option value="${inscripcion.horario.dia}">${inscripcion.horario.dia}</option>`;
    daySelect.disabled = true;

    document.getElementById('horarie-regis').value = inscripcion.horario ? `${inscripcion.horario.hora_inicio}-${inscripcion.horario.hora_fin}` : '';
    document.getElementById('comments').value = inscripcion.comentarios || '';
}

function formatDateForInput(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
}

function showEditButtons() {
    document.getElementById('btn-save').style.display = 'inline-block';
    document.getElementById('btn-delete').style.display = 'inline-block';
}

function enableStatusField() {
    document.getElementById('status').disabled = false;
}

// Evento para detectar clics fuera de la sección registration-details
document.addEventListener('click', function(event) {
    const registrationDetails = document.querySelector('.registration-details');
    if (!registrationDetails.contains(event.target)) {
        hideEditButtons(); // Ocultar botones de guardar y eliminar
        disableStatusField(); // Deshabilitar campo de estado
        clearFields(); // Limpiar campos
    }
});

function hideEditButtons() {
    document.getElementById('btn-save').style.display = 'none';
    document.getElementById('btn-delete').style.display = 'none';
}

function disableStatusField() {
    document.getElementById('status').disabled = true;
}

function clearFields() {
    document.getElementById('ins-id').value = '';
    document.getElementById('username').innerText = '';
    document.getElementById('user-email').innerText = 'null@null.com';
    document.getElementById('vacancy').value = 0;
    document.getElementById('category').innerHTML = '<option value="-1">Categorías</option>';
    document.getElementById('category').disabled = true;
    document.getElementById('subcategory').innerHTML = '<option value="-1">Subcategorías</option>';
    document.getElementById('subcategory').disabled = true;
    document.getElementById('date').value = '';
    document.getElementById('status').value = 'Pendiente';
    document.getElementById('status').disabled = true;
    document.getElementById('day-regis').innerHTML = '<option value="-1">Día registrado</option>';
    document.getElementById('day-regis').disabled = true;
    document.getElementById('horarie-regis').value = '';
    document.getElementById('comments').value = '';
}

// Evento para el botón "Guardar Cambios"
document.getElementById('btn-save').addEventListener('click', function() {
    const selectedState = document.getElementById('status').value;
    updateRegistrationState(selectedState);
});

// Función para actualizar el estado de la inscripción
function updateRegistrationState(newState) {
    if (!currentInscripcionId) {
        console.error('No se ha seleccionado ninguna inscripción para actualizar.');
        return;
    }

    const requestBody = {
        estado: newState
    };

    fetch(`${API_URL}${currentInscripcionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            alert('Estado de la inscripción actualizado correctamente:', data.inscripcion);
            fetchInscriptions();
            clearFields();
        } else {
            console.error('Error al actualizar el estado de la inscripción:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al actualizar el estado de la inscripción:', error);
    });
}

// Evento para el botón "Eliminar"
document.getElementById('btn-delete').addEventListener('click', function() {
    deleteRegistration();
});

// Función para eliminar la inscripción seleccionada
function deleteRegistration() {
    if (!currentInscripcionId) {
        console.error('No se ha seleccionado ninguna inscripción para eliminar.');
        return;
    }

    if (!confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
        return;
    }

    fetch(`${API_URL}${currentInscripcionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            console.log('Inscripción eliminada correctamente:', data.message);
            fetchInscriptions(); // Actualizar la lista de inscripciones después de eliminar
            clearFields(); // Limpiar los campos después de eliminar
            hideEditButtons(); // Ocultar botones de guardar y eliminar después de eliminar
        } else {
            console.error('Error al eliminar la inscripción:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al eliminar la inscripción:', error);
    });
}

