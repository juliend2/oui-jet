<?php

$action = $_GET["action"] ?? "index";

function spit_headers()
{
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
}

function list_boxes()
{
    spit_headers();
    return json_encode([
        "status" => "success",
        "boxes" => [
            [
                "type" => "image",
                "value" =>
                    "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
            ],
            [
                "type" => "text",
                "value" => "Hola!",
            ],
            [
                "type" => "image",
                "value" =>
                    "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
            ],
            [
                "type" => "text",
                "value" => "Hola!",
            ],
            [
                "type" => "image",
                "value" =>
                    "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
            ],
            [
                "type" => "text",
                "value" => "Hola!",
            ],
        ],
    ]);
}

echo list_boxes();
