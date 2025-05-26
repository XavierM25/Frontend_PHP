<?php
// Configurar headers para permitir CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // URL del backend
    $backend_url = "https://backend-laravel-wl09.onrender.com/api/profile";

    // Inicializar cURL
    $ch = curl_init($backend_url);

    // Configurar opciones de cURL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HEADER, true);

    // Configurar headers
    $headers = [
        'Accept: application/json',
        'Content-Type: application/json'
    ];

    // Agregar token si existe
    $auth_header = getallheaders()['Authorization'] ?? null;
    if ($auth_header) {
        $headers[] = "Authorization: " . $auth_header;
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Ejecutar la petición
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $curl_error = curl_error($ch);
    $curl_errno = curl_errno($ch);

    // Cerrar la conexión
    curl_close($ch);

    // Manejar errores de cURL
    if ($curl_error) {
        throw new Exception("Error de conexión: " . $curl_error);
    }

    // Separar headers y body
    $headers = substr($response, 0, $header_size);
    $body = substr($response, $header_size);

    // Si no hay respuesta
    if (!$body) {
        throw new Exception("No se recibió respuesta del servidor");
    }

    // Intentar decodificar la respuesta
    $decoded = json_decode($body);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Respuesta inválida del servidor: " . $body);
    }

    // Devolver la respuesta
    http_response_code($http_code);
    echo $body;

} catch (Exception $e) {
    // Manejar errores
    http_response_code(500);
    echo json_encode([
        'status' => false,
        'message' => $e->getMessage()
    ]);
} 