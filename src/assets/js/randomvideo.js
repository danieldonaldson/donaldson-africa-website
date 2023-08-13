//
// random.js
// Theme module
//

'use strict';

(function () {

    // Variables
    // =========

    var video = document.getElementById('bg-video');
    var source = document.getElementById('random-src');
    var vidNo = Math.floor(Math.random() * 6) + 1; 

    // Events 
    // =======
    if (video) {
        source.setAttribute('src', 'assets/video/' + vidNo + '.mp4');
    video.load();
    video.play();

    }
    

})();