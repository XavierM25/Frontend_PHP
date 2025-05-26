<?php
// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar si curl está disponible
if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => 'CURL no está disponible en el servidor']);
    exit();
}

// Configurar la petición al backend
$ch = curl_init('https://backend-laravel-wl09.onrender.com/api/auth/google');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Solo para desarrollo
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Solo para desarrollo

// Ejecutar la petición
$response = curl_exec($ch);

// Verificar si hubo error en curl
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Error CURL: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Devolver la respuesta
http_response_code($httpCode);
echo $response; 