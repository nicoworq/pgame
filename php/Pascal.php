<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pascal
 *
 * @author Nico
 */
class Pascal {

    private function connect() {
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

        try {
            $dbh = new PDO("mysql:host={$hostname};dbname=pascal_game", $username, $password);

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // <== add this line
            //echo 'Connected to Database<br/>';

            return $dbh;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function insertParticipant($nombre, $email, $dni, $puntaje, $telefono, $tiempo, $coincidencias, $intentos) {

        $dbh = $this->connect();

        $stmt = $dbh->prepare("INSERT INTO participantes(nombre, email, dni,puntaje,telefono,tiempo,coincidencias,intentos) VALUES (:nombre, :email, :dni, :puntaje, :telefono, :tiempo, :coincidencias, :intentos)");

        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':dni', $dni, PDO::PARAM_STR);
        $stmt->bindParam(':puntaje', $puntaje, PDO::PARAM_INT);
        $stmt->bindParam(':telefono', $telefono, PDO::PARAM_STR);
        $stmt->bindParam(':tiempo', $tiempo, PDO::PARAM_INT);
        $stmt->bindParam(':coincidencias', $coincidencias, PDO::PARAM_INT);
        $stmt->bindParam(':intentos', $intentos, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

}