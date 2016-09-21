<?php

$inputData = json_decode($_POST["mensagens"], true);

include('conexao.php');

foreach ($inputData as $item) {

    $id        = $item["id"];
    $descricao = $item["descricao"];
    $aprovado  = $item["aprovado"];


    $sql = "UPDATE descricoes SET descricao = :descricao, moderado = true, aprovado = :aprovado WHERE id = :id; ";

    $statement = $pdo->prepare($sql);

    $statement->bindValue(':id', $id);
    $statement->bindValue(':descricao', $descricao);
    $statement->bindValue(':aprovado', $aprovado);

    $statement->execute();

}





