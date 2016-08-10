<?php

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

$json = json_encode($lista);

print($json);
