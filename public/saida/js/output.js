"use strict";

$(document).ready(function () {

    const url = "/src/listar-aprovadas.php";

    let publicDescriptions = [];

    const SECOND = 1000, MINUTE = 60000;
    const ANIM_SPEED = 600;



    function loopAndRepeat(arraysDescricoes, index) {
        if (index === arraysDescricoes.length - 1) {
            loopAndRepeat(shuffleArray(publicDescriptions), 0);
        } else {
            let texto = arraysDescricoes[index];
            $("#descricao").stop().animate({ opacity: 0 }, ANIM_SPEED, function () {
                $("#descricao").text(texto).stop().animate({ opacity: 1 }, ANIM_SPEED, function () {
                    speakText(texto, function () {
                        loopAndRepeat(arraysDescricoes, index + 1);
                    });
                });
            });
        }
    }



    function speakText(text, callback) {
        const interval = 2 * SECOND;

        const synth = window.speechSynthesis;
        let textToSpeak = new SpeechSynthesisUtterance(text);

        textToSpeak.volume = 1;
        textToSpeak.pitch = 1.2;
        textToSpeak.rate = 1.3;
        textToSpeak.lang = "pt-BR";

        synth.speak(textToSpeak);

        textToSpeak.onend = function () {
            synth.cancel();
            setTimeout(function () {
                callback();
            }, interval) 
        }
    }



    function shuffleArray(array) {
        let i, j;
        for (i = array.length; i; i--) {
            j = Math.floor(Math.random() * i);
            // swap values by destructuring
            [ array[i - 1], array[j] ] = [ array[j], array[i - 1] ];
        }
        return array;
    }



    // start app with data from GET
    (function start() {
        $.get(url, function (data) {
            publicDescriptions = data;
            // inicia o loop
            loopAndRepeat(shuffleArray(publicDescriptions), 0);
        });
    })();



    // updates publicDescriptions on interval
    setInterval(function () {
        $.get(url, function (data) {
            publicDescriptions = data;
        });
    }, 10 * MINUTE);


});
