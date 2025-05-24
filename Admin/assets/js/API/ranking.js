document.addEventListener('DOMContentLoaded', function() {
    const rankingTable = document.getElementById('ranking-list').getElementsByTagName('tbody')[0];
    const filterRankSection = document.querySelector('.cate-rank');
    const subCateRankSection = document.querySelector('.subCate-rank');
    //const detailSection = document.querySelector('.student-rank');
    const editLink = document.getElementById('edit-button'); // Seleccionar el enlace de editar

    let currentSubcategoryId = null; // Variable para almacenar la subcategoría actualmente seleccionada
    let selectedRanking = null; // Variable para almacenar el ranking seleccionado

    // Función para obtener y mostrar todos los rankings
    function fetchAndShowRankings() {
        fetch('http://127.0.0.1:8000/api/ranking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                updateRankingTable(data.rankings);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Función para actualizar la tabla de rankings con los datos recibidos
    function updateRankingTable(rankings) {
        // Limpiar la tabla antes de agregar nuevos datos
        rankingTable.innerHTML = '';

        // Filtrar los rankings si hay una subcategoría seleccionada
        if (currentSubcategoryId) {
            rankings = rankings.filter(ranking => ranking.subcategoria_id === currentSubcategoryId);
        }

        // Mostrar alerta si no hay registros después de filtrar
        if (rankings.length === 0 && currentSubcategoryId !== null) {
            alert('No hay usuarios asignados a esta subcategoría.');
            hideSubcategoriesAndReset(); // Ocultar subcategorías y restaurar la tabla
            return;
        }

        // Iterar sobre los rankings y crear filas de tabla con la estructura requerida
        rankings.forEach((ranking, index) => {
            const row = rankingTable.insertRow();
            const positionCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const pointsCell = row.insertCell(2);
            const actionsCell = row.insertCell(3);

            positionCell.textContent = index + 1; // Posición (index + 1 para comenzar desde 1)
            nameCell.textContent = `${ranking.usuario.nombre} ${ranking.usuario.apellido_paterno}`; // Nombre del usuario
            pointsCell.textContent = ranking.total_puntos; // Puntos totales

            // Agregar evento de clic a la fila para mostrar detalles y habilitar enlace de editar
            row.addEventListener('click', () => {
                showUserDetails(ranking); // Mostrar detalles del usuario al hacer clic en la fila
                selectedRanking = ranking; // Almacenar el ranking seleccionado
                editLink.classList.remove('disabled'); // Habilitar el enlace de editar
                editLink.href = `edithabili.php?usuario_id=${ranking.usuario.id}`; // Actualizar el href del enlace
            });

            // Botón de eliminar con icono
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="ri-delete-bin-fill"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deleteRanking(ranking.usuario_id); // Llamar a función para eliminar el ranking
            });

            // Contenedor para el botón de eliminar
            const deleteContainer = document.createElement('div');
            deleteContainer.classList.add('cont-delete');
            deleteContainer.appendChild(deleteButton);

            // Agregar el contenedor con el botón de eliminar a la celda de acciones
            actionsCell.appendChild(deleteContainer);
        });
    }

    // Función para eliminar un ranking
    function deleteRanking(usuarioId) {
        fetch(`http://127.0.0.1:8000/api/ranking/${usuarioId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el ranking');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario eliminado del ranking:', data.message);
            // Actualizar la tabla después de eliminar el ranking si es necesario
            fetchAndShowRankings(); // Ejemplo: actualizar la tabla después de eliminar
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Función para mostrar los detalles del usuario seleccionado
    function showUserDetails(ranking) {
        // Actualizar los campos de la sección Detalle con la información del usuario
        fetch(`http://127.0.0.1:8000/api/users/${ranking.usuario.id}/habilities-with-position`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                const habilidades = data.habilidades;
                const posicionGeneral = data.posicion_general;
                let posicionSubcategoria = null; // Variable para almacenar la posición específica de la subcategoría

                // Verificar si hay una posición específica para la subcategoría actual
                if (currentSubcategoryId && data.posicion_subcategoria !== null) {
                    posicionSubcategoria = data.posicion_subcategoria;
                }

                // Actualizar los campos de la sección Detalle con los datos recibidos
                document.getElementById('nameRnk').value = `${ranking.usuario.nombre} ${ranking.usuario.apellido_paterno}`;
                document.getElementById('subCaRnk').value = ranking.subcategoria.nombre;
                document.getElementById('pointRnk').value = ranking.total_puntos;

                // Mostrar posición general si no hay filtro de subcategoría
                if (!currentSubcategoryId) {
                    document.getElementById('positionRnk').value = posicionGeneral !== undefined ? posicionGeneral : '';
                } else {
                    // Mostrar posición en la subcategoría si hay filtro
                    document.getElementById('positionRnk').value = posicionSubcategoria !== null ? posicionSubcategoria : '';
                }

                // Verificar si habilidades es un array y tiene al menos un elemento
                if (Array.isArray(habilidades) && habilidades.length > 0) {
                    document.getElementById('stateRnk').value = habilidades[0].estado; // Estado de la primera habilidad si existe
                } else {
                    document.getElementById('stateRnk').value = ''; // Limpiar el campo si no hay habilidades
                }

                // Mostrar la sección de detalles si está oculta
                //detailSection.style.display = 'block';
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Función para obtener y mostrar las categorías
    function fetchAndShowCategories() {
        fetch('http://127.0.0.1:8000/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.categories || !Array.isArray(data.categories)) {
                console.error('No se recibió un arreglo válido de categorías:', data);
                return;
            }
            console.log('Categorías recibidas:', data.categories);
            filterRankSection.innerHTML = ''; // Limpiar antes de agregar nuevas categorías
            data.categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('item');
                categoryDiv.dataset.categoryId = category.id;
                categoryDiv.innerHTML = `<h5>${category.nombre}</h5>`;
                filterRankSection.appendChild(categoryDiv);

                // Al hacer clic en la categoría, cargar las subcategorías correspondientes
                categoryDiv.addEventListener('click', () => {
                    if (currentSubcategoryId === null || currentSubcategoryId !== category.id) {
                        // Mostrar subcategorías solo si no están visibles o si se hace clic en una categoría diferente
                        fetchAndShowSubcategories(category.id);
                    } else {
                        // Ocultar subcategorías y restaurar la tabla al estado inicial
                        hideSubcategoriesAndReset();
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
    }

    // Función para obtener y mostrar las subcategorías según la categoría seleccionada
    function fetchAndShowSubcategories(categoryId) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/subcategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.subcategorias || !Array.isArray(data.subcategorias)) {
                console.error('No se recibió un arreglo válido de subcategorías:', data);
                return;
            }
            console.log('Subcategorías recibidas:', data.subcategorias);

            // Limpiar la sección de subcategorías antes de agregar nuevas subcategorías
            subCateRankSection.innerHTML = '';

            // Mostrar alerta si no hay subcategorías asignadas
            if (data.subcategorias.length === 0) {
                alert('No hay subcategorías asignadas a esta categoría.');
                hideSubcategoriesAndReset(); // Ocultar subcategorías y restaurar la tabla
                return;
            }

            // Crear div para las subcategorías de la categoría seleccionada
            const subcategoriesDiv = document.createElement('div');
            subcategoriesDiv.classList.add('item');

            // Iterar sobre las subcategorías y crear elementos <h5> para cada una
            data.subcategorias.forEach(subcategoria => {
                const subcategoryH5 = document.createElement('h5');
                subcategoryH5.textContent = subcategoria.nombre;
                subcategoryH5.dataset.subcategoryId = subcategoria.id; // Almacenar el id de la subcategoría
                subcategoryH5.addEventListener('click', () => {
                    // Filtrar la tabla por la subcategoría seleccionada
                    currentSubcategoryId = subcategoria.id;
                    fetchAndShowRankings(); // Actualizar la tabla con el nuevo filtro
                });
                subcategoriesDiv.appendChild(subcategoryH5);
            });

            // Agregar el div de subcategorías al contenedor de subcategorías
            subCateRankSection.appendChild(subcategoriesDiv);
        })
        .catch(error => {
            console.error('Error al obtener subcategorías:', error);
        });
    }

    // Función para ocultar las subcategorías y restaurar la tabla al estado inicial sin filtro
    function hideSubcategoriesAndReset() {
        subCateRankSection.innerHTML = ''; // Limpiar la sección de subcategorías
        currentSubcategoryId = null; // Restablecer el id de subcategoría actual a null
        fetchAndShowRankings(); // Actualizar la tabla sin filtro

        // Limpiar los campos de la sección Detalle
        document.getElementById('positionRnk').value = '';
        document.getElementById('nameRnk').value = '';
        document.getElementById('subCaRnk').value = '';
        document.getElementById('pointRnk').value = '';
        document.getElementById('stateRnk').value = '';

        // Ocultar la sección de detalles si está visible
        //detailSection.style.display = 'none';

        // Deshabilitar el enlace de editar y limpiar la URL
        editLink.classList.add('disabled');
        editLink.removeAttribute('href');
        selectedRanking = null; // Limpiar la variable de ranking seleccionado
    }

    // Llamar a la función para obtener y mostrar las categorías al cargar la página
    fetchAndShowCategories();

    // Llamar a la función para obtener y mostrar todos los rankings al cargar la página
    fetchAndShowRankings();
});
