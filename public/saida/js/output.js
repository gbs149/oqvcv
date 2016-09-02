$(document).ready(function () {
    "use strict";

    var url = "http://192.168.33.10/src/listar-aprovadas.php";

    var descricoes = ["1", "2", "3", "4", "5", "6", "7", "8"],
        descricoesPre = ["a", "b", "c", "d"];

    var sec = 1000, min = 60000;



    // função recursiva para percorrer array com descrições repetidamente,
    // alternando entre descrições do público e descrições pré-definidas.
    function loopRepeat(dadosArray, contador) {
        // variável que define a cada quantas descrições alterna.
        var alt = 9;

        if (contador % alt !== 0) {

            contador++;

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = dadosArray[0].shift();
            console.log(texto);
            $("#descricao").text(texto);

            speakText(texto, function() {
                loopRepeat(getArrays(dadosArray), contador);
            });

        } else {

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = dadosArray[1].shift();
            console.log(texto);
            $("#descricao").text(texto);

            speakText(texto, function() {
                loopRepeat(getArrays(dadosArray), 1);
            });

        }

    }


    // função de síntese de voz.
    function speakText(texto, callback) {
        var intervalo = 2000;

        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(texto);

        utterThis.pitch = 1.2;
        utterThis.rate = 1.4;
        utterThis.lang = "pt-BR";

        synth.speak(utterThis);

        // ao final do texto, chama uma callback
        utterThis.onend = function () {
            setTimeout(function () {
                callback();
            }, intervalo) // intervalo entre uma descrição e outra
        }
    }


    // função para verificar se as arrays estão vazias.
    // recebe uma array com duas arrays, recupera cópias das arrays de dados se estiverem vazias
    // ou retorna cópias se não estiverem
    function getArrays (array) {
        var newArray1, newArray2;
        if (array[0].length === 0 && array[1].length === 0) {
            newArray1 = descricoes.slice();
            newArray2 = descricoesPre.slice();
        } else if (array[0].length === 0 && array[1].length > 0) {
            newArray1 = descricoes.slice();
            newArray2 = array[1].slice();
        } else if (array[0].length > 0 && array[1].length === 0) {
            newArray1 = array[0].slice();
            newArray2 = descricoesPre.slice();
        } else if (array[0].length > 0 && array[1].length > 0) {
            newArray1 = array[0].slice();
            newArray2 = array[1].slice();
        }
        return [newArray1, newArray2];
    }



    // PARA TESTE
    // inicia o programa com descricoes
    loopRepeat(getArrays([descricoes, descricoesPre]), 1);



/*
    // inicia o programa fazendo GET
    $.get(url, function (data) {
        descricoes = data;
        // inicia o loop
        loopRepeat(descricoes);
    });



    // timer para atualizar descricoes a cada 20 minutos
    var timer = setInterval(function () {
        $.get(url, function (data) {
            descricoes = data;
        });
    }, 20 * min);
*/
});
