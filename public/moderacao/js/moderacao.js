(function app() {

    'use strict';

    var urlListarAModerar = "/src/listar-a-moderar.php",
        urlSalvarModeracao = "/src/moderar.php";

    var $table = $('#table');

    var ajaxOptionsListar = {
        dataType: "json",
        url: urlListarAModerar,
        success: preencherPagina
    };

    function preencherPagina(data) {
        for (let element of data) {
            // console.log(element);
            $table.append(
                '<tr class="item-lista"> <td class="element-id">' + element.id + '</td> <td class="text-area"><textarea rows="4" cols="80">' + element.descricao + '</textarea> </td> <td class="check-aprovado"> <input class="checkbox" type="checkbox" name="" value=""></td></tr>'
            );
        }
    }

    function salvar() {
        var data = [], dataJSON;

        var $lista = $('.item-lista');

        if ($lista.length > 0) {

            $lista.each(function () {
                var objectData = {};
                objectData.id = $(this).find('.element-id').text();
                objectData.descricao = $(this).find('textarea').val();
                objectData.moderado = true;
                if ($(this).find('input[type="checkbox"]').prop('checked')) {
                    objectData.aprovado = 1;
                } else {
                    objectData.aprovado = 0;
                }
                data.push(objectData);
            });

            dataJSON = JSON.stringify(data);

            var ajaxOptionsSalvar = {
                method: 'POST',
                data: { mensagens: dataJSON },
                url: urlSalvarModeracao,
                success: function () {
                    document.location.reload(true);
                }
            };

            $.post(ajaxOptionsSalvar);
        }
    }

    $('document').ready(function () {
        $.ajax(ajaxOptionsListar);

        $('#botao-salvar').on('click', salvar);

    });

})();
