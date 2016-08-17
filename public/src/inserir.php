<?php

// recebe as informações por POST e filtra os dados
$nome = htmlspecialchars($_POST["nome"]);
$email = htmlspecialchars($_POST["email"]);
$descricao = htmlspecialchars($_POST["descricao"]);

// conecta com o db usando as credenciais do arquivo settings.php
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


