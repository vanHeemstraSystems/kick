/*
 * ModelBase
 */
define(function () {
    console.log('CORE: modelBase called');
    function modelBase(id) {
        this.id = id;
        this.keyValuePairs = {};
    };
    modelBase.prototype = {
        getValue: function (key) {
            console.log('CORE: modelBase getValue(key) called');
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
            console.log('CORE: modelBase setValue(key, value) called'); 
            // To Do: search for key in keyValuePairs and updated its value           
            // value = value;
        },
        getKeyValuePairs: function () {
            console.log('CORE: modelBase getKeyValuePairs() called');             
            return this.keyValuePairs;
        },
        setKeyValuePairs: function (keyValuePairs) {
            console.log('CORE: modelBase setKeyValuePairs(keyValuePairs) called');         
            this.keyValuePairs = keyValuePairs;
        },  
        setModelService: function (modelService) {
            console.log('CORE: modelBase setModelService(modelService) called');          
            this.modelService = modelService;
        },
        getModel: function(key) {
            console.log('CORE: modelBase getModel() called');
            try {
                this.model = this.getModel(key);
                console.log('CORE: modelBase this.model:');
                console.log(this.model);
                return this.model;
            }
            catch(e) {
                console.log('CORE: modelBase getModel(key) error:');
                console.log(e);
                return;
            }
        },
        renderModel: function () {
            console.log('CORE: modelBase renderModel() called');
            try {
                var scriptTag = document.createElement('script');
                scriptTag.type = "text/javascript";
                scriptTag.src = this.getValue('scriptSource');
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
            catch(e) {
                console.log('CORE: modelBase renderModel() error:');
                console.log(e);
            }
        }
    };
    return modelBase;
});
