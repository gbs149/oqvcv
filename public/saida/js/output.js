$(document).ready(function () {
    "use strict";

    var url = "/src/listar-aprovadas.php";

    var descricoesDoPublico = [];

    const SEGUNDO = 1000, MINUTO = 60000;
	var ANIM_SPEED = 600;


    // função recursiva para percorrer array com descrições repetidamente,
    // alternando entre descrições do público e descrições pré-definidas.
    function loopRepeat(arraysDescricoes) {

            var texto = arraysDescricoes.shift();
            //console.log(texto);
            $("#descricao").stop().animate({opacity: 0}, ANIM_SPEED, function() {
				$("#descricao").text(texto).stop().animate({opacity: 1}, ANIM_SPEED, function() {
                    speakText(texto, function () {
                        console.log(arraysDescricoes);
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


    /*var descricoesPreescritas = ["Dois casebres contíguos, cada um deles com dois pavimentos. Em cada pavimento há uma      porta e uma janela, configurando quatro residências. As paredes são azuis e as portas e janelas são amarelas. A     madeira parece apodrecida e a tinta está velha e desbotada. A sensação é de equilíbrio precário.",
        "Casebres de madeira empilhados, pintados de cores vivas e contrastantes. Uma moça de biquini grafitada numa das paredes e, no chão, a estatueta de um frade segurando no colo um menino nu. Arte sacra e profana convivendo num clima de miséria colorida. Um gato na janela, com sua felina empáfia, observa o observador.",
        "A parede da casa da esquerda, no andar de baixo, é a única verde e tem uma mulher estampada, bem grande, entre a janela e a porta. Ela está de biquíni tomara que caia. Tem pele clara e cabelos castanhos e compridos que se agitam com o vento.",
        "Na casa de cima, à esquerda, a porta e a janela são de madeira clara e desbotada. Sobre a janela há um telhadinho de zinco, torto e enferrujado. Na porta tem um visor retangular com três adesivos: o Sagrado Coração de Jesus, um pequeno mapa do Brasil e uma imagem de Nossa Senhora Aparecida.",
        "No chão, entre os casebres, há uma imagem de um santo com o Menino Jesus no colo. A imagem está deteriorada, com a pintura descascada, e o branco do gesso aparece em vários pontos."];*/
