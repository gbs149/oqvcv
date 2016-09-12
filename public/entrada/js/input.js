$(document).ready(function () {
    "use strict";

    var MENSAGENS = [
        // uma array de strings com as descrições
        // agora só estamos recebendo as descrições.
    ];

    var $descricao = $("#descricao"),
        $contador = $("#contador"),
        $confirmacao = $("#confirmacao");

    function enviarDescricoes(event) {
        event.preventDefault();

        // pega o texto do formulário
        var textoDescricao = $descricao.val();
        var umaDescricao = [];

        if (textoDescricao) {

            umaDescricao.push(textoDescricao);

            // transforma o objeto json em string para o envio
            var textMessages = JSON.stringify(umaDescricao);
            console.log(textMessages);

            // limpa os campos do formulário
            $descricao.val("");
            $descricao.focus();

            // reseta o contador
            $contador.text(300);

            // aciona mensagem de confirmação
            $confirmacao.fadeIn(300, function () {
                setTimeout(function () {
                    $confirmacao.fadeOut(400);
                }, 3000);
            });

            // faz o post da mensagem. Se falhar, guarda a descrição para mandar depois.
            $.post("/src/inserir.php", {
                mensagens: textMessages
            },
                function (data) {
                    if (data !== "sucesso") {
                        MENSAGENS.push(textoDescricao);
                    }
                });
        }
    }

    // seta o timer de envio das mensagens
    var TIMER = setInterval(function () {

        if (MENSAGENS) {


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
        }
    }, 2 * 60000); // = 2min



    // click no botão envia a descrição
    $("#enviar").on("click", enviarDescricoes);

    // contador de caracteres restantes
    $descricao.keyup(function () {
        $contador.text(300 - $descricao.val().length);
    });


    // entrar em tela cheia ao iniciar
    $("#enter-fullscreen").on("click", enterFullScreen);

    function enterFullScreen() {
        $("#fullscreen-msg").addClass("hidden");

        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }


});
