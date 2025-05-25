document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'http://127.0.0.1:8000/api/videos';

    // Elementos del DOM para detalles de video y manejo de modales
    const videoFileInput = document.getElementById('video-file');
    const videoPreview = document.getElementById('video-preview');
    const videosList = document.getElementById('videos-list');
    const lastVideoUploaded = document.getElementById('lastVideoUploaded');
    const detailCate = document.getElementById('detailCate');
    const detailSubcate = document.getElementById('detailSubcate');
    const detailCampus = document.getElementById('detailCampus');
    const fechPubli = document.getElementById('fechPubli');
    const detailLikes = document.getElementById('detailLikes');
    const h3Title = document.getElementById('last-preview-video');

    const modalEliminarVideo = document.querySelector(".modalEliminarVideo");
    const modalConEliminarVideo = document.getElementById("modalEliminarVideo");
    const cerrarEliminarVideo = document.getElementById("closeEliminarVideo");
    const confirmarEliminarBtn = document.getElementById("confirm-delete-btn");
    const cancelarEliminarBtn = document.getElementById("cancel-delete-btn");

    const modalEditarVideo = document.querySelector(".modalEditarVideo");
    const modalConEditarVideo = document.getElementById("modalEditarVideo");
    const cerrarEditarVideo = document.getElementById("closeEditarVideo");
    const confirmarEditarBtn = document.getElementById("btnEditarDetails");
    
    const modalAgregarVideo = document.querySelector(".modalAgregarVideo");
    const modalConAgregarVideo = document.getElementById("modalAgregarVideo");
    const cerrarAgregarVideo = document.getElementById("closeAgregarVideo");
    const btnCrearVideo = document.getElementById("btnCrearVideo");
    const abrirAgregarVideo = document.getElementById("btnAgregarVideo");

    videoFileInput.addEventListener('change', function(event) {
        const videoFile = this.files[0];
        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            videoPreview.src = videoURL;
        } else {
            videoPreview.src = '';
        }
    });

    // Cargar categorías y subcategorías al iniciar
    loadCategories();

    document.getElementById('categories').addEventListener('change', function() {
        const categoryId = this.value;
        loadSubcategories(categoryId);
    });

    btnCrearVideo.addEventListener('click', handleCrearVideoClick);

    function handleCrearVideoClick(event) {
        event.preventDefault();

        const campus = document.getElementById('campus').value;
        const categoriaId = document.getElementById('categories').value;
        const subcategoriaId = document.getElementById('subcategories').value;
        const descripcion = document.getElementById('desc-video').value;
        const titulo = document.getElementById('title').value;
        const visibilidad = document.getElementById('visi').value;
        const videoFile = videoFileInput.files[0];

        if (!categoriaId || categoriaId === '' || !subcategoriaId || subcategoriaId === '') {
            alert('Debe seleccionar una categoría y subcategoría.');
            return;
        }

        if (!descripcion.trim() || !titulo.trim() || !videoFile) {
            alert('Debe ingresar una descripción, un título y seleccionar un archivo de video.');
            return;
        }

        const formData = new FormData();
        formData.append('campus', campus);
        formData.append('categoria_id', categoriaId);
        formData.append('subcategoria_id', subcategoriaId);
        formData.append('descripcion', descripcion);
        formData.append('titulo', titulo);
        formData.append('visibilidad', visibilidad);
        formData.append('archivo_video', videoFile);

        createVideo(formData);
    }

    async function createVideo(formData) {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al crear el video.');
            }

            const data = await response.json();

            if (data.status === 201) {
                alert('Video creado correctamente.');
                resetVideoForm();
                closeModal(modalConAgregarVideo, modalAgregarVideo);
                loadVideos();
            } else {
                alert('Error al crear el video.');
            }
        } catch (error) {
            console.error('Error al crear video:', error);
            alert('Error al crear el video.');
        }
    }

    function loadVideos() {
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los videos');
            }
            return response.json();
        })
        .then(data => {
            videosList.innerHTML = '';

            data.videos.forEach(video => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${video.id}</td>
                    <td>${video.titulo}</td>
                    <td>${video.descripcion}</td>
                    <td>${capitalizeFirstLetter(video.visibilidad)}</td>
                    <td>
                        <div class="editCont">
                            <button class="btnEditarVideo" data-id="${video.id}"><i class="ri-pencil-fill"></i></button>
                        </div>
                        <div class="deleteCont">
                            <button class="btnEliminarVideo" data-id="${video.id}"><i class="ri-delete-bin-fill"></i></button>
                        </div>
                    </td>
                `;
                row.addEventListener('click', () => {
                    showVideoDetails(video);
                });
                videosList.appendChild(row);

                // Asignar eventos a los botones de editar y eliminar
                const btnEditarVideo = row.querySelector('.btnEditarVideo');
                const btnEliminarVideo = row.querySelector('.btnEliminarVideo');

                btnEditarVideo.addEventListener('click', () => {
                    openEditModal(video.id);
                });

                btnEliminarVideo.addEventListener('click', () => {
                    openDeleteModal(video.id);
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar los videos:', error);
        });
    }

    function showVideoDetails(video) {
        lastVideoUploaded.src = `http://127.0.0.1:8000/${video.archivo_video}`;
        detailCate.value = video.categoria ? video.categoria.nombre : '';
        detailSubcate.value = video.subcategoria ? video.subcategoria.nombre : '';
        detailCampus.value = video.campus;
        if (video.created_at) {
            const date = new Date(video.created_at);
            if (!isNaN(date)) {
                fechPubli.value = date.toISOString().split('T')[0];
            } else {
                fechPubli.value = '';
            }
        } else {
            fechPubli.value = '';
        }
        detailLikes.value = video.likes;
        h3Title.textContent = 'Previsualización';
    }

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
            const categorySelect = document.getElementById('categories');
            categorySelect.innerHTML = '';

            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach((category, index) => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.nombre;
                    categorySelect.appendChild(option);

                    if (index === 0) {
                        loadSubcategories(category.id);
                    }
                });

                callback();
            } else {
                console.error('La respuesta no contiene categorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
    }

    function loadSubcategories(categoryId) {
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
            const subcategorySelect = document.getElementById('subcategories');
            subcategorySelect.innerHTML = '';

            if (data.subcategorias && Array.isArray(data.subcategorias)) {
                data.subcategorias.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.nombre;
                    subcategorySelect.appendChild(option);
                });
            } else {
                console.error('La respuesta no contiene subcategorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener subcategorías:', error);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function resetVideoForm() {
        document.getElementById('campus').value = '';
        document.getElementById('categories').value = '';
        document.getElementById('subcategories').value = '';
        document.getElementById('desc-video').value = '';
        document.getElementById('title').value = '';
        document.getElementById('visi').value = 'publico';
        videoPreview.src = '';
    }

    // Abrir modal para eliminar video
    function openDeleteModal(videoId) {
        openModal(modalConEliminarVideo, modalEliminarVideo);
        confirmarEliminarBtn.onclick = () => deleteVideo(videoId);
        cancelarEliminarBtn.onclick = () => closeModal(modalConEliminarVideo, modalEliminarVideo);
    }

    function openEditModal(videoId){
        fetch(`${baseUrl}/${videoId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el video para editar');
            }
            return response.json();
        })
        .then(video => {
            // Poblar el formulario de edición con los datos del video
            document.getElementById('title-edit').value = video.titulo;
            document.getElementById('desc-video-edit').value = video.descripcion;
            document.getElementById('visi-edit').value = video.visibilidad;
            document.getElementById('campus-edit').value = video.campus;
    
            // Cargar categorías y subcategorías en los campos de edición
            loadEditCategories(video.categoria ? video.categoria.id : null, video.subcategoria ? video.subcategoria.id : null);
    
            // Abrir el modal de edición
            openModal(modalConEditarVideo, modalEditarVideo);
    
            // Configurar el evento onclick para confirmar la edición del video
            confirmarEditarBtn.onclick = () => editVideo(videoId);
        })
        .catch(error => {
            console.error('Error al obtener video para editar:', error);
        });
    }

    // Función para cargar categorías y subcategorías en los campos de edición
    function loadEditCategories(selectedCategoryId, selectedSubcategoryId) {
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
            const categorySelect = document.getElementById('categories-edit');
            categorySelect.innerHTML = '';

            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach((category, index) => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.nombre;
                    categorySelect.appendChild(option);

                    // Si hay una categoría seleccionada, marcarla como seleccionada
                    if (category.id === selectedCategoryId) {
                        option.selected = true;

                        // Cargar las subcategorías de la categoría seleccionada
                        loadEditSubcategories(selectedCategoryId, selectedSubcategoryId);
                    }
                });
            } else {
                console.error('La respuesta no contiene categorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
    }

    // Función para cargar subcategorías en el campo de edición según la categoría seleccionada
    function loadEditSubcategories(categoryId, selectedSubcategoryId) {
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
            const subcategorySelect = document.getElementById('subcategories-edit');
            subcategorySelect.innerHTML = '';

            if (data.subcategorias && Array.isArray(data.subcategorias)) {
                data.subcategorias.forEach(subcategoria => {
                    const option = document.createElement('option');
                    option.value = subcategoria.id;
                    option.textContent = subcategoria.nombre;
                    subcategorySelect.appendChild(option);

                    // Si hay una subcategoría seleccionada, marcarla como seleccionada
                    if (subcategoria.id === selectedSubcategoryId) {
                        option.selected = true;
                    }
                });
            } else {
                console.error('La respuesta no contiene subcategorías válidas:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener subcategorías:', error);
        });
    }

    function editVideo(videoId){
        const video = {
            titulo: document.getElementById('title-edit').value,
            descripcion: document.getElementById('desc-video-edit').value,
            visibilidad: document.getElementById('visi-edit').value,
            campus: document.getElementById('campus-edit').value,
            categoria_id: document.getElementById('categories-edit').value,
            subcategoria_id: document.getElementById('subcategories-edit').value
        };
    
        fetch(`${baseUrl}/${videoId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(video)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                alert('Video actualizado correctamente.');
                closeModal(modalConEditarVideo, modalEditarVideo);
                loadVideos();
            } else {
                console.error('Error al actualizar video:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al actualizar video:', error);
            alert('Error al actualizar el video.');
        });
    }

    // Función para eliminar video
    function deleteVideo(videoId) {
        fetch(`${baseUrl}/${videoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data=> {
            if (data.status === 200) {
                alert('Video eliminado correctamente.');
                closeModal(modalConEliminarVideo, modalEliminarVideo);
                loadVideos();
            } else {
                console.error('Error al eliminar video:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al eliminar video:', error);
        });
    }

    // Cerrar modal
    function closeModal(modal, modalContent) {
        modalContent.classList.add('modal-close');
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
        }, 850);
    }

    function openModal(modal, modalContent) {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modalContent.classList.remove('modal-close');
    }

    abrirAgregarVideo.addEventListener('click', () => {
        openModal(modalConAgregarVideo, modalAgregarVideo);
    });

    cerrarAgregarVideo.addEventListener('click', () => {
        closeModal(modalConAgregarVideo, modalAgregarVideo);
    });

    cerrarEditarVideo.addEventListener('click', () =>{
        closeModal(modalConEditarVideo, modalEditarVideo);
    });

    // Event listeners para cerrar el modal haciendo clic en la "X" o fuera del modal
    cerrarEliminarVideo.addEventListener('click', () => closeModal(modalConEliminarVideo, modalEliminarVideo));
    modalEliminarVideo.addEventListener('click', (event) => {
        if (event.target === modalEliminarVideo) {
            closeModal(modalConEliminarVideo, modalEliminarVideo);
        }
    });

    // Cargar videos al cargar la página
    loadVideos();
});
