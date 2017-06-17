(function () {
    'use strict';

    const DESCRIPTIONS = [];

    const descricaoTextArea = document.getElementById('descricao');
    const remainingChars = document.getElementById('contador');
    const confirmationMessage = document.getElementById('confirmacao');

    descricaoTextArea.addEventListener('input', updateCounter, false);


    function updateCounter() {
        remainingChars.textContent = (300 - descricaoTextArea.value.length);
    }

    function enviarDescricoes(event) {
        event.preventDefault();

        ///////////////////////////////////////////////////////////////////
        const textoDescricao = descricaoTextArea.value;

        if (textoDescricao) {

            // RESET ////////////////////////////
            resetForm();
            showConfirmationMessage();

            ///////////////////////////////////////////////////////

            // faz o post da mensagem. Se falhar, guarda a descrição para mandar depois.
            var ajaxOptions = {
                method: 'POST',
                data: { mensagens: JSON.stringify([textoDescricao]) },
                url: '/src/inserir.php',
                timeout: 10000,
                success: function (returnData) {
                    if (returnData !== 'sucesso') {
                        DESCRIPTIONS.push(textoDescricao);
                        // debugger;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    DESCRIPTIONS.push(textoDescricao);
                    // debugger;
                }
            };

            $.ajax(ajaxOptions);
            // jq
            // debugger;
        }
    }

    function resetForm() {
        descricaoTextArea.value = '';
        descricaoTextArea.focus();
        remainingChars.textContent = 300;
    }

    function showConfirmationMessage() {
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.classList.add('visible');
        setTimeout(function () {
            confirmationMessage.classList.remove('visible');
            confirmationMessage.classList.add('hidden');
        }, 3000);

    }


    // seta o timer de envio das mensagens
    const TIMER = setInterval(function () {

        if (DESCRIPTIONS) {

            // var textMessages = JSON.stringify(DESCRIPTIONS);

            $.post('/src/inserir.php', {
                mensagens: JSON.stringify(DESCRIPTIONS)
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



    const sendButton = document.getElementById('enviar');
    sendButton.addEventListener('click', enviarDescricoes);

    // entrar em tela cheia ao iniciar
    const enterFullScreenButton = document.getElementById('enter-fullscreen');
    enterFullScreenButton.addEventListener('click', enterFullScreen);

    function enterFullScreen() {

        const fullScreenMessage = document.getElementById('fullscreen-msg');
        fullScreenMessage.classList.add('hidden');

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
