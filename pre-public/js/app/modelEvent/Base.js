/*
 * ModelEventBase
 */
define(function () {
    console.log('CORE: modelEventBase called');
    function modelEventBase(id) {
        this.id = id;
    };
    modelEventBase.prototype = {
        // functions go here
    };
    return modelEventBase;
});
