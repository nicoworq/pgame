<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TokenCSRF
 *
 * @author Nico
 */
class TokenCSRF {

    protected $salt = 'WORQ1987';

    public function __construct() {

        if (session_id() == '') {
            session_start();
        }
    }

    public function generateFormToken($form) {

        // generar token de forma aleatoria
        $token = md5(uniqid(microtime(), true));

        // generar fecha de generación del token
        $token_time = time();

        // escribir la información del token en sesión para poder
        // comprobar su validez cuando se reciba un token desde un formulario
        $_SESSION['csrf'][$form . '_token'] = array('token' => $token, 'time' => $token_time);


        return $token;
    }

    public function getToken($form) {
        if (!isset($_SESSION['csrf'][$form . '_token'])) {
            return false;
        }
        return $_SESSION['csrf'][$form . '_token'];
    }

    public function verifyFormToken($form, $token, $delta_time = 0) {

        // comprueba si hay un token registrado en sesión para el formulario
        if (!isset($_SESSION['csrf'][$form . '_token'])) {
            return false;
        }

        // compara el token recibido con el registrado en sesión
        if ($_SESSION['csrf'][$form . '_token']['token'] !== $token) {
            return false;
        }

        // si se indica un tiempo máximo de validez del ticket se compara la
        // fecha actual con la de generación del ticket
        if ($delta_time > 0) {
            $token_age = time() - $_SESSION['csrf'][$form . '_token']['time'];
            if ($token_age >= $delta_time) {
                return false;
            }
        }

        return true;
    }

}
