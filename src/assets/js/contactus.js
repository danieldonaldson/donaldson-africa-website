//
// random.js
// Theme module
//

'use strict';

$("#messageUs").submit(function (e) {
    e.preventDefault();
    grecaptcha.ready(function () {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha.execute('6Lc2sfMZAAAAANHrN90an-E6_cDU65TQ6Pb6RR3Y', {
            action: 'contactUs'
        }).then(function (token) {
            // add token to form
            $('#messageUs').prepend(
                '<input type="hidden" name="g-recaptcha-response" value="' + token +
                '">');
            $.ajax({
                url: './modules/sendinfo',
                type: 'POST',
                data: {
                    contactName: $('#contactName').val(),
                    contactEmail: $('#contactEmail').val(),
                    // contactNumber: $('#contactNumber').val(),
                    message: $('#message').val(),
                    // messageSubject: $('#messageSubject').val(),
                    gtoken: token
                },
                success: function (msg) {
                    $("#successmsg").html(
                        "<p>Thanks for your request! We will be in contact soon</p>"
                    );
                }
            });
        });
    });
});