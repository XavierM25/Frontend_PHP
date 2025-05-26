<?php
// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

// Obtener el contenido del POST
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log de los datos recibidos
error_log("Datos recibidos del frontend: " . print_r($data, true));

// Verificar si los datos son válidos
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido: ' . json_last_error_msg()]);
    exit();
}

// Asegurarse de que los campos tengan los nombres correctos
$requestData = [
    'username' => $data['username'],
    'contraseña' => $data['password']
];

// Log de los datos transformados
error_log("Datos transformados para el backend: " . print_r($requestData, true));

// Configurar la petición al backend
$ch = curl_init('https://backend-laravel-wl09.onrender.com/api/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Solo para desarrollo
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Solo para desarrollo

// Log de la petición completa
error_log("URL del backend: https://backend-laravel-wl09.onrender.com/api/login");
error_log("Headers enviados: " . print_r([
    'Content-Type: application/json',
    'Accept: application/json'
], true));
error_log("Datos enviados al backend: " . json_encode($requestData));

// Ejecutar la petición
$response = curl_exec($ch);

// Log de la respuesta del backend
error_log("Respuesta del backend: " . $response);

// Verificar si hubo error en curl
if (curl_errno($ch)) {
    error_log("Error CURL: " . curl_error($ch));
    http_response_code(500);
    echo json_encode(['error' => 'Error CURL: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
error_log("Código de respuesta HTTP: " . $httpCode);

curl_close($ch);

// Devolver la respuesta
http_response_code($httpCode);
echo $response;