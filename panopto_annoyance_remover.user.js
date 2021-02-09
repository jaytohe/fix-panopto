// ==UserScript==
// @name         Panopto Annoyance Remover
// @namespace    http://github.com/jaytohe/
// @version      1.0
// @description  Prevent Panopto from hijacking keyboard presses. Space button now always controls the video.
// @author       jaytohe
// @match        https://uniofbath.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const Forbidden = new Array('quickRewindButton','quickFastForwardButton','volumeControl', 'captionsButton', 'playButton', 'playSpeedButton', 'qualityButton', 'captionStyleOptions');
    document.addEventListener("keydown", function(event) {
        event.stopImmediatePropagation();
        if (event.keyCode == 32) {
            document.getElementById('playButton').click(); //click playbtn.
        }
    }, false);
    function checkID(val) {
     if (typeof val !== 'undefined') {
         const thumb_regex = /thumbnail\d+thumbnailList/g;
         const event_regex = /^event\d+$/g;
        if ( Forbidden.includes(val)
            || thumb_regex.test(val)
            || event_regex.test(val)
           ) {
                 return true;
        }
     }
     return false;
    }
    if (EventTarget.prototype.original_addEventListener == null) {
        EventTarget.prototype.original_addEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener =function override_listener(typ, fn, opt) {
            if ( !checkID(this.id)
                || (checkID(this.id) && typ !== 'keydown')
               ) {
                    this.original_addEventListener(typ, fn, opt);
                 }
            }
        }
})();