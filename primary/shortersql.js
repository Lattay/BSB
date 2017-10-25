/*
 * Module pour simplifier l'usage de la bdd
 */

const sql = require('sqlite3');

/*
 * En générale les callback ont la forme function(error, results, fields)
 * Avec error un objet erreur ou null
 * result une liste d'objets
 * fields une liste de clées pour les objets result
 */

module.exports = function(context){
    
    var db = new Object();
    
    return db;
};
