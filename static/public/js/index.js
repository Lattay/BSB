/* eslint-env jquery */
function format(text, data){
    for(var key in data){
        if(text.includes('%' + key)){
            var re = new RegExp('%' + key, 'g');
            text = text.replace(re, data[key]);
        }
    }
    return text;
}

/* eslint-disable no-unused-vars */
function showDoc(name){

}
/* eslint-enable no-unused-vars */

const document_html = '\
<div class="col-sm-4" onclick="showDoc(%id);">\
    <img src="%thumbnail">aperçu de %title</img>\
    <h3>%title</h3>\
</div>';

function buildDocList(){
    var row = $('#main_row');
    $.getJSON('/document', function(data){
        for(var key in data){
            var doc = data[key];
            row.append($(format(document_html, doc)));
        }
    });
}

buildDocList();
