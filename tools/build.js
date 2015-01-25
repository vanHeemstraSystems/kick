{
    appDir: '../pre-public',
    mainConfigFile: '../pre-public/js/common.js',
    dir: '../public',
    optimizeCss: 'standard',
    fileExclusionRegExp: /^\.|node_modules|Gruntfile|grunt-|libs|test|\.md|package.json/,
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['jquery',
                      'app/lib',
                      'app/config/Base',
                      'app/controller/Base',
                      'app/app/Base',
                      'app/appController/Base',
                      'app/appService/Base',
                      'app/serviceBus/Base',
                      'app/view/Base',
                      'app/viewController/Base',
                      'app/viewService/Base'
            ]
        },
        //Now set up a build layer for each main layer, but exclude
        //the common one. "exclude" will exclude nested
        //built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //The "page" module is **not** the target of
        //the optimization, because shim config is in play, and
        //shimmed dependencies need to maintain their load order.
        //In this example, common.js will hold jquery, so backbone
        //needs to be delayed from loading until common.js finishes.
        //That loading sequence is controlled in page.js.
        {
            //module names are relative to baseUrl/paths config
            name: 'app/main',
            exclude: ['../common']
        }
    ]
}
