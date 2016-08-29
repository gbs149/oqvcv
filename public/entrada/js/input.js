$(document).ready(function () {
    "use strict";

    var MENSAGENS = [
        // uma array de strings com as descrições
        // agora só estamos recebendo as descrições.
    ];


    function enviar(event) {
        event.preventDefault();

        // Adiciona os dados e mensagem ao array de mensagens (que vai ser enviado a cada 30 minutos)
        MENSAGENS.push($("#descricao").val());

        // limpa os campos do formulário
        $("#descricao").val("");

        // por enquanto deixamos assim, mas seria mais legal uma mensagem bonitinha na tela que ficasse por uns 5 segundos e desaparecesse
        alert("Sua mensagem foi adicionada. \nObrigado!");
    };

    // click no botão envia a descrição
    $("#enviar").on("click", enviar);

    // seta o timer de envio das mensagens
    var TIMER = setInterval(function () {

        // transforma o objeto json em string para o envio
        var textMessages = JSON.stringify(MENSAGENS);
        console.log(textMessages);

        // faz o post das mensagens
        $.post("/src/inserir.php", {
            mensagens: textMessages
        },
            // se sucesso, limpa a variável global MENSAGENS
            // senão deixa por isso mesmo e ela , automaticamente, será reenviada (tentativa de) após 30 minutos
            function (data) {
                if (data === "sucesso") {
                    MENSAGENS = [];
                }
            });
    }, 30 * 60000); // = 30min

});
