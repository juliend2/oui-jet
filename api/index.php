<?php

include_once './lib.php';

// DB connecting
$dbPath = __DIR__ . '/../db.sqlite'; // saved in root dir

$pdo = new PDO("sqlite:$dbPath");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Pre-init DB:
$createTableSQL = "
CREATE TABLE IF NOT EXISTS boxes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    label TEXT NULL,
    url TEXT NULL,
    value TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$pdo->exec($createTableSQL);

// Routing
$action = $_GET["action"] ?? "index";

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Preflight request handling
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

// JSON Data:
$json = file_get_contents('php://input');
if ($json) {
    $data = json_decode($json, true);
    // Check if decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        // Handle the error
        echo json_encode(['error' => 'Invalid JSON']);
        http_response_code(400); // Bad Request
        exit;
    }
}


echo match ($action) {
    'index' => list_boxes($pdo),
    'create' => create_box($pdo, $data, $_FILES),
    default => four_oh_four(),
};
