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
        grecaptcha.execute('6LdXmrsnAAAAAFiOD0zoXJ-owoUhc5xhSvQK_C_4', {
            action: 'contactUs'
        }).then(function (token) {
            $.ajax({
                url: 'api/v0/captcha',
                type: 'POST',
                data: {
                    site: 'donaldson_africa',
                    name: $('#contactName').val(),
                    email: $('#contactEmail').val(),
                    // contactNumber: $('#contactNumber').val(),
                    message: $('#message').val(),
                    // messageSubject: $('#messageSubject').val(),
                    'g-recaptcha-response': token
                },
                success: function (msg) {
                    $("#successmsg").html(
                        "<p>Thanks for your request! We will be in contact soon</p>"
                    )
                    gtag_report_conversion(window.location.href)
                }
            });
        });
    });
});