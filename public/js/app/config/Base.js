/*
 * ConfigBase
 */
define(function () {
    console.log('KICK: configBase called');	
    function configBase(configs) {
        this.configs = configs;
    };
    configBase.prototype = {
        getConfigs: function () {
            console.log('KICK: configBase getConfigs() called');
            return this.configs;
        }
    };
    return configBase;
});
