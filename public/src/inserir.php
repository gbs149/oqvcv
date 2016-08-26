<?php

// recebe as informações por POST e filtra os dados
$nome = htmlspecialchars($_POST["nome"]);
$email = htmlspecialchars($_POST["email"]);
$descricao = htmlspecialchars($_POST["descricao"]);

include('conexao.php');

// prepara o statement com os parâmetros e executa
$sql = "INSERT INTO descricoes (nome, email, descricao) VALUES (:nome, :email, :descricao) ;";

$statement = $pdo->prepare($sql);

$statement->bindValue(':nome', $nome);
$statement->bindValue(':email', $email);
$statement->bindValue(':descricao', $descricao);

// executa a gravação no db
$sucesso = $statement->execute();

// se a gravação for bem sucedida retorna "sucesso"
if ($sucesso)
echo "sucesso";


