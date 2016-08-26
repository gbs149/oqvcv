<?php
	$con = mysql_connect("localhost","usuario_user","senha_pass");
	mysql_select_db("nome_do_banco_de_dados", $con) or die("cannot select DB");
?>