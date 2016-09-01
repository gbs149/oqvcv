$(document).ready(function () {
    "use strict";

    var url = "http://192.168.33.10/src/listar-aprovadas.php";
    var descricoes = ["Primeira descrição", "Segunda descrição", "Terceira descrição", "Etcetera"];
    var sec = 1000, min = 60000;


    // função recursiva para percorrer array com descrições repetidamente.
    function loopRepeat(array) {

        // se array estiver vazia reiniciar função com array descrições
        if (array.length === 0) {
            loopRepeat(descricoes);
        } else {
            // copia array para dados para não apagar as descrições
            var dados = array.slice();

            // retira o primeiro string de dados e usa como texto para reprodução e parágrafo
            var texto = dados.shift();
            $("#descricao").text(texto);

            // função de síntese de voz.
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(texto);

            utterThis.pitch = 1.2;
            utterThis.rate = 1.2;
            synth.speak(utterThis);

            // ao final do texto, chama recursivamente a função com dados (que é array a partir do segundo elemento)
            utterThis.onend = function () {
                setTimeout(function () {
                    loopRepeat(dados);
                }, 2000) // intervalo entre uma descrição e outra
            };
        }
    }

    // PARA TESTE
    // inicia o programa com array descricoes
    loopRepeat(descricoes);



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

});
