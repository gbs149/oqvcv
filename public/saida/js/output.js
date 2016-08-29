$(document).ready(function () {
    "use strict";

    var url = "http://192.168.33.10/src/listar-aprovadas.php";
    var descricoes = [];

    // função recursiva para percorrer array com descrições repetidamente.
    function loopRepeat(array) {
        // se array estiver vazia buscar array com descrições
        if (array.length === 0) {
            loopRepeat(descricoes.slice());
        } else {
            var texto = array.shift();
            $("#descricao").text(texto);

            responsiveVoice.speak(texto, "Brazilian Portuguese Female",
                {
                    onend: function () {
                        setTimeout(function () {
                            loopRepeat(array);
                        }, 1000);
                    }
                });
        }
    }

    // inicia o programa buscando dados e
    $.get(url, function (data) {
        descricoes = data;
        // inicia o loop com uma cópia de descrições. Mantém a array descricoes para ser reutilizada.
        loopRepeat(descricoes.slice());
    });


    // timer para atualizar descricoes a cada 10 minutos
    setTimeout(function () {
        $.get(url, function (data) {
            descricoes = data;
        });
    }, 10 * 60000);

});


/*

teste com 10.000 caracteres.
tempo: 13'20" - 800s.
caracteres por segundo: 12.5

Responsive Voice
voz:"Brazilian Portuguese Female"
pitch: 1
rate: 1

PROBLEMA: no Chrome, usa corta o texto em partes menores (100 caracteres), cortando as frases.

*/


