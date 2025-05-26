document.addEventListener('DOMContentLoaded', function() {
    const filterRankSection = document.querySelector('.categories-rank');
    const subCateRankSection = document.querySelector('.subcategories-rank');
    const rankUserCont = document.querySelector('.rankUser-cont');
    const btnViewMore = document.getElementById('btnViewMore');
    const tableRank = document.getElementById('tableRank');
    const tableBody = document.querySelector('#tableRank tbody');

    const studentDetails = document.getElementById('student-details');
    const studetPosition = document.getElementById('studetPosition');
    const studentCategorySubca = document.getElementById('studentCategorySubca');
    const studentImage = document.getElementById('studentImage');
    const studentFullName = document.getElementById('studentFullName');
    const studentCareer = document.getElementById('studentCareer');
    const detailCat = document.getElementById('detailCat');
    const detailSubCat = document.getElementById('detailSubCat');
    const detailPuntos = document.getElementById('detailPuntos');

    let currentCategoryId = null;
    let currentSubcategoryId = null;
    let isTableVisible = false;

    // Función para verificar el contenido del input
    const checkInputValue = () => {
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });
    };

    // Manejo de los inputs
    const inputs = document.querySelectorAll('.detailsInpt input');
    checkInputValue(); // Verificar el estado inicial de los inputs

    // Verificar el valor del input cuando cambie
    inputs.forEach(input => {
        input.addEventListener('input', checkInputValue);
    });

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
            filterRankSection.innerHTML = '<li class="active" id="all-categories">Todo</li>';

            const allCategoriesItem = document.getElementById('all-categories');
            allCategoriesItem.addEventListener('click', () => {
                document.querySelectorAll('.categories-rank li').forEach(li => li.classList.remove('active'));
                allCategoriesItem.classList.add('active');
                subCateRankSection.innerHTML = '';
                currentCategoryId = null;
                currentSubcategoryId = null;
                fetchAndShowRankings();
            });

            data.categories.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.textContent = category.nombre;
                categoryItem.dataset.categoryId = category.id;

                categoryItem.addEventListener('click', () => {
                    document.querySelectorAll('.categories-rank li').forEach(li => li.classList.remove('active'));
                    categoryItem.classList.add('active');
                    currentCategoryId = category.id;
                    fetchAndShowSubcategories(category.id);
                });

                filterRankSection.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error al obtener categorías:', error));
    }

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
            subCateRankSection.innerHTML = '';

            data.subcategorias.forEach(subcategoria => {
                const subcategoryItem = document.createElement('li');
                subcategoryItem.textContent = subcategoria.nombre;
                subcategoryItem.dataset.subcategoryId = subcategoria.id;

                subcategoryItem.addEventListener('click', () => {
                    document.querySelectorAll('.subcategories-rank li').forEach(li => li.classList.remove('active'));
                    subcategoryItem.classList.add('active');
                    currentSubcategoryId = subcategoria.id;
                    fetchAndShowRankings();
                });

                subCateRankSection.appendChild(subcategoryItem);
            });
        })
        .catch(error => console.error('Error al obtener subcategorías:', error));
    }

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
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 200 && Array.isArray(data.rankings)) {
                let rankings = data.rankings;

                if (currentSubcategoryId) {
                    rankings = rankings.filter(ranking => ranking.subcategoria_id === currentSubcategoryId);
                }

                if (rankings.length > 0) {
                    if (!isTableVisible) {
                        updateTop3Rankings(rankings.slice(0, Math.min(3, rankings.length)));
                    } else {
                        updateTableRank(rankings);
                    }
                } else {
                    console.warn('No hay rankings disponibles.');
                    if (!isTableVisible) {
                        updateTop3Rankings([]);
                    } else {
                        updateTableRank([]);
                    }
                }
            } else {
                console.error(data.message || 'Error al obtener rankings.');
                if (!isTableVisible) {
                    updateTop3Rankings([]);
                } else {
                    updateTableRank([]);
                }
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            if (!isTableVisible) {
                updateTop3Rankings([]);
            } else {
                updateTableRank([]);
            }
        });
    }

    function updateTop3Rankings(rankings) {
        // Limpiar la sección de rankings
        const descCont = document.querySelector('.rankUser-cont .descCont');
        descCont.innerHTML = '';

        // Crear y añadir elementos HTML dinámicamente
        rankings.forEach((ranking, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slide_div');
            slideDiv.id = `slide_${index + 1}`;

            const itemRank = document.createElement('div');
            itemRank.classList.add('itemRank');
            itemRank.id = `item${index + 1}`;

            const likeDiv = document.createElement('div');
            likeDiv.classList.add('like');
            likeDiv.innerHTML = '<i class="ri-heart-3-fill"></i>';
            itemRank.appendChild(likeDiv);

            const rankHeader = document.createElement('h2');
            rankHeader.id = `top${index + 1}-rank`;
            rankHeader.innerHTML = `#${index + 1} <p>${ranking.subcategoria ? ranking.subcategoria.nombre : ''}</p>`;
            itemRank.appendChild(rankHeader);

            const userDetails = document.createElement('div');
            userDetails.classList.add('userDetails');

            const userName = document.createElement('h3');
            userName.textContent = `${ranking.usuario.apellido_paterno || ''} ${ranking.usuario.apellido_materno || ''} ${ranking.usuario.nombre || ''}`;
            userDetails.appendChild(userName);

            const userCarrera = document.createElement('h4');
            userCarrera.textContent = ranking.usuario.carrera || '';
            userDetails.appendChild(userCarrera);

            itemRank.appendChild(userDetails);

            const userImage = document.createElement('img');
            const defaultImageUrl = 'assets/images/profile.png'; // Ruta de la imagen predeterminada

            if (ranking.usuario.imagen_perfil) {
                const perfilImageUrl = 'http://127.0.0.1:8000/' + ranking.usuario.imagen_perfil;
                userImage.src = perfilImageUrl;
            } else {
                userImage.src = defaultImageUrl;
            }

            userImage.alt = 'Imagen de perfil';
            itemRank.appendChild(userImage);


            const optionList = document.createElement('div');
            optionList.classList.add('optionList');

            const userRecord = document.createElement('div');
            userRecord.classList.add('userRecord');
            const medalIcon = document.createElement('i');
            medalIcon.classList.add('ri-medal-line');
            userRecord.appendChild(medalIcon);
            const userEstado = document.createElement('h3');
            userEstado.textContent = ranking.estado || '';
            userRecord.appendChild(userEstado);
            optionList.appendChild(userRecord);

            const option = document.createElement('div');
            option.classList.add('option');
            const userPuntos = document.createElement('p');
            userPuntos.textContent = `${ranking.total_puntos || ''} puntos`;
            option.appendChild(userPuntos);
            optionList.appendChild(option);

            itemRank.appendChild(optionList);

            slideDiv.appendChild(itemRank);
            descCont.appendChild(slideDiv);

            // Añadir event listener para mostrar detalles del estudiante al hacer clic en el slide_div
            slideDiv.addEventListener('click', () => {
                showStudentDetails(ranking);
            });
        });
    }

    function updateTableRank(rankings) {
        if (isTableVisible) {
            tableBody.innerHTML = '';

            rankings.forEach((ranking, index) => {
                const row = document.createElement('tr');
                row.dataset.rankingIndex = index;
                row.innerHTML = `
                    <td>#${index + 1}</td>
                    <td>${ranking.usuario.nombre || ''}</td>
                    <td>${ranking.usuario.apellido_paterno || ''} ${ranking.usuario.apellido_materno || ''}</td>
                    <td>${ranking.subcategoria ? `${ranking.subcategoria.categoria ? ranking.subcategoria.categoria.nombre : ''} | ${ranking.subcategoria.nombre}` : ''}</td>
                    <td>${ranking.total_puntos || ''} puntos</td>
                    <td>${ranking.estado || ''}</td>
                `;
                tableBody.appendChild(row);

                row.addEventListener('click', () => {
                    showStudentDetails(ranking);
                });
            });
        }
    }

    function showStudentDetails(ranking) {
        studetPosition.textContent = ranking.posicion !== undefined && ranking.posicion !== null ? `#${ranking.posicion}` : '';
        studentCategorySubca.textContent = ranking.subcategoria ? `${ranking.subcategoria.categoria ? ranking.subcategoria.categoria.nombre : ''} | ${ranking.subcategoria.nombre}` : '';
        if (ranking.usuario && ranking.usuario.imagen_perfil) {
            studentImage.src = 'http://127.0.0.1:8000/' + ranking.usuario.imagen_perfil;
        } else {
            studentImage.src = 'assets/images/profile.png';
        }
        
        studentFullName.textContent = `${ranking.usuario.nombre || ''} ${ranking.usuario.apellido_paterno || ''} ${ranking.usuario.apellido_materno || ''}`;
        studentCareer.textContent = ranking.usuario.carrera || '';
        detailCat.value = ranking.subcategoria ? (ranking.subcategoria.categoria ? ranking.subcategoria.categoria.nombre : '') : '';
        detailSubCat.value = ranking.subcategoria ? ranking.subcategoria.nombre : '';
        detailPuntos.value = `${ranking.total_puntos || ''} puntos`;

        studentDetails.style.display = 'block';
        checkInputValue();
    }

    btnViewMore.addEventListener('click', function() {
        if (!isTableVisible) {
            tableRank.classList.remove('hidden');
            rankUserCont.classList.add('reduced');
            isTableVisible = true;
            fetchAndShowRankings();
        } else {
            tableRank.classList.add('hidden');
            rankUserCont.classList.remove('reduced');
            isTableVisible = false;
            fetchAndShowRankings();
        }
    });

    fetchAndShowCategories();
    fetchAndShowRankings();
});
