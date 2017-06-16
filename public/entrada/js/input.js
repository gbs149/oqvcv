(function () {
    'use strict';

    var DESCRIPTIONS = [];

    const descricaoTextArea = document.getElementById('descricao');
    const remainingChars = document.getElementById('contador');
    const confirmationMessage = document.getElementById('confirmacao');

    descricaoTextArea.addEventListener('input', updateCounter, false);


    var $confirmacao = $('#confirmacao'); //jq


    function updateCounter() {
        remainingChars.textContent = (300 - descricaoTextArea.value.length);
    }

    function enviarDescricoes(event) {
        event.preventDefault();

        ///////////////////////////////////////////////////////////////////
        const textoDescricao = descricaoTextArea.value;

        var umaDescricao = [];

        if (textoDescricao) {

            umaDescricao.push(textoDescricao); // concat

            var textMessages = JSON.stringify(umaDescricao);


            // RESET ////////////////////////////
            resetForm();
            /////////////////////////////////////


            ////////////////////////////////////////////////////////
            // aciona mensagem de confirmação
            $confirmacao.fadeIn(300, function () {
                setTimeout(function () {
                    $confirmacao.fadeOut(400);
                }, 3000);
            }); // jq
            ///////////////////////////////////////////////////////




            /////////////////////////////////////////////////////////////

            // faz o post da mensagem. Se falhar, guarda a descrição para mandar depois.
            var ajaxOptions = {
                method: 'POST',
                data: { mensagens: textMessages },
                url: '/src/inserir.php',
                timeout: 10000,
                success: function (returnData) {
                    if (returnData !== 'sucesso') {
                        DESCRIPTIONS.push(textoDescricao);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    DESCRIPTIONS.push(textoDescricao);
                }
            };

            $.ajax(ajaxOptions);
            // jq

            /////////////////////////////////////////////////////
        }
    }

    function resetForm() {
        descricaoTextArea.value = '';
        descricaoTextArea.focus();
        remainingChars.textContent = 300;
    }


    // seta o timer de envio das mensagens
    var TIMER = setInterval(function () {

        if (DESCRIPTIONS) {

            var textMessages = JSON.stringify(DESCRIPTIONS);


            // faz o post das mensagens
            $.post('/src/inserir.php', {
                mensagens: textMessages
            },
                // se sucesso, limpa a variável global MENSAGENS   ***********************
                //***********************************************
                // senão deixa por isso mesmo e ela , automaticamente, será reenviada (tentativa de) após 30 minutos
                function (data) {
                    if (data === 'sucesso') {
                        DESCRIPTIONS = [];
                    }
                }); // jq
        }
    }, 2 * 60000); // = 2min


    // click no botão envia a descrição
    $('#enviar').on('click', enviarDescricoes); // jq


    // entrar em tela cheia ao iniciar
    $('#enter-fullscreen').on('click', enterFullScreen); // jq


    function enterFullScreen() {

        $('#fullscreen-msg').addClass('hidden'); // jq

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


})();
