$(document).ready(function () {
    "use strict";

    var url = "/src/listar-aprovadas.php";

    var descricoesDoPublico = [],
        descricoesPreescritas = ["número 1", "número 2", "número 3", "número 4"];

    const SEGUNDO = 1000, MINUTO = 60000;



    // função recursiva para percorrer array com descrições repetidamente,
    // alternando entre descrições do público e descrições pré-definidas.
    function loopRepeat(arraysDescricoes, contador) {
        // variável que define a cada quantas descrições alterna.
        var descricaoPreACada = 9;
        var descricoesPublico = arraysDescricoes[0],
            descricoesPre = arraysDescricoes[1];

        if (contador % descricaoPreACada !== 0) {

            contador++;

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = descricoesPublico.shift();
            console.log(texto);
            $("#descricao").text(texto);

            speakText(texto, function () {
                loopRepeat(getArrays(arraysDescricoes), contador);
            });

        } else {

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = descricoesPre.shift();
            console.log(texto);
            $("#descricao").text(texto);

            speakText(texto, function () {
                loopRepeat(getArrays(arraysDescricoes), 1);
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
        textToSpeak.rate = 1.4;
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


});
