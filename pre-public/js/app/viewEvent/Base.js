/*
 * ViewEventBase
 */
define(function () {
    console.log('KICK: viewEventBase called'); 	
    function viewEventBase(id) {
        this.id = id;
    }
    viewEventBase.prototype = {
		// 
    };
    return viewEventBase;
});
