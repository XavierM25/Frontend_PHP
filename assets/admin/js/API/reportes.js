document.addEventListener('DOMContentLoaded', function () {
    const previewButton = document.querySelector('.btns-reports .preview');
    const reportButton = document.querySelector('.btns-reports .report');
    const previewContainer = document.querySelector('.cont-preview');
    const historySection = document.querySelector('.history .cont-hist');
    const baseUrl = 'http://127.0.0.1:8000/api/reportes';

    // Función para limpiar la previsualización
    function clearPreview() {
        previewContainer.innerHTML = '<span>No se encontró una previsualización</span>';
    }

    // Función para obtener los filtros seleccionados
    function getFilters() {
        const module = document.getElementById('modules').value;
        const format = document.getElementById('formats').value;
        const startDate = document.getElementById('fecha_inicio').value;
        const endDate = document.getElementById('fecha_fin').value;
        const orderBy = document.getElementById('orders-users-select').value;
        const order = document.getElementById('orden').value;

        const filters = {
            modulo: module,
            formato: format,
            ordenar_por: orderBy,
            orden: order,
            fecha_inicio: startDate,
            fecha_fin: endDate
        };

        return filters;
    }

    // Función para mostrar la previsualización de datos
    function showPreview() {
        try {
            const filters = getFilters();
            const token = localStorage.getItem('token');

            // Validar que haya seleccionado un rango de fecha
            if (filters.fecha_inicio && filters.fecha_fin) {
                fetch(`${baseUrl}/preview`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(filters)
                })
                    .then(response => {
                        if (response.status === 404) {
                            throw new Error('No se encontraron datos en ese rango de fecha.');
                        }
                        if (!response.ok) {
                            throw new Error('No se pudo obtener la previsualización de datos.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data && data.data && data.data.length > 0) {
                            // Construir HTML para mostrar la previsualización
                            let previewHTML = '<table class="table-preview">';
                            previewHTML += '<thead><tr>';

                            // Definir los encabezados según el módulo seleccionado
                            switch (filters.modulo) {
                                case 'Usuarios':
                                    previewHTML += '<th>ID</th><th>Nombre</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>Sexo</th><th>Username</th><th>Email</th><th>Fecha Nacimiento</th><th>Campus</th><th>Carrera</th><th>Número de Teléfono</th><th>Fecha Creación</th>';
                                    break;
                                case 'Ranking':
                                    previewHTML += '<th>ID Usuario</th><th>Nombre Usuario</th><th>ID Subcategoría</th><th>Nombre Subcategoría</th><th>Total Puntos</th><th>Estado</th><th>Última Actualización</th>';
                                    break;
                                case 'Actividades':
                                    previewHTML += '<th>ID</th><th>Subcategoría Nombre</th><th>Categoría ID</th><th>Categoría Nombre</th><th>Vacantes</th><th>Creado en</th><th>Actualizado en</th><th>Vacantes Ocupadas</th><th>Horarios</th>';
                                    break;
                                case 'Inscripciones':
                                    previewHTML += '<th>ID</th><th>ID Usuario</th><th>Nombre Usuario</th><th>ID Categoría</th><th>Nombre Categoría</th><th>ID Subcategoría</th><th>Nombre Subcategoría</th><th>ID Horario</th><th>Fecha Horario</th><th>Estado</th><th>Número Vacante</th><th>Comentarios</th><th>Creado en</th><th>Actualizado en</th>';
                                    break;
                                default:
                                    break;
                            }

                            previewHTML += '</tr></thead><tbody>';

                            // Generar filas de datos
                            data.data.forEach(item => {
                                previewHTML += '<tr>';

                                // Llenar las celdas según el módulo seleccionado
                                switch (filters.modulo) {
                                    case 'Usuarios':
                                        previewHTML += `<td>${item.id}</td>
                                                <td>${item.nombre}</td>
                                                <td>${item.apellido_paterno}</td>
                                                <td>${item.apellido_materno}</td>
                                                <td>${item.sexo}</td>
                                                <td>${item.username}</td>
                                                <td>${item.email}</td>
                                                <td>${item.fecha_nacimiento}</td>
                                                <td>${item.campus}</td>
                                                <td>${item.carrera}</td>
                                                <td>${item.numero_telefono}</td>
                                                <td>${item.created_at}</td>`;
                                        break;
                                    case 'Ranking':
                                        previewHTML += `<td>${item.usuario_id}</td>
                                                <td>${item.usuario.nombre}</td>
                                                <td>${item.subcategoria_id}</td>
                                                <td>${item.subcategoria.nombre}</td>
                                                <td>${item.puntos}</td>
                                                <td>${item.estado}</td>
                                                <td>${item.updated_at}</td>`;
                                        break;
                                    case 'Actividades':
                                        previewHTML += `<td>${item.id}</td>
                                                <td>${item.nombre}</td>
                                                <td>${item.categoria_id}</td>
                                                <td>${item.categoria.nombre}</td>
                                                <td>${item.vacantes}</td>
                                                <td>${item.created_at}</td>
                                                <td>${item.updated_at}</td>
                                                <td>${item.vacantes_ocupadas}</td>
                                                <td>${item.horarios.map(h => `${h.dia}-${h.hora_inicio}-${h.hora_fin}`).join(', ')}</td>`;
                                        break;
                                    case 'Inscripciones':
                                        previewHTML += `<td>${item.id}</td>
                                                <td>${item.usuario_id}</td>
                                                <td>${item.usuario.nombre}</td>
                                                <td>${item.categoria_id}</td>
                                                <td>${item.categoria.nombre}</td>
                                                <td>${item.subcategoria_id}</td>
                                                <td>${item.subcategoria.nombre}</td>
                                                <td>${item.horario_id}</td>
                                                <td>${item.horario ? `${item.horario.dia}-${item.horario.hora_inicio}-${item.horario.hora_fin}` : ''}</td>
                                                <td>${item.estado}</td><td>${item.numero_vacante}</td>
                                                <td>${item.comentarios}</td><td>${item.created_at}</td>
                                                <td>${item.updated_at}</td>`;
                                        break;
                                    default:
                                        break;
                                }

                                previewHTML += '</tr>';
                            });
                            previewHTML += '</tbody></table>';

                            previewContainer.innerHTML = previewHTML;
                        } else {
                            clearPreview();
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener la previsualización:', error);
                        clearPreview();
                        alert('Error al obtener la previsualización de datos.');
                    });
            } else {
                clearPreview();
                alert('Por favor selecciona un rango de fecha válido.');
            }
        } catch (error) {
            console.error('Error al obtener la previsualización:', error);
            clearPreview();
            alert('Error al obtener la previsualización de datos.');
        }
    }

    // Función para generar el reporte y descargar directamente
    function generateReport() {
        try {
            const filters = getFilters();
            const token = localStorage.getItem('token');

            // Validar que haya seleccionado un rango de fecha
            if (filters.fecha_inicio && filters.fecha_fin) {
                fetch(`${baseUrl}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(filters)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al generar el reporte.');
                        }
                        return response.json(); // Convertir la respuesta a JSON para obtener el reporte creado
                    })
                    .then(data => {
                        if (data && data.reporte && data.reporte.id) {
                            // Hacer la solicitud de descarga con las cabeceras de autenticación
                            fetch(`${baseUrl}/download/${data.reporte.id}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Bearer ' + token,
                                    'Accept': 'application/octet-stream'
                                }
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Error al descargar el reporte.');
                                    }
                                    return response.blob();
                                })
                                .then(blob => {
                                    // Crear un enlace temporal y simular clic para descargar el archivo
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.style.display = 'none';
                                    a.href = url;
                                    a.download = data.reporte.file_path.split('/').pop(); // Obtener el nombre del archivo desde la ruta
                                    document.body.appendChild(a);
                                    a.click();
                                    window.URL.revokeObjectURL(url);

                                    alert('Reporte generado y descargado correctamente.');
                                    clearPreview();
                                    loadReportHistory(); // Actualizar el historial de reportes después de descargar
                                })
                                .catch(error => {
                                    console.error('Error al descargar el reporte:', error);
                                    alert('Error al descargar el reporte.');
                                });
                        } else {
                            alert('No se pudo obtener la ruta del reporte para descargar.');
                        }
                    })
                    .catch(error => {
                        console.error('Error al generar el reporte:', error);
                        alert('Error al generar el reporte.');
                    });
            } else {
                clearPreview();
                alert('Por favor selecciona un rango de fecha válido.');
            }
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            alert('Error al generar el reporte.');
        }
    }

    // Evento para previsualizar datos
    previewButton.addEventListener('click', showPreview);

    // Evento para generar reporte
    reportButton.addEventListener('click', generateReport);

    // Evento para actualizar el mínimo de la fecha final al seleccionar la fecha de inicio
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');

    fechaInicioInput.addEventListener('change', function () {
        fechaFinInput.min = this.value;
    });

    // Inicializar fecha mínima en fecha final al cargar la página
    fechaFinInput.min = fechaInicioInput.value;

    // Función para cargar dinámicamente el historial de reportes
    function loadReportHistory() {
        const token = localStorage.getItem('token');

        fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el historial de reportes.');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.reportes && data.reportes.length > 0) {
                    const reportes = data.reportes;
                    historySection.innerHTML = ''; // Limpiar contenido anterior

                    reportes.forEach(reporte => {
                        // Obtener fecha formateada como dd/mm/yyyy
                        const formattedDate = formatDate(reporte.created_at);

                        const reporteHTML = `
                        <div class="element-history" id="reporte-${reporte.id}">
                            <h4>Reporte Generado: <p>${reporte.modulo}</p></h4>
                            <div class="details-element">
                                <div class="inpt-date">
                                    <h5>Fecha</h5>
                                    <p>${formattedDate}</p> <!-- Mostrar fecha formateada -->
                                </div>
                                <div class="inpt-type">
                                    <h5>Formato</h5>
                                    <p>${reporte.formato}</p>
                                </div>
                            </div>
                            <div class="btn-history">
                                <button class="download-btn" data-id="${reporte.id}"><i class="ri-download-line"></i></button>
                                <button class="delete-btn" data-id="${reporte.id}"><i class="ri-delete-bin-2-line"></i></button>
                            </div>
                        </div>
                    `;
                        historySection.insertAdjacentHTML('beforeend', reporteHTML);
                    });

                    // Agregar eventos para los botones de descargar y eliminar
                    const downloadButtons = document.querySelectorAll('.download-btn');
                    const deleteButtons = document.querySelectorAll('.delete-btn');

                    downloadButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            const reporteId = this.getAttribute('data-id');
                            downloadReport(reporteId);
                        });
                    });

                    deleteButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            const reporteId = this.getAttribute('data-id');
                            deleteReport(reporteId);
                        });
                    });
                } else {
                    historySection.innerHTML = '<span>No hay reportes generados.</span>';
                }
            })
            .catch(error => {
                console.error('Error al cargar el historial de reportes:', error);
                historySection.innerHTML = '<span>Error al cargar el historial de reportes.</span>';
            });
    }

    // Función para descargar un reporte específico desde el historial
    function downloadReport(id) {
        const token = localStorage.getItem('token');

        fetch(`${baseUrl}/download/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/octet-stream'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al descargar el reporte.');
                }

                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = id; // Usar el nombre del archivo obtenido del servidor
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);

                alert('Reporte descargado correctamente.');
                loadReportHistory(); // Actualizar el historial de reportes después de descargar
            })
            .catch(error => {
                console.error('Error al descargar el reporte:', error);
                alert('Error al descargar el reporte.');
            });
    }

    // Función para eliminar un reporte específico
    function deleteReport(id) {
        const token = localStorage.getItem('token');

        if (confirm('¿Estás seguro que deseas eliminar este reporte?')) {
            fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el reporte.');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Reporte eliminado correctamente.');
                    loadReportHistory(); // Actualizar el historial de reportes después de eliminar
                })
                .catch(error => {
                    console.error('Error al eliminar el reporte:', error);
                    alert('Error al eliminar el reporte.');
                });
        }
    }

    // Función para formatear la fecha a dd/mm/yyyy
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Cargar el historial de reportes al iniciar la página
    loadReportHistory();
    clearPreview();
});
