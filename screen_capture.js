$(document).ready(function(){
    // dialog for screen capture
    $(function() {

        var subject = $( "#subject" ),
            email = $( "#email"),
            body = $("#body");

        $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 350,
            width: 400,
            modal: true,
            buttons: {
                "Send": {
                    text: "Send",
                    class: 'sendmailbtn',
                    click: function(){
                        canvg();
                        pageScreenShot(subject.val(),email.val(),body.val());
                        $( this ).dialog( "close" );
                    }
                },
                "Cancel":{
                    text:'Cancel',
                    class: 'cancelbtn',
                    click: function() {
                        $( this ).dialog( "close" );
                    }

                } 
            },            
            close: function() {
            }
        });

        $( "#create-user" )
            .click(function() {
                $( "#dialog-form" ).dialog( "open" );
            });
    });
})

// converting base64 to blob to form object
function dataURLtoBlob(dataURL) {
    // base64 dataURL decode
    var decode_data = atob(dataURL.split(',')[1]);
    // unsigned array to capture decode_data
    var array = [];
    for(var i = 0; i < decode_data.length; i++) {
        array.push(decode_data.charCodeAt(i));
    }
    // Return a Blob to be used as form data
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
};

// taking screenshot of the view
function pageScreenShot(subject,email,body){
    canvg();
    var root_url = $("#rootUrl").val();
    var myImage;
    html2canvas( [ document.body ], {
        onrendered: function(canvas) {
            canvg();
            myImage = canvas.toDataURL("image/png");
            var file= dataURLtoBlob(myImage);
            var fd = new FormData();
            fd.append("image", file);
            fd.append("subject",subject)
            fd.append("emailto",email)
            fd.append("body",body)

            $.ajax({
                url: root_url + '',
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Something went wrong!! Please try again later.");
                }
            });

        }
    });
};