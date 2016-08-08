"use strict";

$("#enviar").on("click", enviar);


function enviar(event) {
    event.preventDefault();
    var $descricao = $("#descricao").val();
    //console.log($texto);

    $.post("inserir.php", {descricao: $descricao});



};
