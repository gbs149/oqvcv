<?php session_start(); ?>

<!doctype html>
<html class="no-js" lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>O que você vê</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">

</head>

<body>
    <div>
        <form method="GET" action="../src/sair.php">
            <button type="submit">sair</button>
        </form>
    </div>

<?php
    if ( $_SESSION['logado'] == TRUE ) {
?>
    <table id="table">
        <tr>
            <th>ID</th>
            <th>Texto</th>
            <th>Aprovar</th>
        </tr>

        <!--<tr class="item-lista">
            <td class="element-id">' + element.id + '</td>
            <td><textarea rows="4" cols="80">' + element.descricao + '</textarea> </td>
            <td> <input class="checkbox" type="checkbox" name="" value=""></td>
        </tr>-->

    </table>

    <button id="botao-salvar" type="submit">Salvar</button>

    <script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
    <script src="js/moderacao.js"></script>
<?php
    } else {
        header("Location: login-form.php");
    }
?>
</body>

</html>
