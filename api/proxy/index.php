<?php
// Configurar el archivo de log
$log_file = __DIR__ . '/proxy.log';
ini_set('log_errors', 1);
ini_set('error_log', $log_file);

// Habilitar reporte de errores para desarrollo
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Función para escribir en el log
function writeLog($message) {
    global $log_file;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

// Configurar headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Obtener la ruta del endpoint
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);
    $path_parts = explode('/', trim($path, '/'));

    // Eliminar 'frontend_php/api/proxy' del path
    array_shift($path_parts); // frontend_php
    array_shift($path_parts); // api
    array_shift($path_parts); // proxy

    $endpoint = implode('/', $path_parts);
    $backend_url = "https://backend-laravel-wl09.onrender.com/api/" . $endpoint;

    // Inicializar cURL
    $ch = curl_init($backend_url);

    // Configurar opciones básicas de cURL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    // Configurar headers
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json'
    ];

    // Agregar token si existe
    $auth_header = getallheaders()['Authorization'] ?? null;
    if ($auth_header) {
        $headers[] = "Authorization: " . $auth_header;
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Si es POST o PUT, enviar el body
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = file_get_contents('php://input');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    }

    // Ejecutar la petición
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    $curl_errno = curl_errno($ch);

    // Cerrar la conexión
    curl_close($ch);

    // Manejar errores de cURL
    if ($curl_error) {
        throw new Exception("Error de conexión: " . $curl_error);
    }

    // Si no hay respuesta
    if (!$response) {
        throw new Exception("No se recibió respuesta del servidor");
    }

    // Intentar decodificar la respuesta
    $decoded = json_decode($response);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Respuesta inválida del servidor: " . $response);
    }

    // Devolver la respuesta
    http_response_code($http_code);
    echo $response;

} catch (Exception $e) {
    // Manejar errores
    http_response_code(500);
    echo json_encode([
        'status' => false,
        'message' => $e->getMessage()
    ]);
} 