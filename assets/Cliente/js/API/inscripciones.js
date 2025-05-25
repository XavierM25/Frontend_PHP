document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.querySelector('select[name="categoria_id"]');
    const subcategorySelect = document.querySelector('select[name="subcategoria_id"]');
    const dayCheckboxes = document.querySelectorAll('input[name="dias[]"]');
    const scheduleSelect = document.querySelector('select[name="horario_id"]');
    const form = document.getElementById('inscriptionForm');
    const vacancyCategoryInput = document.getElementById('vacancyCategorie');
    const vacancySubcategoryInput = document.getElementById('vacancySubCategorie');

    let lastSelectedCheckbox = null;

    // Función para cargar las categorías desde la API
    function fetchCategories() {
        fetch('http://127.0.0.1:8000/api/categories', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
                data.categories.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id;
                    option.textContent = categoria.nombre;
                    categorySelect.appendChild(option);
                });

                // Mantener la selección de la categoría si ya estaba seleccionada
                const selectedCategoriaId = categorySelect.dataset.selected;
                if (selectedCategoriaId) {
                    categorySelect.value = selectedCategoriaId;
                    fetchSubcategories(selectedCategoriaId);
                }
            } else {
                console.error('No se encontraron categorías válidas o la lista está vacía');
            }
        })
        .catch(error => console.error('Error fetching categorías:', error));
    }

    // Función para cargar las subcategorías desde la API según la categoría seleccionada
    function fetchSubcategories(categoriaId) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoriaId}/subcategories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            subcategorySelect.innerHTML = '<option value="" disabled selected>Subcategoría</option>'; // Limpiar opciones anteriores
    
            if (data && data.subcategorias && Array.isArray(data.subcategorias) && data.subcategorias.length > 0) {
                data.subcategorias.forEach(subcategoria => {
                    const option = document.createElement('option');
                    option.value = subcategoria.id;
                    option.textContent = subcategoria.nombre;
                    subcategorySelect.appendChild(option);
                });
    
                // Mantener la selección de la subcategoría si ya estaba seleccionada
                const selectedSubcategoriaId = subcategorySelect.dataset.selected;
                if (selectedSubcategoriaId) {
                    subcategorySelect.value = selectedSubcategoriaId;
                    fetchSchedules(selectedSubcategoriaId);
                }
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay subcategorías disponibles';
                subcategorySelect.appendChild(option);
            }
    
            // Resetear los checkboxes al cambiar la subcategoría
            resetCheckboxes();
        })
        .catch(error => console.error('Error fetching subcategorías:', error));
    }

    // Función para obtener los horarios disponibles de la subcategoría seleccionada
    function fetchSchedules(subcategoriaId) {
        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}/schedules`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.horarios) && data.horarios.length > 0) {
                validateAndEnableCheckboxes(data.horarios);
                updateSchedulesSelect(data.horarios);
                fetchVacancies(subcategoriaId);
            } else {
                console.error('Respuesta de la API no válida o sin horarios:', data);
                throw new Error('Esta subcategoría no tiene horarios establecidos.');
            }
        })
        .catch(error => {
            console.error('Error fetching horarios:', error);
            alert('Esta subcategoría no tiene horarios establecidos.');
            resetForm();
        });
    }

    // Función para cargar vacantes según la subcategoría seleccionada
    function fetchVacancies(subcategoriaId) {
        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}/vacancies`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.totalVacantes !== undefined) {
                // Mostrar la categoría y subcategoría seleccionadas
                const selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
                const selectedSubcategory = subcategorySelect.options[subcategorySelect.selectedIndex].text;
                vacancyCategoryInput.value = selectedCategory;
                vacancySubcategoryInput.value = selectedSubcategory;
    
                // Mostrar información de las vacantes en los elementos HTML correspondientes
                const totalVacantesSpan = document.getElementById('totalVacancies');
                const occupiedVacanciesSpan = document.getElementById('occupiedVacancies');
                const availableVacanciesSpan = document.getElementById('availableVacancies');
    
                totalVacantesSpan.textContent = data.totalVacantes;
                occupiedVacanciesSpan.textContent = data.vacantesOcupadas;
                availableVacanciesSpan.textContent = data.vacantesDisponibles;
    
                // Puedes ajustar cómo quieres mostrar la disponibilidad de vacantes en tu formulario
                console.log('Vacantes cargadas:', data);
            } else {
                const vacancySection = document.querySelector('.vacancy-section');
                vacancySection.style.display = 'none'; // Ocultar la sección de vacantes si no hay datos disponibles
                console.log('No hay vacantes disponibles para esta subcategoría.');
            }
        })
        .catch(error => console.error('Error fetching vacancies:', error));
    }

    /// Función para validar y habilitar los checkboxes de días según los horarios disponibles
    function validateAndEnableCheckboxes(horarios) {
        // Deshabilitar y deseleccionar todos los checkboxes primero
        dayCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
            checkbox.checked = false;
        });
    
        // Habilitar y seleccionar los checkboxes correspondientes a los horarios disponibles
        horarios.forEach(horario => {
            const dia = horario.dia.charAt(0).toUpperCase() + horario.dia.slice(1).toLowerCase(); // Convertir el día a formato capitalizado
            const checkbox = document.querySelector(`input[name="dias[]"][value="${dia}"]`);
            if (checkbox) {
                checkbox.disabled = false; // Habilitar el checkbox correspondiente al día
                checkbox.checked = true; // Seleccionar el checkbox
                lastSelectedCheckbox = checkbox; // Actualizar referencia al último checkbox seleccionado
            }
        });
    }

    // Función para actualizar dinámicamente las opciones del selector de horarios según los horarios disponibles
    function updateSchedulesSelect(horarios) {
        scheduleSelect.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>'; // Limpiar opciones anteriores

        horarios.forEach(horario => {
            if (horario.hora_inicio && horario.hora_fin) {
                const option = document.createElement('option');
                option.value = horario.id;
                option.textContent = `${horario.hora_inicio} - ${horario.hora_fin}`;
                scheduleSelect.appendChild(option);
            }
        });

        scheduleSelect.disabled = false;
    }

    // Escuchar cambios en la selección de categoría para cargar las subcategorías correspondientes
    categorySelect.addEventListener('change', function() {
        const categoriaId = this.value;
        if (categoriaId) {
            fetchSubcategories(categoriaId);
        } else {
            subcategorySelect.innerHTML = '<option value="" disabled selected>Subcategoría</option>';
            resetForm();
        }
    });

    // Escuchar cambios en la selección de subcategoría para actualizar los horarios disponibles
    subcategorySelect.addEventListener('change', function() {
        const subcategoriaId = this.value;
        if (subcategoriaId) {
            fetchSchedules(subcategoriaId);
        } else {
            resetForm();
        }
    });

    // Función para resetear el formulario y elementos relacionados
    function resetForm() {
        form.reset();
        dayCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
            checkbox.checked = false;
        });
        scheduleSelect.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>';
        scheduleSelect.disabled = true;
        vacancyCategoryInput.value = '';
        vacancySubcategoryInput.value = '';
    }

    // Función para validar que se haya seleccionado al menos un día
    function validateDays() {
        let atLeastOneChecked = false;
        dayCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneChecked = true;
            }
        });
        return atLeastOneChecked;
    }

    // Función para validar el formulario antes de enviar
    function validateForm() {
        const categoriaId = categorySelect.value;
        const subcategoriaId = subcategorySelect.value;
        const horarioId = scheduleSelect.value;
        const atLeastOneDayChecked = validateDays();

        if (!categoriaId || !subcategoriaId || !horarioId || !atLeastOneDayChecked) {
            alert('Por favor completa todos los campos requeridos.');
            return false;
        }

        return true;
    }

    // Escuchar el evento submit del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        if (!validateForm()) {
            return; // Si la validación falla, detenemos el envío del formulario
        }
    
        const formData = new FormData(this);
    
        fetch('http://127.0.0.1:8000/api/inscripciones', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            alert('Inscripción realizada correctamente.');
            resetForm();
        })
        .catch(error => {
            console.error('Error al enviar la inscripción:', error);
            alert('Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.');
        });
    });

    function resetCheckboxes() {
        dayCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
            checkbox.checked = false;
        });
        lastSelectedCheckbox = null; // Limpiar referencia al último checkbox seleccionado
    }

    // Cargar categorías al cargar la página
    fetchCategories();
});
