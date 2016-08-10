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

$sql = "SELECT descricao FROM descricoes WHERE aprovado = TRUE;";

$statement = $pdo->prepare($sql);

$statement->execute();

$lista = $statement->fetchAll(PDO::FETCH_NUM);

$json = json_encode($lista);

print($json);


