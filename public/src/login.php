<?php
include "../../senha.php";

$senha = $_POST['senha'];

if (password_verify($senha, $hash)) {
    session_start();

    $_SESSION['logado'] = TRUE;

    header("Location: ../moderacao");
} else {
    header("Location: ../moderacao/login-form.php");

}




