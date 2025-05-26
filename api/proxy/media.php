<?php
// Configurar headers para permitir CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obtener la ruta del archivo de medios
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Eliminar 'frontend_php/api/proxy/media' del path
array_shift($path_parts); // frontend_php
array_shift($path_parts); // api
array_shift($path_parts); // proxy
array_shift($path_parts); // media

$media_path = implode('/', $path_parts);

// Si la ruta comienza con 'storage/', eliminarla
if (strpos($media_path, 'storage/') === 0) {
    $media_path = substr($media_path, 8);
}

$backend_url = "https://backend-laravel-wl09.onrender.com/storage/" . $media_path;

// Inicializar cURL
$ch = curl_init($backend_url);

// Configurar opciones de cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HEADER, true);

// Configurar headers
$headers = [
    'Accept: */*'
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
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Separar headers y body
$headers = substr($response, 0, $header_size);
$body = substr($response, $header_size);

// Cerrar la conexión
curl_close($ch);

// Si la petición fue exitosa
if ($http_code === 200 && $body) {
    // Establecer el tipo de contenido correcto
    header('Content-Type: ' . $content_type);
    echo $body;
} else {
    // Si hay un error, devolver una imagen por defecto para imágenes
    if (strpos($content_type, 'image/') === 0) {
        header('Content-Type: image/jpeg');
        $default_image = __DIR__ . '/../../assets/images/default.jpg';
        if (file_exists($default_image)) {
            readfile($default_image);
        } else {
            http_response_code(404);
            echo json_encode([
                'status' => false,
                'message' => 'Default image not found'
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'status' => false,
            'message' => 'Media not found'
        ]);
    }
} 