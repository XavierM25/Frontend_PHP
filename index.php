<?php
require_once 'config.php';

function getUserRoleFromToken()
{
    // Esta función se ejecutaría en JavaScript, aquí solo es referencial
    return null;
}

function redirectBasedOnContext()
{
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $requestUri = $_SERVER['REQUEST_URI'] ?? '';

    // Si viene de una ruta específica, mantener el contexto
    if (strpos($requestUri, '/admin') !== false) {
        redirect('/auth/login_admin/index.php');
    } elseif (strpos($requestUri, '/cliente') !== false) {
        redirect('/auth/login/login.php');
    }

    // Redirección por defecto
    redirect('/auth/login/login.php');
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UCV - Sistema de Cultura y Deportes">
    <meta name="keywords" content="UCV, cultura, deportes, universidad">
    <link rel="icon" href="assets/images/ucv.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css">
    <title>UCV | Cultura y Deportes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .welcome-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 90%;
        }

        .logo {
            width: 80px;
            height: 80px;
            background: #667eea;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }

        .buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 500;
            transition: all 0.3s ease;
            min-width: 140px;
            justify-content: center;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-secondary {
            background: #764ba2;
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .features {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }

        .feature-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #666;
            font-size: 14px;
        }

        @media (max-width: 600px) {
            .buttons {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }
        }

        .loading {
            display: none;
            margin-top: 20px;
        }

        .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 10px;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <div class="welcome-container">
        <div class="logo">
            <i class="ri-graduation-cap-fill"></i>
        </div>

        <h1>Universidad César Vallejo</h1>
        <p class="subtitle">Sistema de Cultura y Deportes</p>

        <div class="buttons">
            <a href="auth/login/login.php" class="btn btn-primary" id="studentBtn">
                <i class="ri-user-line"></i>
                Estudiante
            </a>
            <a href="auth/login_admin/index.php" class="btn btn-secondary" id="adminBtn">
                <i class="ri-admin-line"></i>
                Administrador
            </a>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <span>Redirigiendo...</span>
        </div>

        <div class="features">
            <h3 style="color: #333; margin-bottom: 15px;">Características del Sistema</h3>
            <div class="feature-list">
                <div class="feature-item">
                    <i class="ri-video-line"></i>
                    <span>Videos Culturales</span>
                </div>
                <div class="feature-item">
                    <i class="ri-trophy-line"></i>
                    <span>Ranking Estudiantil</span>
                </div>
                <div class="feature-item">
                    <i class="ri-calendar-line"></i>
                    <span>Inscripciones</span>
                </div>
                <div class="feature-item">
                    <i class="ri-bar-chart-line"></i>
                    <span>Reportes Detallados</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Verificar si ya existe un token y redirigir automáticamente
        document.addEventListener('DOMContentLoaded', function() {
            const token = localStorage.getItem('token');
            const rolId = localStorage.getItem('rol_id');

            if (token && rolId) {
                const loading = document.getElementById('loading');
                loading.style.display = 'block';

                // Verificar si el token es válido
                fetch('<?php echo API_URL; ?>/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            // Token válido, redirigir según el rol
                            if (rolId === '1') {
                                window.location.href = '<?php echo CLIENT_HOME; ?>';
                            } else if (rolId === '2') {
                                window.location.href = '<?php echo ADMIN_HOME; ?>';
                            }
                        } else {
                            // Token inválido, limpiar localStorage
                            localStorage.removeItem('token');
                            localStorage.removeItem('rol_id');
                            loading.style.display = 'none';
                        }
                    })
                    .catch(error => {
                        console.error('Error verifying token:', error);
                        localStorage.removeItem('token');
                        localStorage.removeItem('rol_id');
                        loading.style.display = 'none';
                    });
            }

            // Agregar eventos a los botones
            document.getElementById('studentBtn').addEventListener('click', function(e) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = 'auth/login/login.php';
                }, 500);
            });

            document.getElementById('adminBtn').addEventListener('click', function(e) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = 'auth/login_admin/index.php';
                }, 500);
            });
        });

        function showLoading() {
            document.getElementById('loading').style.display = 'block';
            document.querySelector('.buttons').style.display = 'none';
        }

        // Detectar teclas de acceso rápido
        document.addEventListener('keydown', function(e) {
            if (e.key === '1') {
                document.getElementById('studentBtn').click();
            } else if (e.key === '2') {
                document.getElementById('adminBtn').click();
            }
        });
    </script>
</body>

</html>