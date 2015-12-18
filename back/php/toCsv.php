<?php

include_once '../../php/Pascal.php';

$pg = new Pascal();

$ranking = $pg->getRankingCSV();

header('Content-Type: application/csv');
header('Content-Disposition: attachment; filename="pascalNavidad.csv";');


$f = fopen('php://output', 'w');

fputcsv($f, array("ID","Nombre","Email","Telefono","Dni"), ',');

foreach ($ranking as $line) {
    fputcsv($f, $line, ',');
}
