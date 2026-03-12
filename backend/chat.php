<?php
// Chatbot backend for Dragon Ball History
// Uses Google Gemini API. Keep your API key in the GEMINI_API_KEY env var.

ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_DEPRECATED);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$mensaje = isset($input['mensaje']) ? trim($input['mensaje']) : '';
$pagina = isset($input['pagina']) ? trim($input['pagina']) : '';

if ($mensaje === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Mensaje vacio']);
  exit;
}

$apiKey = getenv('GEMINI_API_KEY');
$model = getenv('GEMINI_MODEL');
if (!$model) {
  $model = 'gemini-2.5-flash';
}

if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['error' => 'GEMINI_API_KEY no configurada']);
  exit;
}

$systemPrompt = "Eres un asistente experto en Dragon Ball. Responde solo preguntas sobre personajes, sagas, transformaciones e historia. Si no estas seguro, dilo. Responde en espanol claro y breve.";

$payload = [
  'contents' => [
    [
      'role' => 'user',
      'parts' => [
        ['text' => $systemPrompt . "\n\n" . $mensaje . ($pagina ? "\n\nContexto pagina: $pagina" : '')]
      ]
    ]
  ]
];

$url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";
$payloadJson = json_encode($payload);

// Prefer cURL if available; fallback to file_get_contents.
$response = null;
$httpCode = 0;

if (function_exists('curl_init')) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-goog-api-key: ' . $apiKey
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $payloadJson);

  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $error = curl_error($ch);
  curl_close($ch);

  if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al conectar con Gemini', 'details' => $error]);
    exit;
  }
} else {
  $context = stream_context_create([
    'http' => [
      'method' => 'POST',
      'header' => "Content-Type: application/json\r\n" .
                  "x-goog-api-key: {$apiKey}\r\n",
      'content' => $payloadJson,
      'ignore_errors' => true
    ]
  ]);

  $response = @file_get_contents($url, false, $context);
  $headers = [];
  if (function_exists('http_get_last_response_headers')) {
    $headers = http_get_last_response_headers();
  } elseif (isset($http_response_header)) {
    $headers = $http_response_header;
  }

  if (!empty($headers) && preg_match('/\s(\d{3})\s/', $headers[0], $m)) {
    $httpCode = (int)$m[1];
  }
}

$data = json_decode($response, true);

if ($httpCode < 200 || $httpCode >= 300) {
  http_response_code($httpCode ?: 500);
  echo json_encode(['error' => 'Respuesta de Gemini no exitosa', 'details' => $data]);
  exit;
}

$contenido = '';
if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
  $contenido = $data['candidates'][0]['content']['parts'][0]['text'];
}

if ($contenido === '') {
  $contenido = 'No pude generar una respuesta en este momento.';
}

echo json_encode(['respuesta' => $contenido]);
