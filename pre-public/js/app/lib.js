/*
 * Lib
 */
define(['jquery'], function ($) {
	console.log('CORE: lib called');
    return {
        getBody: function () {
        	console.log('CORE: lib getBody called');
            return $('body');
        }
    }
});
