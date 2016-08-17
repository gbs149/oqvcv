"use strict";

// click no botão envia a descrição
$("#enviar").on("click", enviar);


//
function enviar(event) {
    event.preventDefault();

    // recebe os valores do formulário
    var $nome = $("#nome").val(),
        $email = $("#email").val(),
        $descricao = $("#descricao").val();

    // se os dados forem preenchidos, enviar por POST
    if (!!$descricao && !!$nome && !!$email) {
        $.post("/src/inserir.php", {
            nome: $nome,
            email: $email,
            descricao: $descricao
        },
        // se sucesso, limpa o formulário e exibe confirmação
        // senão exibe alerta e mantém o formulário preenchido
        function(data) {
            if (data === "sucesso") {
                $("#nome").val("");
                $("#email").val("");
                $("#descricao").val("");
                alert("Seus dados foram enviados. \nObrigado!")
            } else
                alert("Erro de conexão. \nTente novamente.")

        }, "text");

    }
};



