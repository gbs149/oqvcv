<?php

header('Content-Type: application/json');

include('conexao.php');

$sql = "SELECT * FROM descricoes WHERE moderado = FALSE;";

$statement = $pdo->prepare($sql);

$statement->execute();

$lista = $statement->fetchAll(PDO::FETCH_ASSOC);

$json = htmlspecialchars_decode(json_encode($lista));

echo $json;

