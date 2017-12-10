// utils.js
// outils divers
const path = require('path');

module.exports = function(context){
    var utils = new Object();

    utils.path_to_url = function(abs_path){
        return '/' + path.relative(context.public_root, abs_path);
    };

    utils.url_to_path = function(url){
        return path.join(context.public_root, url);
    };
    return utils;
};
