'use strict';

(function () {

    let publicDescriptions = [];

    const URL = '/src/listar-aprovadas.php';
    const SECOND = 1000;
    const MINUTE = 60000;
    const INTERVAL = 2 * SECOND;

    const $description = document.getElementById('descricao');

    // start app with data from GET

    fetch(URL, { method: 'get' }).then((response) => {
        return response.json();
    }).then((data) => {
        publicDescriptions = data;
        mainLoop(shuffleArray(publicDescriptions), 0);
    });
    // mainLoop(publicDescriptions, 0);


    // updates publicDescriptions on interval
    setInterval(() => {
        fetch(URL, { method: 'get' })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                publicDescriptions = data;
            }) ;
    }, 1 * MINUTE);

    function mainLoop(arrayDescriptions, index) {
        if (index === arrayDescriptions.length) {
            // debugger;
            mainLoop(shuffleArray(publicDescriptions), 0);
        } else {
            let text = arrayDescriptions[index];
            animateAndPlay(arrayDescriptions, index, $description, text);
        }
    }

    function animateAndPlay(array, index, element, text) {
        element.addEventListener('transitionend', () => {
            element.addEventListener('transitionend', () => {
                speakText(text, () => {
                    mainLoop(array, index + 1);
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
            }, INTERVAL);
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

})();
