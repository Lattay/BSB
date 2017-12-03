/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

module.exports = function(context){
    
    const crypto = require('./crypto');
    var db = new Object();
    var base_db = new sql.Database(context.database_path);


    // callback = function(first_row)
    db.getDoc = function(id, callback){
        // Recupere un document par son id
        base_db.get('SELECT * FROM documents WHERE id = ?', [id], callback);
    };

    // callback = function(rows)
    db.getDocList = function(callback){
        // Liste tout les documents
        base_db.all('SELECT * FROM documents;', callback);
    };

    // callback = function(error)
    db.addDoc = function(data, callback){
        // Ajoute un document a la bdd
        var req = 'INSERT INTO documents (' +
            'title,' +
            'type,' +
            'description,' +
            'date,' +
            'thumbnail,' +
            'path' +
            ') VALUES (?, ?, ?, ?, ?, ?);';
        base_db.exec(req, [
            data.title,
            data.type,
            data.description,
            data.date,
            data.thumb ? data.thumb.path : context.no_thumb_path,
            data.doc.path
        ], callback);
    };

    // callback = function(error)
    db.delDoc = function(id, callback){
        // Retire un document de la bdd
        base_db.exec('DELETE FROM documents WHERE id = ?', [id], callback);
    };

    // callback = function(error)
    db.modDoc = function(data, callback){
        // Modifie un document existent
        var req = 'UPDATE documents ' +
            'title = ?,' +
            'type = ?,' +
            'description = ?,' +
            'date = ?,' +
            'thumbnail = ?,' +
            'WHERE id = ?;';
        base_db.exec(req, [
            data.title,
            data.type,
            data.description,
            data.date,
            data.thumb ? data.thumb.path : data.old_thumb,
            data.id
        ], callback);
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
