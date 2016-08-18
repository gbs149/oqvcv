"use strict";

// função recursiva para percorrer array com descrições repetidamente.
function loopRepeat(array) {

    // se array estiver vazia buscar dados por AJAX
    if (array.length === 0) {
        $.get("/src/listar-aprovadas.php", function (data) {
            loopRepeat(data);
        });
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

loopRepeat([]);


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


