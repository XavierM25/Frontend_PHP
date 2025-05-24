<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="assets/css/index.css">
    <title>UCV | Login</title>
</head>

<body>
    <div class="container" id="container">
        <section class="form-container sign-in">
            <div class="header">
                <h1>Iniciar Sesión</h1>
                <span></span>
            </div>
            <div class="form-outer">
                <form id="login-form" action="" method="post" autocomplete="off">
                    <div class="in-log">
                        <label for="user-login">Usuario</label>
                        <input id="user-login" name="user-login" type="text" placeholder="Usuario">
                    </div>
                    <div class="in-log">
                        <label for="pass-login">Contraseña</label>
                        <div class="box-eye">
                            <button id="buttLog-pass" type="button" onclick="mostrarContrasena('pass-login','show-pass')">
                                <i id="show-pass" class="fa-solid fa-eye logPass"></i>
                            </button>
                        </div>
                        <input id="pass-login" name="pass-login" type="password" placeholder="Contraseña">
                    </div>
                    <a href="recuperar.php">Olvidaste tu contraseña?</a>
                    <button id="log-sign-in">Iniciar Sesión</button>
                </form>
                <div class="redirect-admin">
                        <a id="redirect-admin" href="../Login Admin/index.php">Ingresa como Admin</a>
                    </div>
            </div>
        </section>

        <section class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h2>Bienvenido de nuevo!</h2>
                    <p>Ingresa tus datos personales para saber todo sobre Deportes y Cultura UCV</p>
                    <button class="hidden" id="login">Iniciar Sesión</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h2>Hola, Vallejiano!</h2>
                    <p>Registrate con tus datos personales para saber todo sobre Deportes y Cultura UCV</p>
                    <button class="hidden" id="register">Registrarse</button>
                </div>
            </div>
        </section>

        <section class="form-container sign-up">
            <div class="header">
                <h2>Crear Cuenta</h2>
                <span></span>
            </div>
            <div class="form-outer">
                <form id="register-form" action="" method="post" autocomplete="off">
                <!--Fase 1-->    
                <div class="page slide-page">
                        <div class="field" onsubmit="return validateStep1();">
                            <label for="name-regi">Nombre</label>
                            <input id="name-regi" name="nombr" type="text" placeholder="Nombre">
                        </div>
                        <div class="field">
                            <label for="apep-regi">Apellido Paterno</label>
                            <input id="apep-regi" name="ape-pa" type="text" placeholder="Apellido Paterno">
                        </div>
                        <div class="field">
                            <label for="apem-regi">Apellido Materno</label>
                            <input id="apem-regi" name="ape-ma" type="text" placeholder="Apellido Materno">
                        </div>
                        <div class="field">
                            <button type="button" class="firstNext next"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!--Fase 2-->  
                    <div class="page" onsubmit="return validateStep2();">
                        <div class="field">
                            <label for="naci-regi">Fecha de Nacimiento</label>
                            <input type="date" id="naci-regi" name="fech-naci" max="2024-12-31">
                        </div>
                        <div class="field">
                            <div class="sex-label">
                                <span>Selecciona tu sexo:</span>
                            </div>
                            <div class="sex-M">
                                <input type="radio" id="sex-masculino" name="sex" value="M">
                                <label for="sex-masculino">Masculino</label>
                            </div>
                            <div class="sex-F">
                                <input type="radio" id="sex-femenino" name="sex" value="F">
                                <label for="sex-femenino">Femenino</label>
                            </div>
                        </div>
                        <div class="field btns">
                            <button type="button" class="prev-1 prev"><i class="fa-solid fa-arrow-left"></i></button>
                            <button type="button" class="next-1 next"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!--Fase 3-->  
                    <div class="page" onsubmit="return validateStep3();">
                        <div class="field">
                            <input id="email-regi" type="email" name="correo" placeholder="Email">
                        </div>
                        <div class="field">
                            <select id="carrera_ucv" name="carrera">
                                <option value="-1" disabled selected>Carrera Profesional</option>
                                <option value="Administración y Marketing">Administración y Marketing</option>
                                <option value="Administración y Negocios Internacionales">Administración y Negocios Internacionales</option>
                                <option value="Administración">Administración</option>
                                <option value="Administración en Turimos y Hotelería">Administración en Turimos y Hotelería</option>
                                <option value="Contabilidad">Contabilidad</option>
                                <option value="Economía">Economía</option>
                                <option value="Gestión Pública">Gestión Pública</option>
                                <option value="Artes & Diseño Gráfico Empresarial">Artes & Diseño Gráfico Empresarial</option>
                                <option value="Ciencias de la Comunicación">Ciencias de la Comunicación</option>
                                <option value="Ciencias del Deporte">Ciencias del Deporte</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Educación Inicial">Educación Inicial</option>
                                <option value="Educación Primaria">Educación Primaria</option>
                                <option value="Traducción e Interpretación">Traducción e Interpretación</option>
                                <option value="Arquitectura">Arquitectura</option>
                                <option value="Ingeniería de Ciberseguridad">Ingeniería de Ciberseguridad</option>
                                <option value="Ingeniería en Ciencia de Datos">Ingeniería en Ciencia de Datos</option>
                                <option value="Ingeniería Empresarial">Ingeniería Empresarial</option>
                                <option value="Ingeniería Agroindustrial">Ingeniería Agroindustrial</option>
                                <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
                                <option value="Ingeniería Civil">Ingeniería Civil</option>
                                <option value="Ingeniería de Minas">Ingeniería de Minas</option>
                                <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                                <option value="Ingeniería Mecánica Eléctrica">Ingeniería Mecánica Eléctrica</option>
                                <option value="Enfermería">Enfermería</option>
                                <option value="Estomología">Estomología</option>
                                <option value="Medicina">Medicina</option>
                                <option value="Nutrición">Nutrición</option>
                                <option value="Psicología">Psicología</option>
                                <option value="Tecnología Médica">Tecnología Médica</option>
                            </select>
                        </div>
                        <div class="field">
                            <select id="campus_ucv" name="campus">
                                <option value="-1" disabled selected>Campus</option>
                                <option value="Los Olivos">Los Olivos</option>
                                <option value="Trujillo">Trujillo</option>
                                <option value="Ate">Ate</option>
                                <option value="Callao">Callao</option>
                                <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
                                <option value="Chiclayo">Chiclayo</option>
                                <option value="Chimbote">Chimbote</option>
                                <option value="Piura">Piura</option>
                                <option value="Tarapoto">Tarapoto</option>
                                <option value="Chepén">Chepén</option>
                                <option value="Huaraz">Huaraz</option>
                                <option value="Moyobamba">Moyobamba</option>
                            </select>
                        </div>
                        <div class="field">
                            <input id="cel-regi" type="text" name="numCel" placeholder="Número Celular">
                        </div>
                        <div class="field btns">
                            <button type="button" class="prev-2 prev"><i class="fa-solid fa-arrow-left"></i></button>
                            <button type="button" class="next-2 next"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!--Fase 4-->  
                    <div class="page" onsubmit="return validateStep4();">
                        <div class="field">
                            <label for="pass-regi">Contraseña</label>
                            <div class="box-eye">
                                <button id="buttRegi-pass" type="button" onclick="mostrarContrasena('pass-regi','show-pass-regi')">
                                    <i id="show-pass-regi" class="fa-solid fa-eye logPass"></i>
                                </button>
                            </div>
                            <input id="pass-regi" type="password" name="contrasena" placeholder="Contraseña">
                        </div>
                        <div class="field">
                            <label for="pass_ve-regi">Verificar Contraseña</label>
                            <div class="box-eye">
                                <button id="buttRegi-veriPass" type="button" onclick="mostrarContrasena('pass_ve-regi','veri-pass-regi')">
                                    <i id="veri-pass-regi" class="fa-solid fa-eye logPass"></i>
                                </button>
                            </div>
                            <input id="pass_ve-regi" type="password" name="verify-contra" placeholder="Verificar Contraseña">
                        </div>
                        <div class="field btns">
                            <button type="button" class="prev-3 prev"><i class="fa-solid fa-arrow-left"></i></button>
                            <button id="regi-sign-up" type="submit" class="submit"><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <script src="assets/js/validar.js"></script>
    <script src="assets/js/movimiento.js"></script>
    <script src="assets/js/login.js"></script>
    <script src="assets/js/register.js"></script>
</body>
</html>