/*
 * ConfigBase
 */
define(function () {
    console.log('CORE: configBase called');	
    function configBase(configs) {
        this.configs = configs;
    };
    configBase.prototype = {
        getConfigs: function () {
            console.log('CORE: configBase getConfigs() called');            
            return this.configs;
        }
    };
    return configBase;
});
