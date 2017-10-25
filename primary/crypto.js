/*
 * Module relatif au cryptage
 */

const bcrypt = require('bcrypt');

module.exports = (function(){

    var crypto = new Object();
    
    crypto.hash = function(password, callback){  // callback = function(err, hash)
        // encrypt password
        bcrypt.hash(password, 10, callback);
    };

    crypto.compare = function(password, hash, callback){  // callback = function(err, result)
        // verifie si hash correspond à password
        bcrypt.compare(password, hash, callback);
    };

    return crypto;
})();
