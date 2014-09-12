/*
 * ViewEvent
 * An event is where something happening is captured.
 */
var ViewEvent123 = 1 << 0;
var ViewEvent456 = 1 << 1;
var ViewEventSubscribe = 1 << 2;

define(['./Base'], function (Base) {
    console.log('CORE: viewEvent called'); 
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });        
    var _ViewEvent = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    // A viewEvent constructor might have a function that raises an event
    _ViewEvent.raiseEvent = function (flag) {
        // Check if ViewEvent123 was passed.
        if (flag & ViewEvent123) {
            console.log('SKIN: viewEvent123 raised');             
            // Run the ViewController's show function.
            _ViewController.loadView(123);
        }
        // Check if ViewEvent456 was passed.
        if (flag & ViewEvent456) {
            console.log('SKIN: viewEvent456 raised');            
            // Run the ViewController's show function.
            _ViewController.loadView(456);
        }
        // Check if ViewEventSubscribe was passed.        
        if (flag & ViewEventSubscribe) {
            console.log('SKIN: viewEventSubscribe raised');        
            // Subscribe ViewService
            _ViewController.subscribeViewService('subscribe');
        }        
    };
    // return the viewEvent instance
    return _ViewEvent;
});
