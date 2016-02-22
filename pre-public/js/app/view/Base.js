/*
 * ViewBase
 */
define(function () {
    console.log('KICK: ViewBase called');
    function viewBase(id) {
        this.id = id;
        this.keyValuePairs = {};
    };
    viewBase.prototype = {
        getValue: function (key) {
            console.log('KICK: ViewBase getValue(key) called');
            console.log('key = ' + key);
            var searchKey = key;
            var keyFound = false;
            var value;
            for(key in this.keyValuePairs) {
                if(key == searchKey){
                    keyFound = true;
                    value = this.keyValuePairs[key];
                }
            }
            if(keyFound) {
                console.log('key found');
            }
            else {
                console.log('key not found');
            }
            console.log('value = ' + value);
            return value;
        },
        setValue: function (key, value) {
            console.log('KICK: ViewBase setValue(key, value) called');
            // To Do: search for key in keyValuePairs and updated its value
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('KICK: ViewBase getKeyValuePairs() called');
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('KICK: ViewBase setKeyValuePairs(keyValuePairs) called');
            this.keyValuePairs = keyValuePairs;
        },        
        setViewService: function (viewService) {
            console.log('KICK: ViewBase setViewService(viewService) called');
            // The view instance has a property called "viewService"
            // created from the viewService.
            this.viewService = viewService;
        },
        // A view might have a function that returns the rendered output.
        getView: function(key) {
            console.log('KICK: ViewBase getView() called');

    //        // Data used to create a template may come from anywhere
    //        // but in this case template comes from the inline string.
    //        var ourData = '<h1><%= myProperty %></h1>';
    //        // Store the instance for reference in the replace function below.
    //        var instance = this;
    //        // Return the template using the values from the viewService.
    //        return ourData.replace(/<%=\s+(.*?)\s+%>/g, function (m,m1) {
    //            return instance.viewService[m1];
    //        });
            try {
                this.view = this.getValue(key);
                console.log('KICK: ViewBase this.view:');
                console.log(this.view);
                return this.view;
            }
            catch(e) {
                console.log('KICK: ViewBase getView(key) error:');
                console.log(e);
                return;
            }
        },
        // A view might have a function that renders the view.
        renderView: function (elementId) {
            console.log('KICK: ViewBase renderView(elementId) called');
            console.log('elementId = ' + elementId);
            // This view renders to the element with the id provided.
            try {
                document.getElementById(elementId).innerHTML = this.getView('htmlSource');
                // Add the view's script element
                var scriptTag = document.createElement('script');
                scriptTag.type = "text/javascript";
                scriptTag.src = this.getValue('scriptSource');
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
            catch(e) {
                console.log('KICK: ViewBase renderView(elementId) error:');
                console.log(e);
            }
        }
    };
    return viewBase;
});
