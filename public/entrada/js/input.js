$(document).ready(function () {
    "use strict";

    var MENSAGENS = [
        // uma array de strings com as descrições
        // agora só estamos recebendo as descrições.
    ];
    var $descricao = $("#descricao"),
        $contador = $("#contador"),
        $confirmacao = $("#confirmacao");

    function enviar(event) {
        event.preventDefault();

        if ($descricao.val()) {

            // Adiciona os dados e mensagem ao array de mensagens (que vai ser enviado a cada 30 minutos)
            MENSAGENS.push($descricao.val());

            // limpa os campos do formulário
            $descricao.val("");
            $descricao.focus();

            // reseta o contador
            $contador.text(300);

            // por enquanto deixamos assim, mas seria mais legal uma mensagem bonitinha na tela que ficasse por uns 5 segundos e desaparecesse
            // alert("Sua mensagem foi adicionada. \nObrigado!");
            $confirmacao.fadeIn(300, function() {
                setTimeout(function() {
                    $confirmacao.fadeOut(400);
                }, 4000);
            });
        }
    };

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
    }, 10 * 60000); // = 10min



    // click no botão envia a descrição
    $("#enviar").on("click", enviar);

    // contador de caracteres restantes
    $descricao.keyup(function() {
        $contador.text(300 - $descricao.val().length);
    });


});
