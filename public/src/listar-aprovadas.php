<?php

header('Content-Type: application/json');

include('conexao.php');

//seleciona somente as descrições aprovadas
$sql = "SELECT descricao FROM descricoes WHERE aprovado = TRUE;";

$statement = $pdo->prepare($sql);
$statement->execute();

$lista = $statement->fetchAll(PDO::FETCH_NUM);

//transforma array de arrays em array de strings
foreach( $lista as &$item ) {
    $item = $item[0];
}
unset($item);

//prepara e retorna como json
$json = json_encode($lista);
echo $json;


