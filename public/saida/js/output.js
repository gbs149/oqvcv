'use strict';

(function () {

    //const url = '/src/listar-aprovadas.php';
    //const ANIM_SPEED = 600;
    // const MINUTE = 60000;



    let publicDescriptions = ['um texto', 'dois elefantes', 'tres bananas'];

    const SECOND = 1000;

    const description = document.getElementById('descricao');

    loopAndRepeat(publicDescriptions, 0);

    function loopAndRepeat(arrayDescriptions, index) {
        if (index === arrayDescriptions.length) {
            // debugger;
            loopAndRepeat(shuffleArray(publicDescriptions), 0);
        } else {
            let text = arrayDescriptions[index];
            animate(arrayDescriptions, index, description, text);
        }
    }

    function animate(array, index, element, text) {
        element.addEventListener('transitionend', () => {
            element.addEventListener('transitionend', () => {
                console.log(index, text);
                speakText(text, () => {
                    loopAndRepeat(array, index + 1);
                });
            }, { once: true });
            updateAndFadeIn(element, text);
        }, { once: true });

        fadeOut(element);
    }

    function fadeIn(element) {
        element.classList.remove('hidden');
        element.classList.add('visible');
    }

    function fadeOut(element) {
        element.classList.remove('visible');
        element.classList.add('hidden');
    }

    function updateText(element, text) {
        element.textContent = text;
    }

    function updateAndFadeIn(element, text) {
        updateText(element, text);
        fadeIn(element);
    }


    function speakText(text, callback) {
        const interval = 2 * SECOND;

        const synth = window.speechSynthesis;
        let textToSpeak = new SpeechSynthesisUtterance(text);

        textToSpeak.volume = 1;
        textToSpeak.pitch = 1.2;
        textToSpeak.rate = 1.3;
        textToSpeak.lang = 'pt-BR';

        synth.speak(textToSpeak);

        textToSpeak.onend = () => {
            synth.cancel();
            setTimeout(() => {
                callback();
            }, interval);
        };
    }



    function shuffleArray(array) {
        let i, j;
        for (i = array.length; i; i--) {
            j = Math.floor(Math.random() * i);
            // swap values by destructuring
            [array[i - 1], array[j]] = [array[j], array[i - 1]];
        }
        return array;
    }



    // start app with data from GET
    /*(function start() {
        $.get(url, function (data) { // jq -> fetch
            publicDescriptions = data;
            loopAndRepeat(shuffleArray(publicDescriptions), 0);
        });
    })();



    // updates publicDescriptions on interval
    setInterval(function () {
        $.get(url, function (data) { // jq -> fetch
            publicDescriptions = data;
        });
    }, 10 * MINUTE);*/


})();
