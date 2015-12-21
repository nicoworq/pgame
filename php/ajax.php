<?php


if(!isset( $_POST['data'])){
    die();
}

include_once './TokenCSRF.php';
include_once './Pascal.php';


$tk = new TokenCSRF();

header('Content-type: application/json');


$encodingCode = $tk->getToken('encoding-code');

if (!$encodingCode) {
    echo json_encode(array('enviado' => TRUE, 'CRFF' => TRUE));
}


//btoa(btoa(code + btoa(data)))

$data = $_POST['data'];

$data1 = base64_decode($data);

$data2 = base64_decode( $data1);



$dataString = base64_decode(str_replace($encodingCode, '', $data2));


parse_str($dataString);



//Descarto por ser un bot!
if (isset($sex) && $sex !== '') {
    echo json_encode(array('enviado' => TRUE, 'trucho' => TRUE));
    die();
}

//Descarto por ser un bot!
if (!isset($email) && $email === '' || !isset($name) && $name  === '') {
    echo json_encode(array('enviado' => TRUE, 'trucho' => TRUE));
    die();
}


if (!$tk->verifyFormToken('send-score', $code)) {
    echo json_encode(array('enviado' => TRUE, 'CRFF' => TRUE));
    die();
}







$puntaje = intval($score);
$tiempo = intval($time);
$coincidencias = intval($matches);
$intentos = intval($tries);

$pascal = new Pascal();

$insertedID = $pascal->insertParticipant($name, $email, $dni, $puntaje, $phone, $tiempo, $coincidencias, $intentos);

if ($insertedID[0]) {

    if ($pascal->sendEmail($email)) {
        echo json_encode(array('enviado' => TRUE, 'idParticipante' => $insertedID[1]));
    } else {
        echo json_encode(array('enviado' => FALSE, 'MAILFAIL' => TRUE));
    }
} elseif ($insertedID[1] === 'existente') {
    echo json_encode(array('enviado' => FALSE, 'existente' => TRUE));
} else {
    echo json_encode(array('enviado' => FALSE, 'DBFAIL' => TRUE));
}
