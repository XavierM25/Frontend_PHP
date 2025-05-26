<?php
// Configuración principal del proyecto unificado

// Configuración de la base de datos (si usas una local)
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'ucv_cultura_deportes');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configuración de la API
define('API_BASE_URL', 'http://127.0.0.1:8000/api');
define('API_PRODUCTION_URL', 'https://backend-laravel-wl09.onrender.com/api');

// Configuración de rutas base
define('BASE_URL', 'http://localhost:3000');
define('PROJECT_ROOT', dirname(__FILE__));

// Rutas de redirección después del login
define('ADMIN_HOME', BASE_URL . '/Admin/index.php');
define('CLIENT_HOME', BASE_URL . '/Cliente/index.php');

// Configuración de sesiones
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_secure', 0); // Cambiar a 1 en producción con HTTPS
session_start();

// Configuración de errores (desarrollo)
if ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    define('ENVIRONMENT', 'development');
    define('API_URL', API_BASE_URL);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    define('ENVIRONMENT', 'production');
    define('API_URL', API_PRODUCTION_URL);
}

// Configuración de zona horaria
date_default_timezone_set('America/Lima');

// Función para incluir archivos de forma segura
function includeFile($path)
{
    $fullPath = PROJECT_ROOT . '/' . $path;
    if (file_exists($fullPath)) {
        include_once $fullPath;
        return true;
    }
    return false;
}

// Función para redireccionar
function redirect($url)
{
    header("Location: " . $url);
    exit();
}

// Función para verificar autenticación (si usas sesiones PHP)
function isAuthenticated()
{
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

// Función para verificar rol de usuario
function hasRole($role)
{
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === $role;
}

// Función para limpiar datos de entrada
function sanitizeInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Headers de seguridad
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Configuración de CORS (si es necesario para la API)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit();
}
