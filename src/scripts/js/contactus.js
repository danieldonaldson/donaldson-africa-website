//
// contactus.js
// Theme module
//

'use strict';

(function() {
    const form = document.getElementById('messageUs');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (typeof grecaptcha === 'undefined' || !grecaptcha.enterprise) {
            console.error('reCAPTCHA enterprise not loaded');
            return;
        }

        grecaptcha.enterprise.ready(async function() {
            try {
                // Get reCAPTCHA token
                const token = await grecaptcha.enterprise.execute('6Lc2sfMZAAAAANHrN90an-E6_cDU65TQ6Pb6RR3Y', {
                    action: 'contactUs'
                });

                // Prepare form data as URL-encoded
                const formData = new URLSearchParams();
                formData.append('site', 'donaldson_africa');
                formData.append('name', document.getElementById('contactName').value);
                formData.append('email', document.getElementById('contactEmail').value);
                formData.append('message', document.getElementById('message').value);
                formData.append('g-recaptcha-response', token);

                // Submit form
                const response = await fetch('https://captcha.stead.africa/captcha', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString()
                });

                if (response.ok) {
                    const successMsg = document.getElementById('successmsg');
                    if (successMsg) {
                        successMsg.innerHTML = '<p>Thanks for your request! We will be in contact soon</p>';
                    }

                    // Track conversion
                    if (typeof gtag_report_conversion === 'function') {
                        gtag_report_conversion(window.location.href);
                    }

                    // Clear form
                    form.reset();
                } else {
                    console.error('Form submission failed:', response.status, response.statusText);
                    const errorData = await response.text();
                    console.error('Error details:', errorData);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    });
})();