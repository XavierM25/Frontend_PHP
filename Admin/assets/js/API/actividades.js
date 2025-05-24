document.addEventListener('DOMContentLoaded', function() {

    
    // Variable para almacenar el ID de la subcategoría seleccionada actualmente
    let currentSubcategoryId = null;

    // Variable para controlar si ya se está cargando horarios
    let loadingSchedules = false;

    // Función para cargar las subcategorías de una categoría específica
    function loadSubcategories(categoriaId) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoriaId}/subcategories`, {
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
            const listaSubcategorias = document.querySelector('.list-subcate ul');
            listaSubcategorias.innerHTML = '';

            if (data.subcategorias && Array.isArray(data.subcategorias)) {
                data.subcategorias.forEach(subcategoria => {
                    const li = document.createElement('li');
                    li.setAttribute('data-subcategoria-id', subcategoria.id);
                    li.textContent = subcategoria.nombre;

                    li.addEventListener('click', function() {
                        // Verificar si ya hay una subcategoría seleccionada
                        if (currentSubcategoryId === subcategoria.id) {
                            return; // No hacer nada si ya está seleccionada
                        }

                        // Limpiar estado visual de la subcategoría previamente seleccionada
                        if (currentSubcategoryId) {
                            const currentLi = listaSubcategorias.querySelector(`li[data-subcategoria-id="${currentSubcategoryId}"]`);
                            if (currentLi) {
                                currentLi.classList.remove('active');
                            }
                        }
                        // Establecer la nueva subcategoría seleccionada
                        currentSubcategoryId = subcategoria.id;

                        // Agregar clase 'active' al elemento clickeado
                        li.classList.add('active');

                        // Cargar detalles y horarios de la subcategoría seleccionada
                        loadSubcategoryDetailsAndSchedules(subcategoria.id);
                    });

                    listaSubcategorias.appendChild(li);
                });
            } else {
                console.error('La respuesta no contiene subcategorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener subcategorías:', error);
        });
    }

    // Función para cargar detalles de una subcategoría y sus horarios
    function loadSubcategoryDetailsAndSchedules(subcategoriaId) {
        // Si ya se están cargando los horarios, salir para evitar duplicados
        if (loadingSchedules) {
            return;
        }

        loadingSchedules = true; // Marcar que se está cargando horarios

        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener detalles de la subcategoría');
            }
            return response.json();
        })
        .then(subcategoria => {
            const detalleNombreInput = document.getElementById('detalleNombreInput');
            const detalleVacantesInput = document.getElementById('detalleVacantesInput');

            detalleNombreInput.value = subcategoria.subcategorie.nombre || '';
            detalleNombreInput.dataset.subcategoriaId = subcategoria.subcategorie.id;
            detalleVacantesInput.value = subcategoria.subcategorie.vacantes !== undefined ? subcategoria.subcategorie.vacantes.toString() : '0';

            loadVacancies(subcategoriaId);
        })
        .catch(error => {
            console.error('Error al obtener detalles de la subcategoría:', error);
        })
        .finally(() => {
            loadingSchedules = false; // Restablecer el estado de carga de horarios
        });
    }

    // Manejar la creación de subcategorías
    const formCrearSubcategoria = document.getElementById('createSubCate');
    formCrearSubcategoria.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío automático del formulario

        const categoriaId = document.getElementById('categoriaSelect').value;
        const nombreSubcategoria = document.getElementById('subcategoriaInput').value;
        const vacantes = document.getElementById('vacantesInput').value;

        fetch('http://127.0.0.1:8000/api/subcategories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                categoria_id: categoriaId,
                nombre: nombreSubcategoria,
                vacantes: vacantes
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Subcategoría creada:', data);
            // Actualizar lista de subcategorías mostrada en la interfaz
            loadSubcategories(categoriaId); // Cargar subcategorías de la categoría actualizada
            formCrearSubcategoria.reset(); // Limpiar el formulario después de crear la subcategoría
        })
        .catch(error => {
            console.error('Error al crear subcategoría:', error);
        });
    });


    // Función para cargar información de vacantes de una subcategoría específica
    function loadVacancies(subcategoriaId) {
        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}/vacancies`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener información de vacantes');
            }
            return response.json();
        })
        .then(data => {
            const totalSpan = document.getElementById('totalVacantes');
            const disponiblesSpan = document.getElementById('vacantesDisponibles');
            const ocupadasSpan = document.getElementById('vacantesOcupadas');

            if (totalSpan && disponiblesSpan && ocupadasSpan) {
                totalSpan.textContent = data.totalVacantes !== undefined ? data.totalVacantes : 0;
                disponiblesSpan.textContent = data.vacantesDisponibles !== undefined ? data.vacantesDisponibles : 0;
                ocupadasSpan.textContent = data.vacantesOcupadas !== undefined ? data.vacantesOcupadas : 0;
            } else {
                console.error('Elementos de vacantes no están definidos');
            }

            // Llamar a loadSchedules solo después de cargar las vacantes
            loadSchedules(subcategoriaId);
        })
        .catch(error => {
            console.error('Error al obtener información de vacantes:', error);
        });
    }

    // Función para cargar los horarios de una subcategoría
    function loadSchedules(subcategoriaId) {
        const listaHorarios = document.querySelector('.horarios-list');
        
        // Limpiar el listado actual antes de cargar nuevos horarios
        listaHorarios.innerHTML = '';

        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}/schedules`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los horarios');
            }
            return response.json();
        })
        .then(data => {
            if (data.horarios && data.horarios.length > 0) {
                data.horarios.forEach(horario => {
                    const nuevoElemento = document.createElement('li');
                    nuevoElemento.setAttribute('data-horario-id', horario.id);
                    nuevoElemento.innerHTML = `
                        <div class="data">
                            <p>${horario.dia}</p><span>-</span><p>${horario.hora_inicio}</p><span>-</span><p>${horario.hora_fin}</p>
                        </div>
                        <button class="btn-eliminar-horario">Eliminar</button>
                    `;
                    const btnEliminar = nuevoElemento.querySelector('.btn-eliminar-horario');
                    btnEliminar.addEventListener('click', function() {
                        eliminarHorario(horario.id);
                    });

                    listaHorarios.appendChild(nuevoElemento);
                });
            } else {
                listaHorarios.innerHTML = '<li>No hay horarios disponibles para esta subcategoría</li>';
            }
        })
        .catch(error => {
            console.error('Error al obtener horarios:', error);
            listaHorarios.innerHTML = '<li>Error al cargar los horarios</li>';
        });
    }

    // Función para eliminar un horario
    function eliminarHorario(horarioId) {
        fetch(`http://127.0.0.1:8000/api/schedules/${horarioId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar horario');
            }
            const elementoAEliminar = document.querySelector(`.horarios-list li[data-horario-id="${horarioId}"]`);
            if (elementoAEliminar) {
                elementoAEliminar.remove();
            }
        })
        .catch(error => {
            console.error('Error al eliminar horario:', error);
        });
    }

    // Evento click en las categorías
    document.querySelector('.list-cate ul').addEventListener('click', function(event) {
        const categoriaId = event.target.getAttribute('data-categoria-id');
        if (categoriaId) {
            loadSubcategories(categoriaId);
        }
    });

    // Evento click en las subcategorías
    document.querySelector('.list-subcate ul').addEventListener('click', function(event) {
        const subcategoriaId = event.target.getAttribute('data-subcategoria-id');
        if (subcategoriaId) {
            loadSubcategoryDetailsAndSchedules(subcategoriaId);
        }
    });

    // Crear un nuevo horario
    const formCrearHorario = document.getElementById('createHorarie');
    formCrearHorario.addEventListener('submit', function(event) {
        event.preventDefault();

        const subcategoriaId = document.getElementById('detalleNombreInput').dataset.subcategoriaId;
        const dia = document.querySelector('.horario-dia-select').value;
        const horaInicio = document.getElementsByName('hour_inicio')[0].value;
        const horaFin = document.getElementsByName('hour_fin')[0].value;

        const horaInicioFormateada = horaInicio.slice(0, 5);
        const horaFinFormateada = horaFin.slice(0, 5);

        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}/schedules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                dia: dia,
                hora_inicio: horaInicioFormateada,
                hora_fin: horaFinFormateada
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear horario');
            }
            return response.json();
        })
        .then(data => {
            loadSchedules(subcategoriaId);
            formCrearHorario.reset();
        })
        .catch(error => {
            console.error('Error al crear horario:', error);
        });
    });

    // Eliminar subcategoría
    document.getElementById('btnEliminar').addEventListener('click', function(event) {
        event.preventDefault();

        const subcategoriaId = document.getElementById('detalleNombreInput').dataset.subcategoriaId;

        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar subcategoría');
            }
            loadSubcategories();
        })
        .catch(error => {
            console.error('Error al eliminar subcategoría:', error);
        });
    });

    // Guardar cambios en los detalles de la subcategoría
    document.getElementById('btnGuardarCambios').addEventListener('click', function(event) {
        event.preventDefault();

        const subcategoriaId = document.getElementById('detalleNombreInput').dataset.subcategoriaId;
        const nombre = document.getElementById('detalleNombreInput').value;
        const vacantes = document.getElementById('detalleVacantesInput').value;

        fetch(`http://127.0.0.1:8000/api/subcategories/${subcategoriaId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                nombre: nombre,
                vacantes: vacantes
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar subcategoría');
            }
            return response.json();
        })
        .then(data => {
            if (data.subcategorie) {
                document.getElementById('detalleNombreInput').value = data.subcategorie.nombre || '';
                document.getElementById('detalleVacantesInput').value = data.subcategorie.vacantes !== undefined ? data.subcategorie.vacantes.toString() : '0';

                const categoriaId = data.subcategorie.categoria_id;
                loadSubcategories(categoriaId);

                const formDetallesSubcategoria = document.getElementById('formDetallesSubcategoria');
                formDetallesSubcategoria.reset();
            } else {
                console.error('La respuesta no contiene información de subcategoría válida:', data);
            }
        })
        .catch(error => {
            console.error('Error al actualizar subcategoría:', error);
        });
    });

    // Inicialmente cargar categorías al cargar la página
    loadCategories();

    // Función para cargar las categorías desde la API
    function loadCategories() {
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
            const listaCategorias = document.querySelector('.list-cate ul');
            listaCategorias.innerHTML = '';

            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach(categoria => {
                    const li = document.createElement('li');
                    li.setAttribute('data-categoria-id', categoria.id);
                    li.textContent = categoria.nombre;

                    li.addEventListener('click', function() {
                        document.querySelectorAll('.list-cate ul li').forEach(el => {
                            el.classList.remove('active');
                        });
                        li.classList.add('active');

                        loadSubcategories(categoria.id);
                    });

                    listaCategorias.appendChild(li);
                });
            } else {
                console.error('La respuesta no contiene categorías válidas:', data);
            }

            fillCategorySelect(data.categories);
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
    }

    // Función para llenar el select de categorías en el formulario de crear subcategoría
    function fillCategorySelect(categories) {
        const selectCategorias = document.getElementById('categoriaSelect');
        selectCategorias.innerHTML = '';
        categories.forEach(categoria => {
            selectCategorias.innerHTML += `<option value="${categoria.id}">${categoria.nombre}</option>`;
        });
    }

});
