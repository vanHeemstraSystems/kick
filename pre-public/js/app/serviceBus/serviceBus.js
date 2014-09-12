/*
 * ServiceBus
 * See also https://github.com/postaljs/postal.js/wiki/API
 */
define(['./Base'], function (Base) {
    console.log('CORE: serviceBus called');
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = (d + Math.random()*16)%16 | 0;
    	d = Math.floor(d/16);
    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    var _ServiceBus = new Base(uuid);
    var prevServiceBus = global.serviceBus;
    /*
     * Conduit
	 */
	function Conduit(options) { 
		console.log('CORE: ServiceBus Conduit(options) called');
		if (typeof options.target !== "function") {
            throw new Error("You can only make functions into Conduits.");
        }
        var _steps = {
            pre: options.pre || [],
            post: options.post || [],
            all: []
        };
        var _defaultContext = options.context;
        var _target = options.target;
        var _targetStep = {
            isTarget: true,
            fn: options.sync ?
            function () {
                var args = Array.prototype.slice.call(arguments, 0);
                var result = _target.apply(_defaultContext, args);
                return result;
            } : function (next) {
                var args = Array.prototype.slice.call(arguments, 1);
                args.splice(1, 1, _target.apply(_defaultContext, args));
                next.apply(this, args);
            }
        };
        var _genPipeline = function () {
            _steps.all = _steps.pre.concat([_targetStep].concat(_steps.post));
        };
        _genPipeline();
		var conduit = function () {
            var idx = 0;
            var retval;
            var phase;
            var next = function next() {
                var args = Array.prototype.slice.call(arguments, 0);
                var thisIdx = idx;
                var step;
                var nextArgs;
                idx += 1;
                if (thisIdx < _steps.all.length) {
                    step = _steps.all[thisIdx];
                    phase = (phase === "target") ? "after" : (step.isTarget) ? "target" : "before";
                    if (options.sync) {
                        if (phase === "before") {
                            nextArgs = step.fn.apply(step.context || _defaultContext, args);
                            next.apply(this, nextArgs || args);
                        } else {
                            retval = step.fn.apply(step.context || _defaultContext, args) || retval;
                            next.apply(this, [retval].concat(args));
                        }
                    } else {
                        step.fn.apply(step.context || _defaultContext, [next].concat(args));
                    }
                }
            };
            next.apply(this, arguments);
            return retval;
		};
        conduit.steps = function () {
            return _steps.all;
        };
        conduit.context = function (ctx) {
            if (arguments.length === 0) {
                return _defaultContext;
            } else {
                _defaultContext = ctx;
            }
        };
        conduit.before = function (step, options) {
            step = typeof step === "function" ? {
                fn: step
            } : step;
            options = options || {};
            if (options.prepend) {
                _steps.pre.unshift(step);
            } else {
                _steps.pre.push(step);
            }
            _genPipeline();
        };
        conduit.after = function (step, options) {
            step = typeof step === "function" ? {
                fn: step
            } : step;
            options = options || {};
            if (options.prepend) {
                _steps.post.unshift(step);
            } else {
                _steps.post.push(step);
            }
            _genPipeline();
        };
        conduit.clear = function () {
            _steps = {
                pre: [],
                post: [],
                all: []
            };
            _genPipeline();
        };
        conduit.target = function (fn) {
            if (fn) {
                _target = fn;
            }
            return _target;
        };
		return conduit;
    };// eof Conduit
	Conduit.Sync = function (options) {
    	console.log('CORE: ServiceBus Conduit.Sync(options) called');
        options.sync = true;
        return Conduit.call(this, options)
    };
	Conduit.Async = function (options) {
    	console.log('CORE: ServiceBus Conduit.Async(options) called');
        return Conduit.call(this, options);
    };
    /*
     * Channel
     */
    var ChannelDefinition = function (channelName) {
        console.log('CORE: ServiceBus ChannelDefinition(channelName) called');  
        this.channel = channelName || _ServiceBus.configuration.DEFAULT_CHANNEL;
        this.initialize();
    };   
    ChannelDefinition.prototype.initialize = function () {
        console.log('CORE: ServiceBus ChannelDefinition.prototype.initialize() called');
        var oldPub = this.publish;
        this.publish = new Conduit.Async({
            target: oldPub,
            context: this
        });
    };    
    ChannelDefinition.prototype.subscribe = function () {
        console.log('CORE: ServiceBus ChannelDefinition.prototype.subscribe() called');
        return _ServiceBus.subscribe({
            channel: this.channel,
            topic: (arguments.length === 1 ? arguments[0].topic : arguments[0]),
            callback: (arguments.length === 1 ? arguments[0].callback : arguments[1])
        });
    };    
    ChannelDefinition.prototype.publish = function () {
        console.log('CORE: ServiceBus ChannelDefinition.prototype.publish() called');
        var envelope = arguments.length === 1 ? (Object.prototype.toString.call(arguments[0]) === "[object String]" ? {
            topic: arguments[0]
        } : arguments[0]) : {
            topic: arguments[0],
            data: arguments[1]
        };
        envelope.channel = this.channel;
        _ServiceBus.publish(envelope);
    };
    /*
     * Subscription
     */
    var SubscriptionDefinition = function (channel, topic, callback) {
        console.log('CORE: ServiceBus SubscriptionDefinition(channel, topic, callback) called');
        if (arguments.length !== 3) {
            throw new Error("You must provide a channel, topic and callback when creating a SubscriptionDefinition instance.");
        }
        if (topic.length === 0) {
            throw new Error("Topics cannot be empty");
        }
        this.channel = channel;
        this.topic = topic;
        this.subscribe(callback);
    };    
    SubscriptionDefinition.prototype = {
        after: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition after() called');
            this.callback.after.apply(this, arguments);
            return this;
        },
        before: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition before() called');
            this.callback.before.apply(this, arguments);
            return this;
        },
        "catch": function (errorHandler) {
            console.log('CORE: ServiceBus SubscriptionDefinition "catch"(errorHandler) called');
            var original = this.callback.target();
            var safeTarget = function () {
                try {
                    original.apply(this, arguments);
                } catch (err) {
                    errorHandler(err, arguments[0]);
                }
            };
            this.callback.target(safeTarget);
            return this;
        },
        defer: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition defer() called');
            this.callback.before(strats.defer());
            return this;
        },
        disposeAfter: function (maxCalls) {
            console.log('CORE: ServiceBus SubscriptionDefinition disposeAfter(maxCalls) called');
            var self = this;
            self.callback.before(strats.stopAfter(maxCalls, function () {
                self.unsubscribe.call(self);
            }));
            return self;
        },
        distinctUntilChanged: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition distinctUntilChanged() called');
            this.callback.before(strats.distinct());
            return this;
        },
        distinct: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition distinct() called');
            this.callback.before(strats.distinct({
                all: true
            }));
            return this;
        },
        logError: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition logError() called');
            if (console) {
                var report;
                if (console.warn) {
                    report = console.warn;
                } else {
                    report = console.log;
                }
                this["catch"](report);
            }
            return this;
        },
        once: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition once() called');
            this.disposeAfter(1);
            return this;
        },
        subscribe: function (callback) {
            console.log('CORE: ServiceBus SubscriptionDefinition subscribe(callback) called');
            this.callback = new Conduit.Async({
                target: callback,
                context: this
            });
            return this;
        },
        unsubscribe: function () {
            console.log('CORE: ServiceBus SubscriptionDefinition unsubscribe() called');
            if (!this.inactive) {
                this.inactive = true;
                _ServiceBus.unsubscribe(this);
            }
        },
        withConstraint: function (predicate) {
            console.log('CORE: ServiceBus SubscriptionDefinition withConstraint(predicate) called');
            this.callback.before(strats.withConstraint(predicate));
            return this;
        },
        withConstraints: function (preds) {
            console.log('CORE: ServiceBus SubscriptionDefinition withConstraints(preds) called');
            while (preds.length) {
                this.callback.before(strats.withConstraint(preds.shift()));
            }
            return this;
        },
        withDebounce: function (milliseconds, immediate) {
            console.log('CORE: ServiceBus SubscriptionDefinition withDebounce(milliseconds, immediate) called');
            this.callback.before(strats.withDebounce(milliseconds, immediate));
            return this;
        },
        withDelay: function (milliseconds) {
            console.log('CORE: ServiceBus SubscriptionDefinition withDelay(milliseconds) called');
            this.callback.before(strats.withDelay(milliseconds));
            return this;
        },
        withThrottle: function (milliseconds) {
            console.log('CORE: ServiceBus SubscriptionDefinition withThrottle(milliseconds) called');
            this.callback.before(strats.withThrottle(milliseconds));
            return this;
        },
        withContext: function (context) {
            console.log('CORE: ServiceBus SubscriptionDefinition withContext(context) called');
            this.callback.context(context);
            return this;
        }
    };
    /*
     * Predicates
     */
    var ConsecutiveDistinctPredicate = function () {
        console.log('CORE: ServiceBus ConsecutiveDistinctPredicate() called');
        var previous;
        return function (data) {
            var eq = false;
            if (_.isString(data)) {
                eq = data === previous;
                previous = data;
            } else {
                eq = _.isEqual(data, previous);
                previous = _.clone(data);
            }
            return !eq;
        };
    };
    var DistinctPredicate = function () {
        console.log('CORE: ServiceBus DistinctPredicate() called');
        var previous = [];
        return function (data) {
            var isDistinct = !_.any(previous, function (p) {
                if (_.isObject(data) || _.isArray(data)) {
                    return _.isEqual(data, p);
                }
                return data === p;
            });
            if (isDistinct) {
                previous.push(data);
            }
            return isDistinct;
        };
    };
    /*
     * Strats
     */
    var strats = {
        withDelay: function (ms) {
            console.log('CORE: ServiceBus strats withDelay(ms) called');
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "withDelay",
                fn: function (next, data, envelope) {
                    setTimeout(function () {
                        next(data, envelope);
                    }, ms);
                }
            };
        },
        defer: function () {
            console.log('CORE: ServiceBus strats defer() called');
            return this.withDelay(0);
        },
        stopAfter: function (maxCalls, callback) {
            console.log('CORE: ServiceBus strats stopAfter(maxCalls, callback) called');
            if (_.isNaN(maxCalls) || maxCalls <= 0) {
                throw "The value provided to disposeAfter (maxCalls) must be a number greater than zero.";
            }
            var dispose = _.after(maxCalls, callback);
            return {
                name: "stopAfter",
                fn: function (next, data, envelope) {
                    dispose();
                    next(data, envelope);
                }
            };
        },
        withThrottle: function (ms) {
            console.log('CORE: ServiceBus strats withThrottle(ms) called');
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "withThrottle",
                fn: _.throttle(function (next, data, envelope) {
                    next(data, envelope);
                }, ms)
            };
        },
        withDebounce: function (ms, immediate) {
            console.log('CORE: ServiceBus strats withDebounce(ms, immediate) called');
            if (_.isNaN(ms)) {
                throw "Milliseconds must be a number";
            }
            return {
                name: "debounce",
                fn: _.debounce(function (next, data, envelope) {
                    next(data, envelope);
                }, ms, !! immediate)
            };
        },
        withConstraint: function (pred) {
            console.log('CORE: ServiceBus strats withConstraint(pred) called');
            if (!_.isFunction(pred)) {
                throw "Predicate constraint must be a function";
            }
            return {
                name: "withConstraint",
                fn: function (next, data, envelope) {
                    if (pred.call(this, data, envelope)) {
                        next.call(this, data, envelope);
                    }
                }
            };
        },
        distinct: function (options) {
            console.log('CORE: ServiceBus strats distinct(options) called');
            options = options || {};
            var accessor = function (args) {
                return args[0];
            };
            var check = options.all ? new DistinctPredicate(accessor) : new ConsecutiveDistinctPredicate(accessor);
            return {
                name: "distinct",
                fn: function (next, data, envelope) {
                    if (check(data)) {
                        next(data, envelope);
                    }
                }
            };
        }
    };
    /*
     * Variables
     */
    var bindingsResolver = {
        cache: {},
        regex: {},
        compare: function (binding, topic) {
            console.log('CORE: ServiceBus bindingsResolver compare(binding, topic) called');
            var pattern, rgx, prevSegment, result = (this.cache[topic] && this.cache[topic][binding]);
            if (typeof result !== "undefined") {
                return result;
            }
            if (!(rgx = this.regex[binding])) {
                pattern = "^" + _.map(binding.split("."), function (segment) {
                    var res = "";
                    if ( !! prevSegment) {
                        res = prevSegment !== "#" ? "\\.\\b" : "\\b";
                    }
                    if (segment === "#") {
                        res += "[\\s\\S]*";
                    } else if (segment === "*") {
                        res += "[^.]+";
                    } else {
                        res += segment;
                    }
                    prevSegment = segment;
                    return res;
                }).join("") + "$";
                rgx = this.regex[binding] = new RegExp(pattern);
            }
            this.cache[topic] = this.cache[topic] || {};
            this.cache[topic][binding] = result = rgx.test(topic);
            return result;
        },
        reset: function () {
            console.log('CORE: ServiceBus bindingsResolver reset() called');
            this.cache = {};
            this.regex = {};
        }
    };//oef bindingsResolver
    /*
     * Functions
     */
    var fireSub = function (subDef, envelope) {
        console.log('CORE: ServiceBus fireSub(subDef, envelope) called');         
        if (!subDef.inactive && _ServiceBus.configuration.resolver.compare(subDef.topic, envelope.topic)) {
            subDef.callback(envelope.data, envelope);
        }
    };
    var pubInProgress = 0;
    var unSubQueue = [];
    function clearUnSubQueue() {
        console.log('CORE: ServiceBus clearUnSubQueue() called');         
        while (unSubQueue.length) {
            _ServiceBus.unsubscribe(unSubQueue.shift());
        }
    };
    function getSystemMessage(kind, subDef) {
        console.log('CORE: ServiceBus getSystemMessage(kind, subDef) called');        
        return {
            channel: _ServiceBus.configuration.SYSTEM_CHANNEL,
            topic: "subscription." + kind,
            data: {
                event: "subscription." + kind,
                channel: subDef.channel,
                topic: subDef.topic
            }
        };
    };
    function getPredicate(options) {
        console.log('CORE: ServiceBus getPredicate(options) called');        
        if (typeof options === "function") {
            return options;
        } else if (!options) {
            return function () {
                return true;
            };
        } else {
            return function (sub) {
                var compared = 0,
                    matched = 0;
                _.each(options, function (val, prop) {
                    compared += 1;
                    if (
                    // We use the bindings resolver to compare the options.topic to subDef.topic
                    (prop === "topic" && _ServiceBus.configuration.resolver.compare(sub.topic, options.topic))
                    // We need to account for the context possibly being available on callback due to Conduit
                    || (prop === "context" && options.context === (sub.callback.context && sub.callback.context() || sub.context))
                    // Any other potential prop/value matching outside topic & context...
                    || (sub[prop] === options[prop])) {
                        matched += 1;
                    }
                });
                return compared === matched;
            };
        }
    };
    function subscribe(options) {
    	console.log('CORE: ServiceBus subscribe(options) called');
        var subDef = new SubscriptionDefinition(options.channel || this.configuration.DEFAULT_CHANNEL, options.topic, options.callback);
        var channel = this.subscriptions[subDef.channel];
        var subs;
        if (!channel) {
            channel = this.subscriptions[subDef.channel] = {};
        }
        subs = this.subscriptions[subDef.channel][subDef.topic];
        if (!subs) {
            subs = this.subscriptions[subDef.channel][subDef.topic] = [];
        }
        subs.push(subDef);
        return subDef;
    };
    function publish(envelope) {
        console.log('CORE: ServiceBus publish(envelope) called');        
        ++pubInProgress;
        envelope.channel = envelope.channel || this.configuration.DEFAULT_CHANNEL;
        envelope.timeStamp = new Date();
        _.each(this.wireTaps, function (tap) {
            tap(envelope.data, envelope);
        });
        if (this.subscriptions[envelope.channel]) {
            _.each(this.subscriptions[envelope.channel], function (subscribers) {
                var idx = 0,
                    len = subscribers.length,
                    subDef;
                while (idx < len) {
                    if (subDef = subscribers[idx++]) {
                        fireSub(subDef, envelope);
                    }
                }
            });
        }
        if (--pubInProgress === 0) {
            clearUnSubQueue();
        }
    };
    function unsubscribe() {
        console.log('CORE: ServiceBus unsubscribe() called');        
        var idx = 0;
        var subs = Array.prototype.slice.call(arguments, 0);
        var subDef;
        while (subDef = subs.shift()) {
            if (pubInProgress) {
                unSubQueue.push(subDef);
                return;
            }
            if (this.subscriptions[subDef.channel] && this.subscriptions[subDef.channel][subDef.topic]) {
                var len = this.subscriptions[subDef.channel][subDef.topic].length;
                idx = 0;
                while (idx < len) {
                    if (this.subscriptions[subDef.channel][subDef.topic][idx] === subDef) {
                        this.subscriptions[subDef.channel][subDef.topic].splice(idx, 1);
                        break;
                    }
                    idx += 1;
                }
            }
            _ServiceBus.publish(getSystemMessage("removed", subDef));
        }
    };
    /*
     * ServiceBus Properties
     */
    _ServiceBus.configuration = {
        resolver: this.bindingsResolver,
        DEFAULT_CHANNEL: "/",
        SYSTEM_CHANNEL: "serviceBus"
    };
    _ServiceBus.subscriptions = {};
    _ServiceBus.wireTaps = [];
    _ServiceBus.ChannelDefinition = ChannelDefinition;
    _ServiceBus.SubscriptionDefinition = SubscriptionDefinition;
    _ServiceBus.subscribe = new Conduit.Sync({
        target: subscribe,
        context: _ServiceBus
    });
    _ServiceBus.publish = Conduit.Async({
        target: publish,
        context: _ServiceBus
    });
    _ServiceBus.unsubscribe = new Conduit.Sync({
        target: unsubscribe,
        context: _ServiceBus
    });
    _ServiceBus.subscribe.after(function (subDef /*, options */ ) {
        _ServiceBus.publish(getSystemMessage("created", subDef));
    });
    _ServiceBus.subscriptions[_ServiceBus.configuration.SYSTEM_CHANNEL] = {};
    /*
     * ServiceBus Functions
     */
    _ServiceBus.channel = function (channelName) {
        console.log('CORE: ServiceBus _ServiceBus.channel(channelName) called');        
        return new ChannelDefinition(channelName);
    };
    _ServiceBus.addWireTap = function (callback) {
        console.log('CORE: ServiceBus _ServiceBus.addWireTap(callback) called');        
        var self = this;
        self.wireTaps.push(callback);
        return function () {
            var idx = self.wireTaps.indexOf(callback);
            if (idx !== -1) {
                self.wireTaps.splice(idx, 1);
            }
        };
    };
    _ServiceBus.noConflict = function () {
        console.log('CORE: ServiceBus _ServiceBus.noConflict() called');
        if (typeof window === "undefined" || (typeof window !== "undefined" && typeof define === "function" && define.amd)) {
            throw new Error("noConflict can only be used in browser clients which aren't using AMD modules");
        }
        global.serviceBus = prevServiceBus;
        return this;
    };
    _ServiceBus.getSubscribersFor = function (options) {
        console.log('CORE: ServiceBus _ServiceBus.getSubscribersFor(options) called');        
        var result = [];
        _.each(this.subscriptions, function (channel) {
            _.each(channel, function (subList) {
                result = result.concat(_.filter(subList, getPredicate(options)));
            });
        });
        return result;
    };
    _ServiceBus.reset = function () {
        console.log('CORE: ServiceBus _ServiceBus.reset() called');        
        this.unsubscribeFor();
        this.configuration.resolver.reset();
        this.subscriptions = {};
    };
    _ServiceBus.unsubscribeFor = function (options) {
        console.log('CORE: ServiceBus _ServiceBus.unsubscribeFor(options) called');        
        var toDispose = [];
        if (this.subscriptions) {
            toDispose = this.getSubscribersFor(options);
            this.unsubscribe.apply(this, toDispose);
        }
    };
    _ServiceBus.linkChannels = function (sources, destinations) {
        var result = [],
            self = this;
        sources = !_.isArray(sources) ? [sources] : sources;
        destinations = !_.isArray(destinations) ? [destinations] : destinations;
        _.each(sources, function (source) {
            var sourceTopic = source.topic || "#";
            _.each(destinations, function (destination) {
                var destChannel = destination.channel || self.configuration.DEFAULT_CHANNEL;
                result.push(
                self.subscribe({
                    channel: source.channel || self.configuration.DEFAULT_CHANNEL,
                    topic: sourceTopic,
                    callback: function (data, env) {
                        var newEnv = _.clone(env);
                        newEnv.topic = _.isFunction(destination.topic) ? destination.topic(env.topic) : destination.topic || env.topic;
                        newEnv.channel = destChannel;
                        newEnv.data = data;
                        self.publish(newEnv);
                    }
                }));
            });
        });
        return result;
    };
    if (global && Object.prototype.hasOwnProperty.call(global, "__serviceBusReady__") && _.isArray(global.__serviceBusReady__)) {
        while (global.__serviceBusReady__.length) {
            global.__serviceBusReady__.shift().onReady(_ServiceBus);
        }
    };
    return _ServiceBus;
});
