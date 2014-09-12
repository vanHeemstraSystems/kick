/*
 * ViewEventBase
 */
define(function () {
	console.log('CORE: viewEventBase called');
    function viewEventBase(id) {
        this.id = id;
    };
    viewEventBase.prototype = {
		//
    };
    return viewEventBase;
});
