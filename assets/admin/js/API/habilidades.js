document.addEventListener('DOMContentLoaded', function() {
    const userSelectInput = document.getElementById('userSelected'); // Elemento de input para seleccionar usuario
    const assignBtn = document.getElementById('assign-btn');
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const resetBtn = document.getElementById('reset-btn'); // Botón para restablecer (eliminar habilidad)

    // Ocultar el botón "Editar" y "Reestablecer" de manera predeterminada
    editBtn.style.display = 'none';

    // Función para cargar la tabla de usuarios y habilidades
    function loadUsersAndSkills() {
        fetch('http://127.0.0.1:8000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                const tbody = document.querySelector('#usuarios-table tbody');
                tbody.innerHTML = ''; // Limpiar la tabla antes de agregar datos

                // Iterar sobre cada usuario obtenido
                data.users.forEach(user => {
                    // Crear una fila para cada usuario
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="checkbox" name="selectUserHabi" data-user-id="${user.id}" data-user-name="${user.nombre}" data-habilidad-id=""></td>
                        <td>${user.nombre}</td>
                        <td>${user.carrera}</td>
                        <td></td> <!-- Espacio para la categoría -->
                        <td></td> <!-- Espacio para la subcategoría -->
                        <td></td> <!-- Espacio para los puntos -->
                        <td></td> <!-- Espacio para el estado -->
                    `;
                    tbody.appendChild(row);

                    // Agregar evento al checkbox para cargar habilidades y categorías
                    row.querySelector('input[type="checkbox"]').addEventListener('change', function(event) {
                        if (event.target.checked) {
                            const userName = event.target.getAttribute('data-user-name');
                            userSelectInput.value = userName;

                            // Limpiar opciones de categorías y subcategorías
                            clearCategoryAndSubcategorySelects();

                            // Cargar categorías al seleccionar un usuario
                            if (userName.trim() !== '') {
                                // Verificar si el usuario tiene datos de habilidades
                                loadSkills(user.id);
                            }
                        } else {
                            // Limpiar input de usuario seleccionado si se desmarca el checkbox
                            userSelectInput.value = '';
                            clearCategoryAndSubcategorySelects();
                            clearInputs();
                        }
                    });

                    // Obtener habilidad asociada al usuario si existe
                    fetch(`http://127.0.0.1:8000/api/users/${user.id}/habilities`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(response => response.json())
                    .then(habilitiesData => {
                        if (habilitiesData.status === 200 && habilitiesData.habilidades.length > 0) {
                            const habilidad = habilitiesData.habilidades[0];
                            row.querySelector('td:nth-child(4)').textContent = habilidad.categoria.nombre;
                            row.querySelector('td:nth-child(5)').textContent = habilidad.subcategoria.nombre;
                            row.querySelector('td:nth-child(6)').textContent = habilidad.puntos;
                            row.querySelector('td:nth-child(7)').textContent = habilidad.estado;

                            // Guardar el ID de la habilidad en el checkbox
                            row.querySelector('input[type="checkbox"]').setAttribute('data-habilidad-id', habilidad.id);

                        } else {
                            row.querySelector('td:nth-child(4)').textContent = 'N/A';
                            row.querySelector('td:nth-child(5)').textContent = 'N/A';
                            row.querySelector('td:nth-child(6)').textContent = 'N/A';
                            row.querySelector('td:nth-child(7)').textContent = 'N/A';

                        }
                    })
                    .catch(error => console.error('Error al cargar habilidades:', error));
                });
            } else {
                console.error('Error al cargar usuarios:', data.message);
            }
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
    }

    // Función para cargar habilidades asociadas a un usuario
    function loadSkills(userId) {
        fetch(`http://127.0.0.1:8000/api/users/${userId}/habilities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(habilitiesData => {
            if (habilitiesData.status === 200 && habilitiesData.habilidades.length > 0) {
                // Si hay habilidades existentes, cargar los datos en los campos correspondientes
                const habilidad = habilitiesData.habilidades[0]; // Suponiendo que solo hay una habilidad por usuario aquí

                // Mostrar puntos y estado existentes
                document.getElementById('points-input').value = habilidad.puntos;
                document.getElementById('state-select').value = habilidad.estado;

                // Mostrar botón de editar y ocultar botón de asignar
                editBtn.style.display = 'inline-block';
                assignBtn.style.display = 'none';

                // Guardar el ID de la habilidad para usarlo en la edición
                editBtn.setAttribute('data-habilidad-id', habilidad.id);

                // Cargar categorías y subcategorías antes de seleccionar
                loadCategories(() => {
                    document.getElementById('category-select').value = habilidad.categoria_id;
                    loadSubcategories(habilidad.categoria_id, habilidad.subcategoria_id);
                });
            } else {
                // No hay habilidades existentes, solo cargar categorías y subcategorías
                loadCategories();
                editBtn.style.display = 'none';
                assignBtn.style.display = 'inline-block';
            }
        })
        .catch(error => console.error('Error al cargar habilidades:', error));
    }

    // Función para cargar categorías
    function loadCategories(callback = () => {}) {
        fetch('http://127.0.0.1:8000/api/categories', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            return response.json();
        })
        .then(data => {
            const categorySelect = document.getElementById('category-select');
            categorySelect.innerHTML = ''; // Limpiar opciones previas

            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach((category, index) => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.nombre;
                    categorySelect.appendChild(option);

                    // Cargar automáticamente las subcategorías de la primera categoría
                    if (index === 0) {
                        loadSubcategories(category.id);
                    }
                });

                // Disparar evento de cambio para cargar subcategorías basado en la categoría seleccionada
                categorySelect.addEventListener('change', function() {
                    const categoryId = this.value;
                    loadSubcategories(categoryId);
                });

                // Ejecutar el callback después de cargar las categorías
                callback();
            } else {
                console.error('La respuesta no contiene categorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
    }

    // Función para cargar subcategorías
    function loadSubcategories(categoryId, selectedSubcategoryId = null) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/subcategories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las subcategorías');
            }
            return response.json();
        })
        .then(data => {
            const subcategorySelect = document.getElementById('subcategory-select');
            subcategorySelect.innerHTML = ''; // Limpiar opciones previas

            if (data.subcategorias && Array.isArray(data.subcategorias)) {
                data.subcategorias.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.nombre;
                    subcategorySelect.appendChild(option);
                });

                // Seleccionar la subcategoría si está definida
                if (selectedSubcategoryId) {
                    subcategorySelect.value = selectedSubcategoryId;
                }
            } else {
                console.error('La respuesta no contiene subcategorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener subcategorías:', error);
        });
    }

    // Limpiar opciones de categoría y subcategoría
    function clearCategoryAndSubcategorySelects() {
        const categorySelect = document.getElementById('category-select');
        categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';

        const subcategorySelect = document.getElementById('subcategory-select');
        subcategorySelect.innerHTML = '<option value="">Seleccione una subcategoría</option>';
    }

    // Limpiar los campos de subcategoría, puntos y estado
    function clearInputs() {
        document.getElementById('subcategory-select').innerHTML = '<option value="">Seleccione una subcategoría</option>';
        document.getElementById('points-input').value = '';
        document.getElementById('state-select').value = '-1';
    }

    // Evento para el botón "Asignar"
    assignBtn.addEventListener('click', function() {
        const userId = getUserIdFromSelectedCheckbox();
        const categoriaId = document.getElementById('category-select').value;
        const subcategoriaId = document.getElementById('subcategory-select').value;
        const puntos = document.getElementById('points-input').value;
        const estado = document.getElementById('state-select').value;

        // Validar que se haya seleccionado un usuario
        if (!userId) {
            alert('Debe seleccionar un usuario primero.');
            return;
        }

        // Validar que se hayan seleccionado categoría y subcategoría
        if (!categoriaId || categoriaId === '-1' || !subcategoriaId || subcategoriaId === '-1') {
            alert('Debe seleccionar una categoría y subcategoría.');
            return;
        }

        // Validar que se haya ingresado puntos
        if (!puntos || puntos.trim() === '') {
            alert('Debe ingresar los puntos.');
            return;
        }

        // Validar que se haya seleccionado un estado
        if (!estado || estado === '-1') {
            alert('Debe seleccionar un estado.');
            return;
        }

        // Construir objeto con datos de la habilidad
        const habilidadData = {
            usuario_id: userId,
            categoria_id: categoriaId,
            subcategoria_id: subcategoriaId,
            puntos: puntos,
            estado: estado
        };

        // Enviar datos al servidor para crear la habilidad
        fetch('http://127.0.0.1:8000/api/habilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(habilidadData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                alert('Habilidad asignada correctamente.');
                // Limpiar campos y selección de usuario
                clearCategoryAndSubcategorySelects();
                clearInputs();
                userSelectInput.value = '';
                // Recargar usuarios y habilidades después de asignar
                loadUsersAndSkills();
            } else {
                alert('Error al asignar la habilidad.');
            }
        })
        .catch(error => console.error('Error al crear habilidad:', error));
    });

    // Evento para el botón "Editar"
    editBtn.addEventListener('click', function() {
        const habilidadId = editBtn.getAttribute('data-habilidad-id');
        const categoriaId = document.getElementById('category-select').value;
        const subcategoriaId = document.getElementById('subcategory-select').value;
        const puntos = document.getElementById('points-input').value;
        const estado = document.getElementById('state-select').value;

        // Validar que se haya seleccionado categoría y subcategoría
        if (!categoriaId || categoriaId === '-1' || !subcategoriaId || subcategoriaId === '-1') {
            alert('Debe seleccionar una categoría y subcategoría.');
            return;
        }

        // Validar que se haya ingresado puntos
        if (!puntos || puntos.trim() === '') {
            alert('Debe ingresar los puntos.');
            return;
        }

        // Validar que se haya seleccionado un estado
        if (!estado || estado === '-1') {
            alert('Debe seleccionar un estado.');
            return;
        }

        // Construir objeto con datos actualizados de la habilidad
        const habilidadData = {
            categoria_id: categoriaId,
            subcategoria_id: subcategoriaId,
            puntos: puntos,
            estado: estado
        };

        // Enviar datos al servidor para editar la habilidad
        fetch(`http://127.0.0.1:8000/api/habilities/${habilidadId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(habilidadData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al editar la habilidad.');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                alert('Habilidad editada correctamente.');
                // Limpiar campos y selección de usuario
                clearCategoryAndSubcategorySelects();
                clearInputs();
                userSelectInput.value = '';
                // Ocultar botón "Editar"
                editBtn.style.display = 'none';
                // Mostrar botón "Asignar"
                assignBtn.style.display = 'inline-block';
                // Recargar usuarios y habilidades después de editar
                loadUsersAndSkills();
            } else {
                const message = data.message || 'Error al editar la habilidad.';
                alert(message);
            }
        })
        .catch(error => console.error('Error al editar habilidad:', error));
    });

    // Evento para el botón "Cancelar"
    cancelBtn.addEventListener('click', function() {
        clearCategoryAndSubcategorySelects();
        clearInputs();
        userSelectInput.value = '';
        editBtn.removeAttribute('data-habilidad-id');
        editBtn.style.display = 'none';
        assignBtn.style.display = 'inline-block';
    });

    // Evento para el botón "Reestablecer"
    resetBtn.addEventListener('click', function() {
        const userId = getUserIdFromSelectedCheckbox();
    
        // Validar que se haya seleccionado un usuario
        if (!userId) {
            alert('Debe seleccionar al menos un usuario para eliminar la habilidad.');
            return;
        }
    
        // Mostrar confirmación antes de eliminar
        const confirmDelete = confirm('¿Está seguro de eliminar la habilidad seleccionada?');
    
        if (confirmDelete) {
            const habilidadId = getSelectedHabilidadId(userId);
    
            // Validar que se haya encontrado un ID de habilidad válido
            if (!habilidadId) {
                alert('No se encontró ninguna habilidad asociada al usuario seleccionado.');
                return;
            }
    
            // Enviar solicitud al servidor para eliminar la habilidad
            fetch(`http://127.0.0.1:8000/api/habilities/${habilidadId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Habilidad eliminada correctamente.');
                    // Recargar usuarios y habilidades después de eliminar
                    loadUsersAndSkills();
                } else {
                    throw new Error('Error al eliminar la habilidad. Código de estado: ' + response.status);
                }
            })
            .catch(error => {
                console.error('Error al eliminar habilidad:', error);
                alert('Error al eliminar la habilidad. Consulte la consola para más detalles.');
            });
        }
    });

    // Función para obtener el ID de usuario desde el checkbox seleccionado
    function getUserIdFromSelectedCheckbox() {
        const selectedCheckbox = document.querySelector('#usuarios-table input[type="checkbox"]:checked');
        if (selectedCheckbox) {
            return selectedCheckbox.getAttribute('data-user-id');
        }
        return null;
    }

    // Función para obtener el ID de habilidad asociada al usuario seleccionado
    function getSelectedHabilidadId(userId) {
        const selectedCheckbox = document.querySelector(`#usuarios-table input[type="checkbox"][data-user-id="${userId}"]:checked`);
        if (selectedCheckbox) {
            return selectedCheckbox.getAttribute('data-habilidad-id');
        }
        return null;
    }

    // Cargar usuarios y habilidades al cargar la página
    loadUsersAndSkills();
});
