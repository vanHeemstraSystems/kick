/*
 * ModelService
 */
define(['./Base'], function (Base) {
    console.log('CORE: modelService called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });    	
    var _ModelService = new Base(uuid);

    // following this example, slightly
    // http://sandbox.thewikies.com/javascript-mvc-hello-world/index.2.html

	// The world's simplest subscription
//    var channel = postal.channel("Name.Changed");
    // subscribe
//    var subscription = channel.subscribe(function(data) { $("#example1").html("Name: " + data.name); });
    // And someone publishes a first name change:
//    channel.publish({ name: "Dr. Who" });

	// A modelService constructor might have a function that creates new modelService instances
	_ModelService.find = function (id) {
		console.log('CORE: modelService find(id) called');
		// Data used to create a new modelService may come from anywhere
		// but in this case data comes from this inline object.
		var ourData = {
			'123': {
				yourProperty: 'You clicked.'
			},
			'456': {
				yourProperty: 'You pressed a key.'
			},
			'subscribe': {
				yourProperty: 'You suscribe.'
			}
		};
		// Get a new modelService instance containing our data.
		var modelService = new _ModelService(ourData[id]);
		// Return the modelService.
		return modelService;
	};
	// return the modelService instance
    return _ModelService;
});
