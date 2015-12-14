<?php

include_once './TokenCSRF.php';
include_once './Pascal.php';


header('Content-type: application/json');

$tk = new TokenCSRF();

$token = $_POST['code'];

if (!$tk->verifyFormToken('code-fb', $token)) {
    echo json_encode(array('enviado' => TRUE, 'CRFF' => TRUE));
    die();
}


$id_participante = intval($_POST['idParticipante']);

$puntaje = intval($_POST['totalScore']);

$pg = new Pascal();

if ($pg->participantShared($id_participante, $puntaje)) {
    echo json_encode(array('enviado' => TRUE));
} else {
    echo json_encode(array('enviado' => FALSE, 'DB' => FALSE));
}