<?php

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);
$aprovado = filter_input(INPUT_GET, "aprovado", FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

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

$sql = "UPDATE descricoes SET moderado=true, aprovado= :aprovado WHERE id_descricoes= :id; ";

$statement = $pdo->prepare($sql);

$statement->bindValue(':id', $id);
$statement->bindValue(':aprovado', $aprovado);

$statement->execute();





