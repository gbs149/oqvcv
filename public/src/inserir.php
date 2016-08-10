<?php

$nome = filter_input(INPUT_POST, "nome", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$descricao = filter_input(INPUT_POST, "descricao", FILTER_SANITIZE_FULL_SPECIAL_CHARS);


try {
    include('../../settings.php');
    $pdo = new PDO(
        sprintf(
            'mysql:host=%s;dbname=%s;port=%s;charset=%s',
            $settings['host'],
            $settings['name'],
            $settings['port'],
            $settings['charset']
        ),
        $settings['username'],
        $settings['password']
    );
} catch (PDOException $e) {
    // Database connection failed
    print "Database connection failed";
    exit;
}


$sql = "INSERT INTO descricoes (nome, email, descricao) VALUES (:nome, :email, :descricao) ;";

$statement = $pdo->prepare($sql);

$statement->bindValue(':nome', $nome);
$statement->bindValue(':email', $email);
$statement->bindValue(':descricao', $descricao);

$statement->execute();

print "success";


