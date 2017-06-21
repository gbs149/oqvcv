(function () {
    'use strict';

    // entrar em tela cheia ao iniciar
    const enterFullScreenButton = document.getElementById('enter-fullscreen');
    enterFullScreenButton.addEventListener('click', enterFullScreen);



    const descriptionTextArea = document.getElementById('descricao');
    const remainingChars = document.getElementById('contador');
    const confirmationMessage = document.getElementById('confirmacao');
    const sendButton = document.getElementById('enviar');

    descriptionTextArea.addEventListener('input', updateCounter, false);
    sendButton.addEventListener('click', sendDescription);



    let descriptionsBuffer = [];

    setInterval(() => {
        if (descriptionsBuffer.length !== 0) {
            sendBuffer();
        }
    }, 2 * 10000); // = 2min

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

    function resetForm() {
        descriptionTextArea.value = '';
        descriptionTextArea.focus();
        remainingChars.textContent = 300;
    }

    function sendData(data) {

        const sendMessageOptions = {
            method: 'POST',
            body: JSON.stringify({ mensagens: wrapInArray(data) })
        };

        return fetch('../../src/inserir.php', sendMessageOptions);
    }

    function sendDescription(event) {
        event.preventDefault();
        const data = descriptionTextArea.value;
        if (data) {
            sendData(data)
                .then(response => response.json())
                .then(response => {
                    if (!response.success) {
                        descriptionsBuffer.push(data);
                    }
                })
                .catch(err => {
                    descriptionsBuffer.push(data);
                    console.error(err);
                });
            resetForm();
            showConfirmationMessage();
        }
    }

    function sendBuffer() {
        sendData(descriptionsBuffer)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    descriptionsBuffer = [];
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    function showConfirmationMessage() {
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.classList.add('visible');
        setTimeout(function () {
            confirmationMessage.classList.remove('visible');
            confirmationMessage.classList.add('hidden');
        }, 3000);

    }

    function updateCounter() {
        remainingChars.textContent = (300 - descriptionTextArea.value.length);
    }

    function wrapInArray(input) {
        if (!Array.isArray(input)) {
            return [input];
        }
        return input;
    }

})();
