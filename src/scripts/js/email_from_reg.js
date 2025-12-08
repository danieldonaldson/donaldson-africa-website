//
// year.js
// Theme module
//

'use strict';

(function () {

  // Variables
  // =========

  var userEmail = document.querySelectorAll('.user-email');

  // Methods
  // =======

  function appendEmail(elem) {
    //var date = new Date().getFullYear();
    var text = document.createTextNode(new URLSearchParams(window.location.search).get('userEmail'));
    if (text) {
      elem.appendChild(text);
    }

  }

  // Events
  // ======

  if (userEmail) {
    [].forEach.call(userEmail, function (elem) {
      appendEmail(elem);
    });
  }

})();