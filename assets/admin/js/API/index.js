document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'http://127.0.0.1:8000/api';

    // Elementos del DOM
    const totalVideosElem = document.getElementById('totalVideos');
    const totalUsersElem = document.getElementById('totalUsers');
    const topRankingElem = document.getElementById('topRanking');
    const registersApprovedElem = document.getElementById('registersApproved');
    const newUserSection = document.querySelector('.new-user .image-user .slides');
    const leftControl = document.querySelector('.new-user .image-user .controls .left');
    const rightControl = document.querySelector('.new-user .image-user .controls .right');
    const recentActivityElem = document.querySelector('.recentActivity tbody');
    const noRecentActivityElem = document.getElementById('noRecentActivity');

    // Funciones para obtener datos
    function fetchTotalUsers() {
        fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                totalUsersElem.textContent = `${data.users.length} usuarios`;
            } else {
                console.error('Error al obtener usuarios:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
        });
    }

    function fetchTotalVideos() {
        fetch(`${baseUrl}/videos`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                totalVideosElem.textContent = `${data.videos.length} videos`;
            } else {
                console.error('Error al obtener videos:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener videos:', error);
        });
    }

    function fetchTopRanking() {
        fetch(`${baseUrl}/ranking`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.rankings.length > 0) {
                const topUser = data.rankings[0].usuario;
                topRankingElem.textContent = `${topUser.apellido_paterno} ${topUser.nombre}`;
            } else {
                topRankingElem.textContent = 'Sin datos de ranking';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            topRankingElem.textContent = 'Error al cargar ranking';
        });
    }

    function fetchRegistersApproved() {
        fetch(`${baseUrl}/inscripciones`, {
            method: 'GET',
            headers: {
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
            if (data && data.inscripciones) {
                const totalInscripciones = data.inscripciones.length;
                const approvedInscripciones = data.inscripciones.filter(inscripcion => inscripcion.estado.toLowerCase() === 'aprobado').length;
                const percentage = (approvedInscripciones / totalInscripciones) * 100;

                // Generar el gradiente con el porcentaje actualizado
                const gradient = `radial-gradient(closest-side, #fff 79%, transparent 80% 100%), conic-gradient(from 0deg, #1976d2 0%, #1976d2 ${percentage}%, #e9e4ff ${percentage}% 100%)`;

                // Actualizar el estilo de fondo del progress bar
                const progressBar = document.querySelector('.progress-bar');
                progressBar.style.background = gradient;

                // Actualizar el valor del atributo aria-valuenow
                progressBar.setAttribute('aria-valuenow', Math.round(percentage));

                // Actualizar el contenido de los elementos HTML
                const approvedCountElem = document.getElementById('approvedCount');
                const totalCountElem = document.getElementById('totalCount');
                registersApprovedElem.textContent = `${approvedInscripciones}/${totalInscripciones} registros`;

                approvedCountElem.textContent = approvedInscripciones;
                totalCountElem.textContent = ` / ${totalInscripciones} inscripciones`;

                progressBar.setAttribute('data-percentage', Math.round(percentage)); // Establecer el porcentaje para mostrar en el progress bar
            } else {
                console.error('Error: Respuesta inesperada del servidor');
            }
        })
        .catch(error => {
            console.error('Error al obtener inscripciones:', error);
        });
    }

    // Función para obtener usuarios registrados recientemente en las últimas 24 horas
    function fetchRecentUsers() {
        // Calcular la fecha límite hace 24 horas
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                // Filtrar los usuarios registrados en las últimas 24 horas
                const recentUsers = data.users.filter(user => new Date(user.created_at) >= twentyFourHoursAgo);

                // Llamar a la función para actualizar el slider con los usuarios recientes
                updateNewUserSlider(recentUsers);
            } else {
                console.error('Error al obtener usuarios:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
        });
    }

    // Función para actualizar el slider de nuevos usuarios
    function updateNewUserSlider(users) {
        if (users.length === 0) {
            newUserSection.innerHTML = '<p>No hay nuevos usuarios en las últimas 24 horas.</p>';
            return;
        }

        newUserSection.innerHTML = ''; // Limpiar el contenido existente del slider

        users.forEach((user, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            if (index === 0) slide.classList.add('active'); // Agregar la clase active al primer slide

            slide.innerHTML = `
                <div class="user-img">
                    <img src="http://127.0.0.1:8000/${user.imagen_perfil}" alt="${user.nombre}">
                </div>
                <div class="user-info">
                    <h5>${user.nombre}</h5>
                    <p>${formatTimeAgo(user.created_at)}</p>
                </div>
            `;

            newUserSection.appendChild(slide);
        });

        // Inicializar el slider
        initSlider();
    }

    function formatTimeAgo(registrationTime) {
        const now = new Date();
        const registrationDate = new Date(registrationTime);
        const elapsedMs = now - registrationDate;
        const seconds = Math.floor(elapsedMs / 1000);

        if (seconds < 60) {
            return `${seconds} segundos`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} minutos`;
        } else {
            const hours = Math.floor(seconds / 3600);
            return `${hours} horas`;
        }
    }

    // Función para inicializar el slider
    function initSlider() {
        const slides = document.querySelectorAll('.new-user .image-user .slides .slide');
        let currentSlide = 0;

        function showSlide(index) {
            // Remover la clase active de todos los slides
            slides.forEach(slide => slide.classList.remove('active'));

            // Ajustar el índice si es necesario
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Agregar la clase active al slide actual
            slides[index].classList.add('active');

            // Ajustar la posición del contenedor de slides
            const offset = -index * 100;
            newUserSection.style.transform = `translateX(${offset}%)`;

            // Actualizar el índice actual
            currentSlide = index;
        }

        // Mostrar el primer slide
        showSlide(currentSlide);

        // Event listeners para los controles
        leftControl.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        rightControl.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    function fetchRecentActivity() {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
        let recentVideos = [];
        let recentInscripciones = [];
    
        // Obtener la actividad reciente de videos
        const fetchVideos = fetch(`${baseUrl}/videos`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                recentVideos = data.videos.filter(video => new Date(video.created_at) >= twentyFourHoursAgo).map((video, index) => ({
                    type: 'video',
                    ...video,
                    id: index + 1 // Generar un ID único basado en el índice
                }));
            } else {
                console.error('Error al obtener videos recientes:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener videos recientes:', error);
        });
    
        // Obtener la actividad reciente de inscripciones
        const fetchInscripciones = fetch(`${baseUrl}/inscripciones`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.inscripciones) {
                recentInscripciones = data.inscripciones.filter(inscripcion => new Date(inscripcion.created_at) >= twentyFourHoursAgo).map((inscripcion, index) => ({
                    type: 'inscripcion',
                    ...inscripcion,
                    id: index + 1 // Generar un ID único basado en el índice
                }));
            } else {
                console.error('Error al obtener inscripciones recientes:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener inscripciones recientes:', error);
        });
    
        // Esperar a que ambas promesas se resuelvan antes de continuar
        Promise.all([fetchVideos, fetchInscripciones]).then(() => {
            // Mezclar y completar la actividad reciente para tener 4 registros
            let recentActivity = [];
    
            // Agregar hasta 2 registros de videos y 2 de inscripciones a recentActivity
            let videosIndex = 0;
            let inscripcionesIndex = 0;
            while (recentActivity.length < 4 && (videosIndex < recentVideos.length || inscripcionesIndex < recentInscripciones.length)) {
                if (videosIndex < recentVideos.length) {
                    recentActivity.push(recentVideos[videosIndex]);
                    videosIndex++;
                }
                if (recentActivity.length < 4 && inscripcionesIndex < recentInscripciones.length) {
                    recentActivity.push(recentInscripciones[inscripcionesIndex]);
                    inscripcionesIndex++;
                }
            }
    
            // Limitar a 4 registros finales (en caso de que se haya excedido)
            recentActivity = recentActivity.slice(0, 4);
    
            // Actualizar la tabla con la actividad reciente
            updateRecentActivity(recentActivity);
        });
    }
    
    // Función para actualizar la actividad reciente en la tabla
    function updateRecentActivity(items) {
        recentActivityElem.innerHTML = ''; // Limpiar el contenido existente del tbody
    
        if (items.length === 0) {
            noRecentActivityElem.style.display = 'block';
            return;
        } else {
            noRecentActivityElem.style.display = 'none';
        }
    
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            let iconClass = '';
            let title = '';
            let likes = '';
            let state = '';
    
            if (item.type === 'video') {
                iconClass = 'ri-video-on-fill';
                title = item.titulo;
                likes = `${item.likes} likes`;
                state = item.visibilidad;
                // Asignar ID estático para el icono de video
                const iconId = `video-icon-${index}`;
                const icon = document.createElement('i');
                icon.className = iconClass;
                icon.id = iconId;
                icon.style.color = '#3bc963';
                icon.style.background = '#e2f7e8';
                const iconTd = document.createElement('td');
                iconTd.className = 'icon';
                iconTd.appendChild(icon);
                row.appendChild(iconTd);
            } else if (item.type === 'inscripcion') {
                iconClass = 'ri-article-fill';
                title = 'Inscripción';
                likes = `${item.usuario.nombre} ${item.usuario.apellido_paterno}`;
                state = item.estado;
                // Asignar ID estático para el icono de inscripción
                const iconId = `inscripcion-icon-${index}`;
                const icon = document.createElement('i');
                icon.className = iconClass;
                icon.id = iconId;
                icon.style.color = '#1976d2';
                icon.style.background = '#e6e4ec';
                const iconTd = document.createElement('td');
                iconTd.className = 'icon';
                iconTd.appendChild(icon);
                row.appendChild(iconTd);
            }
    
            // Agregar los demás datos a las celdas correspondientes
            const titleTd = document.createElement('td');
            titleTd.className = 'title';
            titleTd.textContent = title;
            row.appendChild(titleTd);
    
            const likesTd = document.createElement('td');
            likesTd.className = 'likes';
            likesTd.textContent = likes;
            row.appendChild(likesTd);
    
            const stateTd = document.createElement('td');
            stateTd.className = 'state';
            stateTd.textContent = state;
            row.appendChild(stateTd);
    
            // Agregar la fila a la tabla
            recentActivityElem.appendChild(row);
        });
    }
    
    // Llamadas iniciales para cargar los datos
    fetchTotalUsers();
    fetchTotalVideos();
    fetchTopRanking();
    fetchRegistersApproved();
    fetchRecentUsers();
    fetchRecentActivity();
});
