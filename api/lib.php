<?php


function spit_headers()
{
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
}

function create_link_box()
{

}

function create_image_box()
{

}

function create_text_box($pdo, array $data): bool
{
    // $works = true;
    $stmt = $pdo->prepare(
        "INSERT INTO boxes (type, value)
         VALUES (:type, :value)"
    );
    $works = $stmt->execute([':type'=>'text', ':value'=>$data['value']]);

    if ($works) {
        return true;
    }
    return false;
}

function create_box($pdo, $data, $files)
{
    spit_headers();

    // var_dump($data);
    switch ($data['type']) {
        case 'text':
            if (create_text_box($pdo, $data)) {
                return json_encode(['status'=>'success']);
            }
            break;
        case 'link':
            if (create_link_box($pdo, $data)) {
                return json_encode(['status'=>'success']);
            }
            break;
        case 'image':
            if (create_image_box($pdo, $data, $files)) {
                return json_encode(['status'=>'success']);
            }
            break;
        default:
            return four_oh_four();
        break;
    }
    // depending on the type of box, route to a suitable function

    return json_encode(['status'=>'error', 'message'=>"Look, data ain't so good. Try again bro."]);
}

function get_boxes($pdo)
{
    $stmt = $pdo->prepare(
        "SELECT *
         FROM   boxes"
    );
    if (!$stmt->execute()) {
        return false;
    }
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function list_boxes($pdo)
{
    $boxes = get_boxes($pdo);
    spit_headers();
    return json_encode([
        "status" => "success",
        "boxes" => $boxes,
        // "boxes" => [
        //     [
        //         "type" => "image",
        //         "value" =>
        //             "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
        //     ],
        //     [
        //         "type" => "link",
        //         "label" => "Mon site",
        //         "url" => "https://desrosiers.org/",
        //     ],
        //     [
        //         "type" => "text",
        //         "value" => "Hola!",
        //     ],
        //     [
        //         "type" => "image",
        //         "value" =>
        //             "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
        //     ],
        //     [
        //         "type" => "text",
        //         "value" => "Hola!",
        //     ],
        //     [
        //         "type" => "image",
        //         "value" =>
        //             "https://upload.wikimedia.org/wikipedia/commons/9/9f/A_photo_of_an_apparition_in_Asyut_%28September_15th_2000%29..jpg",
        //     ],
        //     [
        //         "type" => "text",
        //         "value" => "Hola!",
        //     ],
        // ],
    ]);
}

function four_oh_four()
{
    http_response_code(404);
    spit_headers();
    return json_encode(['status'=>'error', 'message'=>'Not found']);
}

