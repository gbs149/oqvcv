'use strict';

var url = "/src/listar-a-moderar.php";

var $table = $('#table');

var ajaxOptions = {
  dataType: "json",
  url: url,
  success: preencherPagina
};


function preencherPagina(data) {
    for (let element of data) {
        console.log(element);
        $table.append(
            '<tr class="item-lista"> <td class="element-id">' + element.id + '</td> <td><textarea rows="4" cols="80">' + element.descricao + '</textarea> </td> <td> <input class="checkbox" type="checkbox" name="" value=""></td></tr>'
        );
    }
}

$('document').ready(function() {
    $.ajax(ajaxOptions);

});
