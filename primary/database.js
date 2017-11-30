/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

module.exports = function(context){
    
    const crypto = require('./crypto');
    var db = new Object();
    var base_db = new sql.Database(context.database_path);


    db.getDoc = function(id, callback){
        // Recupere un document par son id
    };

    db.getDocList = function(callback){
        // Liste tout les documents
        base_db.all('SELECT * FROM documents;', callback);
    };

    db.addDoc = function(data, callback){
        // Ajoute un document a la bdd
    };

    db.delDoc = function(id, callback){
        // Retire un document de la bdd
    };

    db.modDoc = function(data, callback){
        // Modifie un document existent
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
