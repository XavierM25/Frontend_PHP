<?php
    require_once("view/head/header.php");
?>

<!-- Modals -->
<div id="modalAgregarVideo">
    <div class="modalAgregarVideo modal-close">
        <p class="closeAgregarVideo" id="closeAgregarVideo">X</p>
        <form id="video-form" class="modal-content">
            <div class="left-column">
                    <div class="campus">
                        <label for="campus">Campus</label>
                        <div class="camp-cont">
                            <select name="" id="campus">
                                <option value="" disabled selected></option>
                                <option value="Los Olivos">Los Olivos</option>
                                <option value="Trujillo">Trujillo</option>
                                <option value="Ate">Ate</option>
                                <option value="Callao">Callao</option>
                                <option value="San Juan de Luriganchos">San Juan de Lurigancho</option>
                                <option value="Chiclay">Chiclayo</option>
                                <option value="Chimbote">Chimbote</option>
                                <option value="Piura">Piura</option>
                                <option value="Tarapoto">Tarapoto</option>
                                <option value="Chepén">Chepén</option>
                                <option value="Huaraz">Huaraz</option>
                                <option value="Moyobamba">Moyobamba</option>
                            </select>
                        </div>
                    </div>

                <div class="categories-inpt">
                    <div class="categorie-vid">
                        <label for="categories">Categoría</label>
                        <div class="categorie-cont">
                            <select name="" id="categories">
                                
                            </select>
                        </div>
                    </div>
                </div>

                <div class="subcategorie-vid">
                    <label for="subcategories">Subcategoría</label>
                    <div class="subcategorie">
                        <select name="" id="subcategories">

                        </select>
                    </div>
                </div>

                <div class="inpt-desc">
                    <label for="desc-video">Descripción</label>
                    <div class="desc-cont">
                        <textarea name="" id="desc-video"></textarea>
                    </div>
                </div>
            </div>

            <div class="right-column">

                <div class="video-preview">
                    <div class="item-vide">
                        <video id="video-preview" src="" controls></video>
                    </div>
                </div>

                <div class="inpt-file">
                    <div class="file-cont">
                        <input type="file" id="video-file" class="video-file">
                        <label for="video-file" class="file-label"><i class="ri-video-upload-fill"></i> Subir Video</label>
                    </div>
                </div>

                <div class="inpt-content">
                    <div class="inpt-title">
                        <label for="title">Título</label>
                        <div class="title-cont">
                            <input id="title" type="text">
                        </div>
                    </div>

                    <div class="inpt-visibility">
                        <div class="visi-right">
                            <label for="visi">Visibilidad</label>
                            <div class="visi-cont">
                                <select name="" id="visi">
                                    <option value="publico">Público</option>
                                    <option value="privado">Oculto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bottom">
                        <div class="btns-video">
                            <button id="btnCrearVideo" type="submit">Crear video</button>
                        </div>
                    </div>
                </div>
            </div>

        </form>    
    </div>
</div>

<div id="modalEditarVideo">
    <div class="modalEditarVideo modal-close">
        <p class="closeEditar" id="closeEditarVideo">X</p>
        <form action="" class="modal-cont">
            <input type="hidden" id="id">
            <div class="left-column">

                <div class="inpt-title">
                    <label for="title-edit">Título</label>
                    <div class="title-cont">
                        <input id="title-edit" type="text">
                    </div>
                </div>

                <div class="inpt-desc">
                    <label for="desc-video-edit">Descripción</label>
                    <div class="desc-cont">
                        <textarea name="" id="desc-video-edit"></textarea>
                    </div>
                </div>

                        
                <div class="campus">
                    <label for="campus-edit">Campus</label>
                    <div class="camp-cont">
                        <select name="" id="campus-edit">
                            <option value="" disabled selected></option>
                            <option value="Los Olivos">Los Olivos</option>
                            <option value="Trujillo">Trujillo</option>
                            <option value="Ate">Ate</option>
                            <option value="Callao">Callao</option>
                            <option value="San Juan de Luriganchos">San Juan de Lurigancho</option>
                            <option value="Chiclay">Chiclayo</option>
                            <option value="Chimbote">Chimbote</option>
                            <option value="Piura">Piura</option>
                            <option value="Tarapoto">Tarapoto</option>
                            <option value="Chepén">Chepén</option>
                            <option value="Huaraz">Huaraz</option>
                            <option value="Moyobamba">Moyobamba</option>
                        </select>
                    </div>
                </div>

                <div class="categories-inpt">
                    <div class="categorie-vid">
                        <label for="categories-edit">Categoría</label>
                        <div class="categorie-cont">
                            <select name="" id="categories-edit">

                            </select>
                        </div>
                    </div>
                </div>

                <div class="subcategorie-vid">
                    <label for="subcategories-edit">Subcategoría</label>
                    <div class="subcategorie-cont">
                        <select name="" id="subcategories-edit">

                        </select>
                    </div>
                </div>
            </div>

            <div class="right-column">
                <div class="inpt-content">
                    <div class="inpt-visibility">
                        <div class="visi-right">
                            <label for="visi-edit">Visibilidad</label>
                            <div class="visi-cont">
                                <select name="" id="visi-edit">
                                    <option value="publico">Público</option>
                                    <option value="privado">Oculto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bottom">
                        <div class="btns-edivideo">
                            <button id="btnEditarDetails" type="submit">Editar video</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="modalEliminarVideo">
    <div class="modalEliminarVideo modal-close">
        <p id="closeEliminarVideo" class="closeEliminarVideo">X</p>
        <div class="modal-texts">
        <h2>Eliminar Video</h2>
        <p>¿Estás seguro de que deseas eliminar este video?</p>
            <button id="confirm-delete-btn">Eliminar</button>
            <button id="cancel-delete-btn">Cancelar</button>
        </div>
    </div>
</div>


<?php
    require_once("view/head/main.php");
?>

<h3 class="separator">
    Administrar Videos
</h3>

<!-- Botón para agregar un nuevo video -->
<button id="btnAgregarVideo">Agregar Nuevo Video <i class="ri-add-line"></i></button>

<!-- Tabla de videos -->
<section class="video-table">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Visibilidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="videos-list">
        </tbody>
    </table>
</section>

<?php
require_once("view/head/aside.php");
?>

    <h3 id="last-preview-video">Último Video Subido</h3>
    <div class="latest-video">
        <video id="lastVideoUploaded" src="" controls></video>
    </div>


    <h3>Detalle Video</h3>
    <div class="details-video">
        <div class="cont-fech">
            <label for="detailCate">Categoría</label>
            <input type="text" id="detailCate" disabled>
        </div>
        <div class="cont-fech">
            <label for="detailSubcate">Subcategoría</label>
            <input type="text" id="detailSubcate" disabled>
        </div>
        <div class="cont-fech">
            <label for="detailCampus">Campus</label>
            <input type="text" id="detailCampus" disabled>
        </div>
        <div class="cont-fech">
            <label for="fechPubli">Fecha de Publicación</label>
            <input id="fechPubli" type="date" disabled>
        </div>
        <div class="cont-deta">
            <div class="Like">
                <i class="ri-thumb-up-line"></i>
                <span id="detailLikes">0</span>
            </div>
        </div>
        
    </div>
</aside>
<script src="assets/js/API/videos.js"></script>
<script src="assets/js/dsbrd-ad.js"></script>
<script src="assets/js/navigation.js"></script>
</body>

</html>