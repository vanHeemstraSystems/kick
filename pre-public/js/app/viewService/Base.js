/*
 * ViewServiceBase
 */
define(function () {
    console.log('KICK: viewServiceBase called');
    function viewServiceBase(id) {
        this.id = id;
        this.title = 'viewService default title';
        this.myProperty = {};
    };
    viewServiceBase.prototype = {
        setServiceBus: function (serviceBus) {
            console.log('KICK: viewServiceBase setServiceBus(serviceBus) called');
            this.serviceBus = serviceBus;
            // The viewService instance has a property called "myProperty"
            // created from the serviceBus's "yourProperty".
            this.myProperty = this.serviceBus.yourProperty;
        },
        setSubscriptions: function (subscriptions){
            console.log('KICK: viewServiceBase setSubscriptions(subscriptions) called');
            this.subscriptions = subscriptions;
        },
        subscribe: function () {
            console.log('KICK: viewServiceBase subscribe() called');
            // Subscribe to the serviceBus with channels and topics from subscriptions
            var subscriptionArray = new Array;
            this.subscriptions.forEach( function (subscription) {
                var topicArray = new Array();
                for (key in subscription) {
                    // One subscription has one channel
                    if(key == 'channel') {
                        var channel = subscription[key];
                        console.log('KICK: viewServiceBase channel:');
                        console.log(channel);
                    }
                    // One channel has one or more topics
                    if(key == 'topic') {
                        var topic = subscription[key];
                        console.log('KICK: viewServiceBase topic:');
                        console.log(topic);
                        topicArray.push(topic);
                    }
                }
                console.log('KICK: viewServiceBase topicArray:');
                console.log(topicArray);
                // Now we should have one channel and one or more topics
                for(topic in topicArray) {
                    var topic = topicArray[topic];
                    var callback = function(data, envelope){
                        // empty for now
                        console.log('KICK: viewServiceBase data received:');
                        console.log(data);
                        console.log('KICK: viewServiceBase envelope received:');
                        console.log(envelope);
                    };
                    // Subscribe to the channel+topic for each topic,
                    // with callback for processing of received data
                    var options = { channel: channel, topic: topic, callback: callback};
                    console.log('KICK: viewServiceBase options:');
                    console.log(options);
                    var subscription = this.serviceBus.subscribe(options);
                    console.log('KICK: viewServiceBase subscription:');
                    console.log(subscription);
                    // NOTE: to unsubscribe
                    // subscription.unsubscribe();

                    // Add active subscriptions to subscription array
                    subscriptionArray.push(subscription);
                }
            }, this); // provide 'this' as a second argument to have access to it
        },
        getTitle: function () {
            console.log('KICK: viewServiceBase getTitle() called');
            return this.title;
        },
        setTitle: function (title) {
            console.log('KICK: viewServiceBase setTitle(title) called');
            this.title = title;
        }
    };
    return viewServiceBase;
});
