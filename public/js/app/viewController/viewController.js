/*
 * ViewController
 */
define(['./Base'], function (Base) {
	console.log('KICK: viewController called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });	
    var _ViewController = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    return _ViewController;
});
