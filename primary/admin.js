/* admin.js
 * Définie les callback utilisé pour les actions d'administration
 */
const fs = require('fs');

module.exports = function(context){
    const myUtils= require('./utils')(context);

    var admin = new Object();
    admin.authorise = function(route_ko){
        var cb = function(req, res, next){
            if(req.session.logged){
                next();
            } else {
                res.redirect(route_ko);
            }
        };
        return cb;
    };
 
    admin.login = function(req, res){
        context.database.checkPassword(req.body.login, req.body.password, function(passok){
            if(passok){
                req.session.logged = true;
                res.redirect('/admin');
            } else {
                res.redirect('/login.html');
            }
        });
    };

    admin.login_list = function(req, res){
        context.database.getLogins(function(err, logins){
            if(err){
                context.log.error(err);
                res.status(500).send('Une erreur est survenue.');
            } else {
                res.render('logins', { 'logins' : logins});
            }
        });
    };

    admin.add_login = function(req, res){
        context.database.setPassword(req.body.login, req.body.password, function(err){
            if(err){
                context.log.error(err);
                res.status(500).send('Error adding a login.');
            } else {
                res.send('OK');
            }
        });
    };

    admin.del_login = function(req, res){
        context.database.delPassword(req.params.i, function(err){
            if(err){
                context.log.error(err);
                res.status(500).send('Error when deleting a login.');
            } else {
                res.send('OK');
            }
        });
    };

    admin.add = function(req, res){
        var data = req.body;
        if(!req.files['document'][0]){
            res.send('nofile');
            return;
        }
        data.doc = myUtils.path_to_url(req.files['document'][0].path);
        data.thumb = req.files['thumbnail'][0] ? myUtils.path_to_url(req.files['thumbnail'][0].path) : context.no_thumb;

        var d = new Date();
        data.date = d.getDate().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getFullYear().toString();
        context.database.addDoc(data, function(err){
            if(err){
                context.log.error(err);
                res.send('err');
            } else {
                res.redirect('/admin');
            }
        });
    };

    admin.remove = function(req, res){
        var id = req.params['id'];
        context.database.getDoc(id, function(err, row){
            if(err){
                context.log.error(err);
                res.status(500).send('Une erreur est survenue.');
            } else if(!row){
                context.log.error('Specified document does not exist. id : ' + id.toString() );
                res.status(404).send('Aucun document a supprimer.');
            } else {
                fs.unlink(myUtils.url_to_path(row.path));  // on supprime les fichiers associé au document
                if(row.thumbnail){
                    fs.unlink(myUtils.url_to_path(row.thumbnail));
                }
                context.database.delDoc(id, function(err){
                    if(err){
                        context.log.error(err);
                        res.status(500).send('Une erreur est survenue.');
                    } else {
                        res.send('ok');
                    }
                });
            }
        });
    };

    admin.modify = function(req, res){
        // modifie les informations ou la miniature (pas le document lui même)
        var data = req.body;
        data.thumb = req.files['thumbnail'] && req.files['thumbnail'][0] ? myUtils.path_to_url(req.files['thumbnail'][0].path) : data.old_thumb;
        context.database.modDoc(data, function(err){
            if(err){
                context.log.error(err);
                res.status(500).send('Une erreur est survenue.');
            } else {
                if(data.thumb != data.old_thumb && data.old_thumb != context.no_thumb){ // si on met à jour une miniature on supprime l'ancienne
                    fs.unlink(myUtils.url_to_path(data.old_thumb), () => {});
                }
                res.redirect('/admin');
            }
        });
    };

    return admin;
};
