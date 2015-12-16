<?php

include_once './TokenCSRF.php';
include_once './Pascal.php';


header('Content-type: application/json');
//Descarto por ser un bot!
if (isset($_POST['sex']) && $_POST['sex'] !== '') {
    echo json_encode(array('enviado' => TRUE, 'trucho' => TRUE));
    die();
}

//Descarto por ser un bot!
if (!isset($_POST['email']) && $_POST['email'] === '' || !isset($_POST['name']) && $_POST['name'] === '') {
    echo json_encode(array('enviado' => TRUE, 'trucho' => TRUE));
    die();
}


$tk = new TokenCSRF();


$token = $_POST['code'];

if (!$tk->verifyFormToken('send-score', $token)) {
    echo json_encode(array('enviado' => TRUE, 'CRFF' => TRUE));
    die();
}


$nombre = $_POST['name'];
$email = $_POST['email'];
$dni = $_POST['dni'];
$telefono = $_POST['phone'];

$puntaje = intval($_POST['score']);
$tiempo = intval($_POST['time']);
$coincidencias = intval($_POST['matches']);
$intentos = intval($_POST['tries']);

$pascal = new Pascal();

$insertedID = $pascal->insertParticipant($nombre, $email, $dni, $puntaje, $telefono, $tiempo, $coincidencias, $intentos);

if ($insertedID[0]) {

    if ($pascal->sendEmail($email)) {
        echo json_encode(array('enviado' => TRUE, 'idParticipante' => $insertedID));
    } else {
        echo json_encode(array('enviado' => FALSE, 'MAILFAIL' => TRUE));
    }
} elseif ($insertedID[1] === 'existente') {
    echo json_encode(array('enviado' => FALSE, 'existente' => TRUE));
} else {
    echo json_encode(array('enviado' => FALSE, 'DBFAIL' => TRUE));
}
