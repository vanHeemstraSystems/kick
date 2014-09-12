/*
 * ViewBase
 */
define(function () {
    console.log('CORE: ViewBase called');   
    function viewBase(id) {
        this.id = id;
        this.keyValuePairs = {};     
    };
    viewBase.prototype = {
        getValue: function (key) {
            console.log('CORE: ViewBase getValue(key) called');
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
            console.log('CORE: ViewBase setValue(key, value) called'); 
            // To Do: search for key in keyValuePairs and updated its value           
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('CORE: ViewBase getKeyValuePairs() called');             
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('CORE: ViewBase setKeyValuePairs(keyValuePairs) called');         
            this.keyValuePairs = keyValuePairs;
        },      
        setViewService: function (viewService) {
            console.log('CORE: ViewBase setViewService(viewService) called');
            // The view instance has a property called "viewService"
            // created from the viewService.                
            this.viewService = viewService;
        },
        // A view might have a function that returns the rendered output.
        getView: function(key) {
            console.log('CORE: ViewBase getView() called');
            try {
                this.view = this.getValue(key);
                console.log('CORE: ViewBase this.view:');
                console.log(this.view);
                return this.view;
            }
            catch(e) {
                console.log('CORE: ViewBase getView(key) error:');
                console.log(e);
                return;
            }
        },
        renderView: function (elementId) {
            console.log('CORE: ViewBase renderView(elementId) called');
            console.log('elementId = ' + elementId);
            try {
                document.getElementById(elementId).innerHTML = this.getView('htmlSource');
                var scriptTag = document.createElement('script');
                scriptTag.type = "text/javascript";
                scriptTag.src = this.getValue('scriptSource');
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
            catch(e) {
                console.log('CORE: ViewBase renderView(elementId) error:');
                console.log(e);
            }
        }
    };
    return viewBase;
});
