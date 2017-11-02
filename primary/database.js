/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

module.exports = function(context){
    
    const crypto = require('./crypto');
    var db = new Object();
    var base_db = new sql.Database(context.database_path);

    db.getTags = function(callback){
        base_db.all('SELECT name FROM tag;', callback);
    };

    db.getDocuments = function(callback){
        base_db.all('SELECT * FROM documents;', callback);
    };

    db.checkPassword = function(password, callback){
        base_db.get('SELECT hash FROM password;', function(err, row){
            if(err){
                callback(false);
            } else {
                crypto.compare(password, row['hash'], function(err, result){
                    if(err){
                        callback(false);
                    } else {
                        callback(result);
                    }
                });
            }
        });
    };
    return db;
};
