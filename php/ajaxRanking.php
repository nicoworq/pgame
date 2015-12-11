<?php

include_once './TokenCSRF.php';
include_once './Pascal.php';


header('Content-type: application/json');

$tk = new TokenCSRF();

$token = $_POST['code'];

if (!$tk->verifyFormToken('get-ranking', $token)) {
    echo json_encode(array('enviado' => TRUE, 'CRFF' => TRUE));
    die();
}


$pg = new Pascal();

echo json_encode($pg->getRanking());
