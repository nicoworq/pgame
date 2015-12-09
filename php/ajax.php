<?php

include_once './TokenCSRF.php';
include_once './Pascal.php';


header('Content-type: application/json');
//Descarto por ser un bot!
if (isset($_POST['sex']) && $_POST['sex'] !== '') {
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


if($pascal->insertParticipant($nombre, $email, $dni, $puntaje, $telefono, $tiempo, $coincidencias, $intentos)){
     echo json_encode(array('enviado' => TRUE));
}else{
     echo json_encode(array('enviado' => FALSE, 'DBFAIL' => TRUE));
}
