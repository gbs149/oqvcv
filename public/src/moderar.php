<?php

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);
$aprovado = filter_input(INPUT_GET, "aprovado", FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

include('conexao.php');

$sql = "UPDATE descricoes SET moderado=true, aprovado= :aprovado WHERE id_descricoes= :id; ";

$statement = $pdo->prepare($sql);

$statement->bindValue(':id', $id);
$statement->bindValue(':aprovado', $aprovado);

$statement->execute();





