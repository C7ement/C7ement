$(document).ready(function() {
    $.ajax({
        url : "https://blockchain.info/rawblock/$block_hash",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        type : "GET",
        timeout:	"5000",
        async : false,

        success : function(data) {
            $('webService1').append(data.hash);
        },

        error : function(xhr, status, err) {
            $('webService1').append(err+" N/A");
        }
    });
});
