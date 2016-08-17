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

//seleciona somente as descrições aprovadas
$sql = "SELECT descricao FROM descricoes WHERE aprovado = TRUE;";

$statement = $pdo->prepare($sql);
$statement->execute();

$lista = $statement->fetchAll(PDO::FETCH_NUM);

//transforma array de arrays em array de strings
foreach( $lista as &$item ) {
    $item = $item[0];
}

//prepara e retorna como json
$json = htmlspecialchars_decode(json_encode($lista));
echo $json;


