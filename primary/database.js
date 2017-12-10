/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

module.exports = function(context){
    
    const crypto = require('./crypto');
    var db = new Object();
    var base_db = new sql.Database(context.database_path);

    db.close = function(){
        base_db.close();
    };

    // callback = function(first_row)
    db.getDoc = function(id, callback){
        // Recupere un document par son id
        base_db.get('SELECT * FROM documents WHERE id = ?', [id], callback);
    };

    // callback = function(rows)
    db.getDocList = function(callback){
        // Liste tout les documents
        base_db.all('SELECT id, title, type, thumbnail FROM documents;', callback);
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
            'thumbnail = ?,' +
            'WHERE id = ?;';
        base_db.exec(req, [
            data.title,
            data.type,
            data.description,
            data.thumb ? data.thumb.path : data.old_thumb,
            data.id
        ], callback);
    };

    db.getLogins = function(callback){
        base_db.all('SELECT id, login FROM password;', callback);
    };

    db.checkPassword = function(login, password, callback){
        base_db.get('SELECT hash FROM password WHERE login = ?;', [login], function(err, row){
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

    db.setPassword = function(login, password, callback){
        crypto.hash(password, function(err, hash){
            if(err){
                callback(err);
            } else {
                base_db.exec('INSERT INTO password (login, hash) VALUES (?, ?);', [login, hash], function(err){
                    callback(err);
                });
            }
        });
    };

    db.delPassword = function(id, callback){
        base_db.exec('DELETE FROM password WHERE id = ?;', [id], callback);
    };

    return db;
};
