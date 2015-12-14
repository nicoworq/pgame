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

        include_once './connection.php';

        try {
            $dbh = new PDO("mysql:host={$hostname};dbname={$dbName}", $username, $password);

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
            return $dbh->lastInsertId();
        } else {
            return false;
        }
    }

    public function participantShared($id, $score) {
        
        $score = intval($score) + 50;
        
        $dbh = $this->connect();

        $stmt = $dbh->prepare("UPDATE participantes SET compartio = 1 , puntaje=:score WHERE id = :id ;");

        $stmt->bindParam(':score', $score, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function getRanking() {

        $dbh = $this->connect();
        $sql = 'SET @rownumber = 0;';
        $stmt = $dbh->prepare($sql);
        $stmt->execute();

        $sql = 'SELECT * , @rownumber:= @rownumber+ 1 as "pos" FROM pascal_game.participantes order by puntaje desc , tiempo desc ;';
        //$sql = 'SELECT * , count(*) FROM pascal_game.participantes order by puntaje desc , tiempo asc ;';

        $rows = array();
        try {
            $stmt = $dbh->prepare($sql);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $ex) {
            echo $ex->getMessage();
            echo $ex->getLine();
        }


        return $rows;
    }

}
