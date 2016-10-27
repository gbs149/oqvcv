(function relatorio() {
    "use strict";

    var url = "/src/listar-aprovadas.php";

    var descricoesDoPublico = [];

    var SEGUNDO = 1000, MINUTO = 60000;
    var ANIM_SPEED = 600;

    var container = document.getElementById('container');

    // container.appendChild

    /*    function addElement() {

            var paragraph = document.createElement('p');
            var content = document.createTextNode(descricao);
            paragraph.appendChild(content);

            container.appendChild(paragraph);
            document.body.insertBefore(newDiv, currentDiv);
        }*/

    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.onreadystatechange = function readyStateChangeHandler() {
            if (this.readyState == 4 && this.status == 200)
                console.log(xhr.response);
                return xhr.response;
        }
        xhr.open('GET', url, true);
        xhr.send();
    }

    fetchData();














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
})();
