$(document).ready(function () {
    "use strict";

    var url = "/src/listar-aprovadas.php";

    var descricoesDoPublico = [];

    const SEGUNDO = 1000, MINUTO = 60000;
	var ANIM_SPEED = 600;


    // função recursiva para percorrer array com descrições repetidamente,
    function loopRepeat(arraysDescricoes) {

            var texto = arraysDescricoes.shift();
            $("#descricao").stop().animate({opacity: 0}, ANIM_SPEED, function() {
				$("#descricao").text(texto).stop().animate({opacity: 1}, ANIM_SPEED, function() {
                    speakText(texto, function () {
                        loopRepeat(fetchShuffledArrayIfEmpty(arraysDescricoes));
                    });
                });
			});
    }


    // função de síntese de voz.
    function speakText(texto, callback) {
        var intervalo = 2 * SEGUNDO;

        var synth = window.speechSynthesis;
        var textToSpeak = new SpeechSynthesisUtterance(texto);

        textToSpeak.volume = 1;
        textToSpeak.pitch = 1.2;
        textToSpeak.rate = 1.3;
        textToSpeak.lang = "pt-BR";

        synth.speak(textToSpeak);

        // ao final do texto, chama uma callback
        textToSpeak.onend = function () {

            synth.cancel();

            setTimeout(function () {
                callback();
            }, intervalo) // intervalo entre uma descrição e outra
        }
    }


    // função para verificar se a array está vazia.
    // recebe uma array recupera uma cópia da array de dados se estiver vazia
    // ou retorna uma cópia se não estiver
    function fetchShuffledArrayIfEmpty(array) {
        if (array.length === 0) {
            return shuffleArray(descricoesDoPublico.slice());
        } else {
           return array.slice();
        }
    }


    function shuffleArray(array) {
        var i, j, x;
        for (i = array.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = array[i - 1];
            array[i - 1] = array[j];
            array[j] = x;
        }
        return array;
    }



    // inicia o programa fazendo GET
    function iniciar() {
        $.get(url, function (data) {
            descricoesDoPublico = data;
            // inicia o loop
            loopRepeat(fetchShuffledArrayIfEmpty(descricoesDoPublico));
        });
    }

    iniciar();


    // timer para atualizar descricoes a cada 10 minutos
    var timer = setInterval(function () {
        $.get(url, function (data) {
            descricoesDoPublico = data;
        });
    }, 10 * MINUTO);


});
