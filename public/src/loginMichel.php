<?php
session_start();
include("connect.php"); // Linha desnecessária se tu usar a alternativa 2

// Nome da tabela onde estarão salvos usuário e senha
$tbl_name="users";  // Linha desnecessária se tu usar a alternativa 2

// Busca usuário e senha enviados por POST 
$username=$_POST['usuario']; 
$password=$_POST['senha'];

// Previne MySQL injection
$username = stripslashes($username);
$password = stripslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);


// AQUI EXISTEM DUAS ALTERNATIVAS. UMA NORMAL, COM USUÁRIOS CADASTRADOS OU UMA ÚNICA ALTERNATIVA DE USUÁRIO E SENHA
// ESCOLHE A QUE TU ACHAR MAIS CONVENIENTE. ACHO QUE PODE SER A ALTERNATIVA 2 MESMO, VISTO QUE SÓ TU VAI MODERAR
// PRA FAZER FUNCIONAR, DESCOMENTA TUDO QUE ESTÁ NA ALTERNATIVA QUE TU ESCOLHEU COM (AS LINHAS COMENTADAS COM #)

///******* INÍCIO ALTERNATIVA 1 *******
// busca no DB se existe esse match user/senha
// Assim podem existir vários usuários cadastrados, com senhas diferentes (claro)
#$sql="SELECT * FROM $tbl_name WHERE user='$username' and pass=PASSWORD('$password')";
#$result=mysql_query($sql);
#$count=mysql_num_rows($result);

// Se foi encontrado 1 usuário que combina com a senha fornecida, a contagem de linhas (rows) deve ser 1
#if($count==1){
///******* FIM ALTERNATIVA 1 *******

///******* INÍCIO ALTERNATIVA 2 *******
	
#if ($username == "user_pre_definido" && $password == "senha_pre_definida") {
	
///******* FIM ALTERNATIVA 2 *******
  // Código preestabelecido - pode ser qualquer coisa
	$_SESSION['code']="session_started_ok";
  	
	// Faz um redirect pra página onde tu vai fazer a moderação, efetivamente
	// preestabeleci a página de moderação como "moderar.php". Pode mudar o nome dela aqui
	header("location:moderar.php");
}
// Se o user e senha forem errados, já era
else {
  echo "Nome e/ou senha inv&aacute;lidos.";
  echo ("<br /><a href='index.php'>Voltar</a>");
  session_destroy();
}

?>