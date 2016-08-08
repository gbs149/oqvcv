"use strict";

$("#enviar").on("click", enviar);


function enviar(event) {
    event.preventDefault();
    var $texto = $("#descricao").val();
    console.log($texto);
};
