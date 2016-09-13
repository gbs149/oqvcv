$(document).ready(function () {
    "use strict";

    var url = "/src/listar-aprovadas.php";

    var descricoesDoPublico = [],
        descricoesPreescritas = ["Dois casebres contíguos, cada um deles com dois pavimentos. Em cada pavimento há uma porta e uma janela, configurando quatro residências. As paredes são azuis e as portas e janelas são amarelas. A madeira parece apodrecida e a tinta está velha e desbotada. A sensação é de equilíbrio precário.",
        "Casebres de madeira empilhados, pintados de cores vivas e contrastantes. Uma moça de biquini grafitada numa das paredes e, no chão, a estatueta de um frade segurando no colo um menino nu. Arte sacra e profana convivendo num clima de miséria colorida. Um gato na janela, com sua felina empáfia, observa o observador.",
        "A parede da casa da esquerda, no andar de baixo, é a única verde e tem uma mulher estampada, bem grande, entre a janela e a porta. Ela está de biquíni tomara que caia. Tem pele clara e cabelos castanhos e compridos que se agitam com o vento.",
        "Na casa de cima, à esquerda, a porta e a janela são de madeira clara e desbotada. Sobre a janela há um telhadinho de zinco, torto e enferrujado. Na porta tem um visor retangular com três adesivos: o Sagrado Coração de Jesus, um pequeno mapa do Brasil e uma imagem de Nossa Senhora Aparecida.",
        "No chão, entre os casebres, há uma imagem de um santo com o Menino Jesus no colo. A imagem está deteriorada, com a pintura descascada, e o branco do gesso aparece em vários pontos."];

    const SEGUNDO = 1000, MINUTO = 60000;
	var ANIM_SPEED = 600;



    // função recursiva para percorrer array com descrições repetidamente,
    // alternando entre descrições do público e descrições pré-definidas.
    function loopRepeat(arraysDescricoes, contador) {
        // variável que define a cada quantas descrições alterna.
        var descricaoPreACada = 5;
        var descricoesPublico = arraysDescricoes[0],
            descricoesPre = arraysDescricoes[1];

        if (contador % descricaoPreACada !== 0) {

            contador++;

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = descricoesPublico.shift();
            console.log(texto);
            $("#descricao").stop().animate({opacity: 0}, ANIM_SPEED, function() {
				$("#descricao").text(texto).stop().animate({opacity: 1}, ANIM_SPEED, function() {
                    speakText(texto, function () {
                        loopRepeat(getArrays(arraysDescricoes), contador);
                    });
                });
			});


        } else {

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = descricoesPre.shift();
            console.log(texto);
            $("#descricao").stop().animate({opacity: 0}, ANIM_SPEED, function() {
				$("#descricao").text(texto).stop().animate({opacity: 1}, ANIM_SPEED, function() {
                    speakText(texto, function () {
                        loopRepeat(getArrays(arraysDescricoes), 1);
                    });
                });
            });


        }

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


    // função para verificar se as arrays estão vazias.
    // recebe uma array com duas arrays, recupera cópias das arrays de dados se estiverem vazias
    // ou retorna cópias se não estiverem
    function getArrays(array) {
        var newArray1, newArray2;
        if (array[0].length === 0 && array[1].length === 0) {
            newArray1 = shuffleArray(descricoesDoPublico.slice());
            newArray2 = shuffleArray(descricoesPreescritas.slice());
        } else if (array[0].length === 0 && array[1].length > 0) {
            newArray1 = shuffleArray(descricoesDoPublico.slice());
            newArray2 = array[1].slice();
        } else if (array[0].length > 0 && array[1].length === 0) {
            newArray1 = array[0].slice();
            newArray2 = shuffleArray(descricoesPreescritas.slice());
        } else if (array[0].length > 0 && array[1].length > 0) {
            newArray1 = array[0].slice();
            newArray2 = array[1].slice();
        }
        return [newArray1, newArray2];
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


    // PARA TESTE
    // inicia o programa com descricoes
    // loopRepeat(getArrays([descricoesPreescritas, descricoesPreescritas]), 1);




    // inicia o programa fazendo GET
    function iniciar() {
        $.get(url, function (data) {
            descricoesDoPublico = shuffleArray(data);
            // inicia o loop
            loopRepeat(getArrays([descricoesDoPublico, descricoesPreescritas]), 1);
        });
    }

    iniciar();


    // timer para atualizar descricoes a cada 20 minutos
    var timer = setInterval(function () {
        $.get(url, function (data) {
            descricoesDoPublico = shuffleArray(data);
        });
    }, 20 * MINUTO);

	/*// desabilita click com botão direito

	window.onmousedown = function disableclick(event) {

		if(event.button == 2) {
			return false;
		}
	};*/

});
