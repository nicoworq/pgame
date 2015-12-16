<?php

include_once '../../php/Pascal.php';

$pg = new Pascal();


$idParticipant = intval($_POST['idParticipante']);

/*

header('Content-type: application/json');

if ($pg->deleteParticipant($idParticipant)) {
    echo json_encode(array('eliminado' => TRUE));
} else {
    echo json_encode(array('eliminado' => FALSE));
}