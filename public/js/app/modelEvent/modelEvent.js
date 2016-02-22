/*
 * ModelEvent
 * An event is where something happening is captured.
 */
var ModelEvent123 = 1 << 0;
var ModelEvent456 = 1 << 1;
var ModelEventSubscribe = 1 << 2;

define(['./Base'], function (Base) {
    console.log('CORE: modelEvent called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });    
    var _ModelEvent = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

    // A modelEvent constructor might have a function that raises an event
	_ModelEvent.raiseEvent = function (flag) {
        // Check if ModelEvent123 was passed.
        if (flag & ModelEvent123) {
            console.log('CORE: ModelEvent modelEvent123 raised');            
            // Run the ModelController's show function.
            _ModelController.loadModel(123);
        }
        // Check if ModelEvent456 was passed.
        if (flag & ModelEvent456) {
            console.log('CORE: ModelEvent modelEvent456 raised');             
            // Run the ModelController's show function.
            _ModelController.loadModel(456);
        }
        // Check if ModelEventSubscribe was passed
        if (flag & ModelEventSubscribe) {
            console.log('CORE: ModelEvent modelEventSubscribe raised');          
            // Subscribe ModelService
            _ModelController.subscribeModelService();
        } 
    };
    // return the modelEvent instance
    return _ModelEvent;
});