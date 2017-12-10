/* admin.js
 * Définie les callback utilisé pour les actions d'administration
 */
const fs = require('fs');

module.exports = function(context){
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
        data.doc = req.files['document'][0];
        if(!data.doc){
            res.send('nofile');
            return;
        }
        data.thumb = req.files['thumbnail'][0];

        var d = new Date();
        data.date = d.getDay().toString() + '/' + d.getMonth().toString() + '/' + d.getYear().toString();
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
        context.database.getDoc(id, function(row){
            fs.unlink(row.path);  // on supprime les fichiers associé au document
            fs.unlink(row.thumbnail);
            context.database.delDoc(id, function(err){
                if(err){
                    context.log.error(err);
                    res.status(500).send('Une erreur est survenue.');
                } else {
                    res.send('ok');
                }
            });
        });
    };

    admin.modify = function(req, res){
        // modifie les informations ou la miniature (pas le document lui même)
        var data = req.body;
        data.doc = req.files['thumbnails'][0];
        context.database.modDoc(data, function(err){
            if(err){
                context.log.error(err);
                res.status(500).send('Une erreur est survenue.');
            } else {
                if(data.thumb){ // si on met à jour une miniature on supprime l'ancienne
                    fs.unlink(data.old_thumb);
                }
                res.redirect('/admin');
            }
        });
    };

    return admin;
};
