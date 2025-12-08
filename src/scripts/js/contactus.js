//
// random.js
// Theme module
//

'use strict';

$("#messageUs").submit(function (e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(function () {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha.enterprise.execute('6Lc2sfMZAAAAANHrN90an-E6_cDU65TQ6Pb6RR3Y', {
            action: 'contactUs'
        }).then(function (token) {
            $.ajax({
                url: 'https://captcha.stead.africa/captcha',
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