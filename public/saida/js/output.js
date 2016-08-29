$(document).ready(function () {
    "use strict";

    var url = "http://192.168.33.10/src/listar-aprovadas.php";
    var descricoes = [];

    // função recursiva para percorrer array com descrições repetidamente.
    function loopRepeat(array) {

        // se array estiver vazia reiniciar função com array descrições
        if (array.length === 0) {
            loopRepeat(descricoes);
        } else {
            // copia array para dados
            var dados = array.slice();

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = dados.shift();
            $("#descricao").text(texto);

            responsiveVoice.speak(texto, "Brazilian Portuguese Female",
                {
                    // ao fim da reprodução, chama recursivamente a função
                    onend: function () {
                        setTimeout(function () {
                            loopRepeat(dados);
                        }, 1000);
                    }
                });
        }
    }

    // inicia o programa buscando dados
    $.get(url, function (data) {
        descricoes = data;
        // inicia o loop com uma cópia de descrições. Mantém a array descricoes para ser reutilizada.
        loopRepeat(descricoes);
    });


    // timer para atualizar descricoes a cada 20 minutos
    var timer = setInterval(function () {
        $.get(url, function (data) {
            descricoes = data;
        });
    }, 5 * 1000);

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


