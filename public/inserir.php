<?php
session_start();

$descricao = htmlentities($_POST['descricao'], ENT_QUOTES, 'UTF-8');

try {
    include('../settings.php');
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


$sql = "INSERT INTO descricoes (descricao) VALUES (:descricao) ";

$statement = $pdo->prepare($sql);

$statement->bindValue(':descricao', $descricao);

$statement->execute();

print "success";


