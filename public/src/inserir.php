<?php

// recebe as mesnagens por POST
$descricoes = json_decode($_POST["mensagens"]);
$sucesso;

// sanitiza as strings na array $descricoes
foreach ($descricoes as &$item) {
    $item = htmlspecialchars($item);
}
unset($item);

// conecta e insere as descrições no db
include('conexao.php');
foreach($descricoes as $desc) {

    // prepara o statement com os parâmetros e executa
    $sql = "INSERT INTO descricoes (descricao) VALUES (:descricao) ;";

    $statement = $pdo->prepare($sql);
    $statement->bindValue(':descricao', $desc);

    // executa a gravação no db
    $sucesso = $statement->execute();

    // para em caso de falha
    if(!$sucesso){
        break;
    }
}
unset($item);

// se a gravação for bem sucedida retorna "sucesso"
if ($sucesso){
    echo "sucesso";
}


