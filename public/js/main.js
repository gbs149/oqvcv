"use strict";

// click no botão envia a descrição
$("#enviar").on("click", enviar);


//
function enviar(event) {
    event.preventDefault();

    var $nome = $("#nome").val(),
        $email = $("#email").val(),
        $descricao = $("#descricao").val();

    if (!!$descricao && !!$nome && !!$email) {
        $.post("/src/inserir.php", {
            nome: $nome,
            email: $email,
            descricao: $descricao
        });

        $("#nome").val("");
        $("#email").val("");
        $("#descricao").val("");
    }
};
