/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

module.exports = function(context){
    
    var db = new Object();
    var base_db = sql.Database(context.database.name);

    db.getTags = function(callback){
        base_db.all('SELECT name FROM tag', callback);
    };

    db.getDocuments = function(callback){

    };

    return db;
};
