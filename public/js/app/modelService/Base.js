/*
 * ModelServiceBase
 */
define(function () {
    console.log('CORE: modelServiceBase called');
    function modelServiceBase(id) {
        this.id = id;
    	this.myProperty = {};  	
    };
    modelServiceBase.prototype = {
		setServiceBus: function (serviceBus) {
			console.log('CORE: modelServiceBase setServiceBus(serviceBus) called');		
			this.serviceBus = serviceBus;
			// The modelService instance has a property called "myProperty"
    		// created from the serviceBus's "yourProperty".
			this.myProperty = this.serviceBus.yourProperty;
		},
		setSubscriptions: function (subscriptions) {
			console.log('CORE: modelServiceBase setSubscriptions(subscriptions) called');
			this.subscriptions = subscriptions;
		},
		subscribe: function () {
			console.log('CORE: modelServiceBase subscribe() called');	
			// Subscribe to the serviceBus with channels and topics from subscriptions
            var subscriptionArray = new Array;			
			this.subscriptions.forEach( function (subscription) {
                var topicArray = new Array();				
				for (key in subscription) {
                    // One subscription has one channel					
					if(key == 'channel') {
						var channel = subscription[key];
						console.log('CORE: modelServiceBase channel:');
						console.log(channel);
					}
                    // One channel has one or more topics
                    if(key == 'topic') {
                        var topic = subscription[key];
                        console.log('CORE: modelServiceBase topic:');
                        console.log(topic);
                        topicArray.push(topic);
                    }
				}
                console.log('CORE: modelServiceBase topicArray:');
                console.log(topicArray);
                // Now we should have one channel and one or more topics
                for(topic in topicArray) {
                	var topic = topicArray[topic];
                	var callback = function(data, envelope){
                		// empty for now
                		console.log('CORE: modelServiceBase data received:');
                		console.log(data);
                		console.log('CORE: modelServiceBase envelope received:');
                		console.log(envelope);
                	}; 
           			// Subscribe to the channel+topic for each topic, 
           			// with callback for processing of received data         	
                	var options = { channel: channel, topic: topic, callback: callback};
                	console.log('CORE: modelServiceBase options:');
                	console.log(options);
                	var subscription = this.serviceBus.subscribe(options);
                    console.log('CORE: modelServiceBase subscription:');
                    console.log(subscription);
 					// NOTE: to unsubscribe
 					// subscription.unsubscribe();

                    // Add active subscriptions to subscription array
                    subscriptionArray.push(subscription);
                }			
			}, this); // provide 'this' as a second argument to have access to it
		}
    };   
    return modelServiceBase;
});
