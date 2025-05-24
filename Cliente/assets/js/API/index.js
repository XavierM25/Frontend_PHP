document.addEventListener('DOMContentLoaded', function() {
    const filterSection = document.querySelector('.categories');
    const subcategoriesSection = document.querySelector('.subcategories');
    const videoItemsSection = document.querySelector('.video-items-cont'); // Sección inicial donde se mostrarán los videos
    const bannerSection = document.querySelector('.banner'); // Sección del banner donde mostrar el video popular
    const rankingSection = document.querySelector('.ranking');

    let currentCategoryId = null;
    let currentSubcategoryId = null;

    // Función para cargar y mostrar categorías
    function fetchAndShowCategories() {
        fetch('http://127.0.0.1:8000/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            filterSection.innerHTML = '<li class="active" id="all-categories">Todo</li>';

            const allCategoriesItem = document.getElementById('all-categories');
            allCategoriesItem.addEventListener('click', () => {
                document.querySelectorAll('.categories li').forEach(li => li.classList.remove('active'));
                allCategoriesItem.classList.add('active');
                subcategoriesSection.innerHTML = '';
                currentCategoryId = null;
                currentSubcategoryId = null;
                fetchAndShowVideos();
            });

            data.categories.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.textContent = category.nombre;
                categoryItem.dataset.categoryId = category.id;

                categoryItem.addEventListener('click', () => {
                    document.querySelectorAll('.categories li').forEach(li => li.classList.remove('active'));
                    categoryItem.classList.add('active');
                    currentCategoryId = category.id;
                    fetchAndShowSubcategories(category.id);
                });

                filterSection.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error al obtener categorías:', error));
    }

    // Función para cargar y mostrar subcategorías
    function fetchAndShowSubcategories(categoryId) {
        fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/subcategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            subcategoriesSection.innerHTML = '';

            data.subcategorias.forEach(subcategoria => {
                const subcategoryItem = document.createElement('li');
                subcategoryItem.textContent = subcategoria.nombre;
                subcategoryItem.dataset.subcategoryId = subcategoria.id;

                subcategoryItem.addEventListener('click', () => {
                    document.querySelectorAll('.subcategories li').forEach(li => li.classList.remove('active'));
                    subcategoryItem.classList.add('active');
                    currentSubcategoryId = subcategoria.id;
                    fetchAndShowVideos();
                });

                subcategoriesSection.appendChild(subcategoryItem);
            });
        })
        .catch(error => console.error('Error al obtener subcategorías:', error));
    }

    // Función para cargar y mostrar videos
    function fetchAndShowVideos() {
        fetch('http://127.0.0.1:8000/api/videos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            if (data.status === 200 && Array.isArray(data.videos)) {
                let videos = data.videos;
    
                // Obtener el video más popular (con más likes)
                const popularVideo = getPopularVideo(videos);
    
                // Mostrar el video más popular en la sección de banner
                displayPopularVideo(popularVideo);
    
                // Filtrar los videos restantes según subcategoría si está seleccionada
                if (currentSubcategoryId) {
                    videos = videos.filter(video => video.subcategoria_id === currentSubcategoryId);
                }
    
                // Mostrar todos los videos en la sección principal
                displayVideos(videos);
            } else {
                console.error(data.message || 'Error al obtener videos.');
                displayPopularVideo(null); // Mostrar que no hay video popular si no se obtiene la lista de videos
                displayVideos([]);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            displayPopularVideo(null); // Mostrar que no hay video popular en caso de error
            displayVideos([]);
        });
    }

    // Función para obtener el video más popular
    function getPopularVideo(videos) {
        // Encontrar el video con más likes
        let popularVideo = null;
        let maxLikes = -1;

        videos.forEach(video => {
            if (video.likes > maxLikes) {
                maxLikes = video.likes;
                popularVideo = video;
            }
        });

        return popularVideo;
    }

    // Función para mostrar el video más popular en el banner
    function displayPopularVideo(video) {
        const shareDiv = bannerSection.querySelector('.share');
        const videoInfoDiv = bannerSection.querySelector('.video-info');
        const likesElement = videoInfoDiv.querySelector('#likesPopular');
        const dateElement = videoInfoDiv.querySelector('#date-created');
        const videoElement = bannerSection.querySelector('#popularVideo');

        if (video) {
            likesElement.textContent = video.likes;
            dateElement.textContent = formatDate(video.created_at);
            videoElement.src = 'http://127.0.0.1:8000/' + video.archivo_video;
        } else {
            likesElement.textContent = '-';
            dateElement.textContent = '-';
            videoElement.src = ''; // Limpiar el src del video
        }
    }

    // Función para formatear la fecha
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('es-ES', options);
    }

    // Función para mostrar los videos en la sección principal
    function displayVideos(videos) {
        videoItemsSection.innerHTML = ''; // Limpiar sección de videos existentes

        let chunkedVideos = chunkArray(videos, 3); // Dividir videos en grupos de 3

        chunkedVideos.forEach(chunk => {
            const section = document.createElement('section');
            section.classList.add('video-items');

            chunk.forEach(video => {
                const videoItem = createVideoItem(video);
                section.appendChild(videoItem);
            });

            videoItemsSection.appendChild(section);
        });
    }

    function createVideoItem(video) {
        const videoItem = document.createElement('div');
        videoItem.classList.add('item');
        videoItem.dataset.videoId = video.id;

        const likeDiv = document.createElement('div');
        likeDiv.classList.add('like');
        likeDiv.dataset.liked = false; // Agregar dataset para rastrear el estado del like
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('ri-heart-3-fill');
        likeDiv.appendChild(heartIcon);
        likeDiv.addEventListener('click', () => likeVideo(video.id, likeDiv)); // Manejar click en el icono de like
        videoItem.appendChild(likeDiv);

        const videoElement = document.createElement('video');
        videoElement.setAttribute('preload', 'metadata'); // Preload solo metadata para optimización
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.classList.add('dynamic-video'); // Clase adicional para referencia y estilo CSS

        videoElement.addEventListener('mouseover', () => {
            videoElement.play();
            updatePlayerSection(video);
        });

        videoElement.addEventListener('mouseleave', () => {
            videoElement.pause();
        });

        // Manejar la carga y configuración del video
        videoElement.addEventListener('loadeddata', () => {
            console.log(`Video cargado: ${videoElement.src}`);
        });

        videoElement.addEventListener('error', () => {
            console.error(`Error al cargar el video: ${videoElement.src}`);
            const errorText = document.createElement('p');
            errorText.textContent = 'Error al cargar el video';
            videoItem.appendChild(errorText);
        });

        videoElement.src = 'http://127.0.0.1:8000/' + video.archivo_video;
        videoItem.appendChild(videoElement);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const titleHeader = document.createElement('h3');
        titleHeader.textContent = `${video.categoria.nombre} | ${video.subcategoria.nombre}`;
        detailsDiv.appendChild(titleHeader);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');
        const locationIcon = document.createElement('i');
        locationIcon.classList.add('ri-map-pin-line');
        locationDiv.appendChild(locationIcon);
        const locationText = document.createElement('h5');
        locationText.textContent = video.campus;
        locationDiv.appendChild(locationText);
        infoDiv.appendChild(locationDiv);

        const rateDiv = document.createElement('div');
        rateDiv.classList.add('rate');
        const rateIcon = document.createElement('i');
        rateIcon.classList.add('ri-heart-2-fill');
        rateDiv.appendChild(rateIcon);
        const rateText = document.createElement('h5');
        rateText.textContent = video.likes;
        rateDiv.appendChild(rateText);
        infoDiv.appendChild(rateDiv);

        detailsDiv.appendChild(infoDiv);
        videoItem.appendChild(detailsDiv);

        return videoItem;
    }

    // Función para actualizar la sección Player con información del video
    function updatePlayerSection(video) {
        const playerSection = document.querySelector('.player');

        // Limpiar contenido existente
        playerSection.innerHTML = '';

        // Crear elementos de la sección Player
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const videoElement = document.createElement('video');
        videoElement.setAttribute('preload', 'metadata'); // Preload solo metadata para optimización
        videoElement.src = 'http://127.0.0.1:8000/' + video.archivo_video;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.autoplay = false; // No reproducción automática al actualizar

        contentDiv.appendChild(videoElement);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const titleHeader = document.createElement('h5');
        titleHeader.textContent = video.titulo; // Usar el título del video
        infoDiv.appendChild(titleHeader);

        const rateDiv = document.createElement('div');
        rateDiv.classList.add('rate');

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('ri-heart-2-fill');
        rateDiv.appendChild(heartIcon);

        const rateText = document.createElement('h5');
        rateText.innerHTML = `${video.likes} <span>${video.categoria.nombre} | ${video.subcategoria.nombre}</span>`;
        rateDiv.appendChild(rateText);

        infoDiv.appendChild(rateDiv);
        contentDiv.appendChild(infoDiv);

        playerSection.appendChild(contentDiv);

        const pauseIcon = document.createElement('i');
        pauseIcon.classList.add('ri-play-large-line');
        playerSection.appendChild(pauseIcon);
    }
    // Función para dividir un arreglo en partes más pequeñas
    function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    // Función para dar like a un video
    function likeVideo(videoId, likeDiv) {
        const liked = likeDiv.dataset.liked === 'true'; // Verificar el estado del like

        fetch(`http://127.0.0.1:8000/api/videos/${videoId}/like`, {
            method: liked ? 'DELETE' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cambiar el estado del like');
            }
            return response.json();
        })
        .then(data => {
            likeDiv.dataset.liked = !liked; // Alternar el estado del like
            const likesCount = likeDiv.nextElementSibling.querySelector('h5');
            likesCount.textContent = data.likes; // Actualizar la cantidad de likes
        })
        .catch(error => {
            console.error('Error al cambiar el estado del like:', error);
        });
    }

    // Función para cargar y mostrar el ranking de usuarios
    function fetchAndShowRanking() {
        fetch('http://127.0.0.1:8000/api/ranking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            rankingSection.innerHTML = ''; // Limpiar sección de ranking existente

            if (data.status === 200 && Array.isArray(data.rankings) && data.rankings.length > 0) {
                data.rankings.forEach(ranking => {
                    const userRanking = createUserRanking(ranking);
                    rankingSection.appendChild(userRanking);
                });
            } else {
                console.warn('No hay rankings disponibles.');
                const noRankingsMessage = document.createElement('p');
                noRankingsMessage.textContent = 'No hay rankings disponibles actualmente.';
                rankingSection.appendChild(noRankingsMessage);
            }
        })
        .catch(error => console.error('Error al obtener ranking:', error));
    }

    // Función para crear elementos de ranking de usuarios
    function createUserRanking(ranking) {
        const item = document.createElement('div');
        item.classList.add('item');

        const content = document.createElement('div');
        content.classList.add('content');

        const img = document.createElement('img');
        img.classList.add('profile-image');
        img.src = 'http://127.0.0.1:8000/' + ranking.usuario.imagen_perfil;
        content.appendChild(img);

        const info = document.createElement('div');
        info.classList.add('info');

        const h4 = document.createElement('h4');
        h4.textContent = `${ranking.usuario.apellido_paterno || ''} ${ranking.usuario.apellido_materno || ''} ${ranking.usuario.nombre || ''}`;
        info.appendChild(h4);

        const viewDiv = document.createElement('div');
        viewDiv.classList.add('view');

        const medalIcon = document.createElement('i');
        medalIcon.classList.add('ri-medal-line');
        viewDiv.appendChild(medalIcon);

        const h5 = document.createElement('h5');
        h5.textContent = `${ranking.estado} | ${ranking.subcategoria ? ranking.subcategoria.nombre : ''}`;
        viewDiv.appendChild(h5);

        info.appendChild(viewDiv);
        content.appendChild(info);
        item.appendChild(content);

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('ri-heart-3-fill');
        item.appendChild(heartIcon);

        return item;
    }

    // Inicializar la carga de categorías, videos y ranking
    fetchAndShowCategories();
    fetchAndShowVideos();
    fetchAndShowRanking();
});
