/*
 * Lib
 */
define(['jquery'], function ($) {
	console.log('KICK: lib called');
    return {
        getBody: function () {
        	console.log('KICK: lib getBody called');       	
            return $('body');
        }
    }
});
