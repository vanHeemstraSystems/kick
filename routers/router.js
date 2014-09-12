/*
 * Router
 */   
module.exports = function(req, res, next) { 
    var _Router = {};  
    config = require('../configs/server.js');
    var configs = config.configs,
        server_prefix = configs.server_prefix || 'MASK';
    console.log(server_prefix + " - Router router required.");
    _Router.admin = require('./admin.js');
    _Router.index = require('./index.js');
    _Router.login = require('./login.js');
    _Router.logout = require('./logout.js');
    _Router.source = require('./source.js');
    _Router.test = require('./test.js');
    return _Router;
}();// calls itself