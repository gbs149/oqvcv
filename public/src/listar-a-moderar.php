<?php

header('Content-Type: application/json');

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

$sql = "SELECT * FROM descricoes WHERE moderado = FALSE;";

$statement = $pdo->prepare($sql);

$statement->execute();

$lista = $statement->fetchAll(PDO::FETCH_ASSOC);

$json = htmlspecialchars_decode(json_encode($lista));

echo $json;

